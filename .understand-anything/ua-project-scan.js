const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = process.argv[2];
const outputPath = process.argv[3];

if (!projectRoot || !outputPath) {
  process.stderr.write('Usage: node ua-project-scan.js <project-root> <output-path>\n');
  process.exit(1);
}

if (!fs.existsSync(projectRoot)) {
  process.stderr.write(`Cannot access directory: ${projectRoot}\n`);
  process.exit(1);
}

// Step 1 -- File Discovery
let allFiles = [];
try {
  const result = spawnSync('git', ['ls-files'], { cwd: projectRoot, encoding: 'utf8' });
  if (result.status === 0 && result.stdout.trim()) {
    allFiles = result.stdout.trim().split('\n').map(f => f.trim()).filter(Boolean);
  } else {
    throw new Error('git ls-files failed');
  }
} catch (e) {
  function walk(dir, base) {
    let results = [];
    let entries;
    try { entries = fs.readdirSync(dir); } catch { return results; }
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const rel = base ? base + '/' + entry : entry;
      let stat;
      try { stat = fs.statSync(full); } catch { continue; }
      if (stat.isDirectory()) {
        results = results.concat(walk(full, rel));
      } else {
        results.push(rel);
      }
    }
    return results;
  }
  allFiles = walk(projectRoot, '');
}

// Step 2 -- Exclusion Filtering
const excludedDirPatterns = [
  'node_modules/', '.git/', 'vendor/', 'venv/', '.venv/', '__pycache__/',
  'dist/', 'build/', 'out/', 'coverage/', '.next/', '.cache/', '.turbo/', 'target/',
  '.idea/', '.vscode/', '.understand-anything/'
];

const excludedExtensions = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot',
  '.mp3', '.mp4', '.pdf', '.zip', '.tar', '.gz',
  '.map', '.lock', '.log'
]);

const excludedFileNames = new Set([
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'LICENSE', '.gitignore', '.editorconfig', '.prettierrc',
  'Makefile', 'Dockerfile'
]);

const excludedExtensionsFull = new Set([
  '.md', '.txt', '.yml', '.yaml', '.toml', '.json', '.xml',
  '.cfg', '.ini'
]);

const sourceExtensions = new Set([
  '.ts', '.tsx', '.js', '.jsx',
  '.py', '.go', '.rs', '.java', '.rb',
  '.cpp', '.cc', '.cxx', '.h', '.hpp', '.c',
  '.cs', '.swift', '.kt', '.php',
  '.vue', '.svelte', '.sh', '.bash'
]);

function shouldExclude(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  for (const pat of excludedDirPatterns) {
    if (normalized.includes(pat)) return true;
  }
  const base = path.basename(normalized);
  const ext = path.extname(normalized).toLowerCase();

  if (excludedFileNames.has(base)) return true;
  if (base.startsWith('.eslintrc')) return true;
  if (base.endsWith('.min.js') || base.endsWith('.min.css')) return true;
  if (base.includes('.generated.')) return true;
  if (base.endsWith('.d.ts')) return true;

  if (excludedExtensions.has(ext)) return true;
  if (excludedExtensionsFull.has(ext)) return true;

  return false;
}

const sourceFiles = allFiles.filter(f => {
  if (shouldExclude(f)) return false;
  const ext = path.extname(f).toLowerCase();
  return sourceExtensions.has(ext);
});

// Step 3 -- Language Detection
const extToLang = {
  '.ts': 'typescript', '.tsx': 'typescript',
  '.js': 'javascript', '.jsx': 'javascript',
  '.py': 'python',
  '.go': 'go',
  '.rs': 'rust',
  '.java': 'java',
  '.rb': 'ruby',
  '.cpp': 'cpp', '.cc': 'cpp', '.cxx': 'cpp', '.h': 'cpp', '.hpp': 'cpp',
  '.c': 'c',
  '.cs': 'csharp',
  '.swift': 'swift',
  '.kt': 'kotlin',
  '.php': 'php',
  '.vue': 'vue',
  '.svelte': 'svelte',
  '.sh': 'bash', '.bash': 'bash'
};

// Step 4 -- Line Counting
function countLines(files, rootDir) {
  const counts = {};
  if (files.length === 0) return counts;
  const batchSize = 50;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const absPaths = batch.map(f => path.join(rootDir, f));
    try {
      const result = spawnSync('wc', ['-l', ...absPaths], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      const stdout = (result.stdout || '').trim();
      if (stdout) {
        const lines = stdout.split('\n');
        for (const line of lines) {
          const match = line.trim().match(/^(\d+)\s+(.+)$/);
          if (match) {
            const count = parseInt(match[1], 10);
            const filePath = match[2].trim().replace(/\\/g, '/');
            for (const f of batch) {
              const abs = path.join(rootDir, f).replace(/\\/g, '/');
              if (filePath === abs) {
                counts[f] = count;
                break;
              }
            }
          }
        }
      }
    } catch (err) {
      for (const f of batch) counts[f] = 0;
    }
    // Fill in any not found
    for (const f of batch) {
      if (counts[f] === undefined) {
        try {
          const content = fs.readFileSync(path.join(rootDir, f), 'utf8');
          counts[f] = content.split('\n').length;
        } catch {
          counts[f] = 0;
        }
      }
    }
  }
  return counts;
}

const lineCounts = countLines(sourceFiles, projectRoot);

// Step 5 -- Framework Detection
const frameworks = [];
const pkgJsonPath = path.join(projectRoot, 'package.json');
let rawDescription = '';
let projectName = '';

const knownFrameworks = {
  'react': 'React', 'vue': 'Vue', 'svelte': 'Svelte',
  '@angular/core': 'Angular', 'express': 'Express', 'fastify': 'Fastify',
  'koa': 'Koa', 'next': 'Next.js', 'nuxt': 'Nuxt', 'vite': 'Vite',
  'vitest': 'Vitest', 'jest': 'Jest', 'mocha': 'Mocha',
  'tailwindcss': 'Tailwind CSS', 'prisma': 'Prisma', 'typeorm': 'TypeORM',
  'sequelize': 'Sequelize', 'mongoose': 'Mongoose', 'redux': 'Redux',
  'zustand': 'Zustand', 'mobx': 'MobX'
};

if (fs.existsSync(pkgJsonPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    projectName = pkg.name || '';
    rawDescription = pkg.description || '';
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const [dep, label] of Object.entries(knownFrameworks)) {
      if (deps[dep]) frameworks.push(label);
    }
  } catch {}
}

if (fs.existsSync(path.join(projectRoot, 'Cargo.toml'))) {
  try {
    const cargo = fs.readFileSync(path.join(projectRoot, 'Cargo.toml'), 'utf8');
    const nameMatch = cargo.match(/^\[package\][\s\S]*?^name\s*=\s*"([^"]+)"/m);
    if (!projectName && nameMatch) projectName = nameMatch[1];
  } catch {}
}

if (fs.existsSync(path.join(projectRoot, 'go.mod'))) {
  try {
    const gomod = fs.readFileSync(path.join(projectRoot, 'go.mod'), 'utf8');
    const modMatch = gomod.match(/^module\s+(\S+)/m);
    if (!projectName && modMatch) {
      const parts = modMatch[1].split('/');
      projectName = parts[parts.length - 1];
    }
  } catch {}
}

if (!projectName) {
  projectName = path.basename(projectRoot);
}

// Read README head
let readmeHead = '';
const readmePaths = ['README.md', 'Readme.md', 'readme.md'];
for (const rp of readmePaths) {
  const full = path.join(projectRoot, rp);
  if (fs.existsSync(full)) {
    try {
      const content = fs.readFileSync(full, 'utf8');
      readmeHead = content.split('\n').slice(0, 10).join('\n');
    } catch {}
    break;
  }
}

// Step 6 -- Complexity Estimation
function estimateComplexity(count) {
  if (count <= 20) return 'small';
  if (count <= 100) return 'moderate';
  if (count <= 500) return 'large';
  return 'very-large';
}

// Step 7 -- Assemble files
const filesArr = sourceFiles.map(f => {
  const ext = path.extname(f).toLowerCase();
  const lang = extToLang[ext] || 'unknown';
  const lines = lineCounts[f] !== undefined ? lineCounts[f] : 0;
  return { path: f.replace(/\\/g, '/'), language: lang, sizeLines: lines };
}).sort((a, b) => a.path.localeCompare(b.path));

const langSet = new Set(filesArr.map(f => f.language).filter(l => l !== 'unknown'));
const languages = Array.from(langSet).sort();

const result = {
  scriptCompleted: true,
  name: projectName,
  rawDescription,
  readmeHead,
  languages,
  frameworks: [...new Set(frameworks)],
  files: filesArr,
  totalFiles: filesArr.length,
  estimatedComplexity: estimateComplexity(filesArr.length)
};

try {
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  process.exit(0);
} catch (err) {
  process.stderr.write(`Failed to write output: ${err.message}\n`);
  process.exit(1);
}
