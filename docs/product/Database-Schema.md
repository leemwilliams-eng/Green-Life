# Green Life Database Schema

This is a practical MVP schema for PostgreSQL. It is designed around three realities: product matching, environmental metrics with provenance, and clear separation between exact data and estimates.

## 1. Core Tables

### users
```sql
create table users (
  id uuid primary key,
  email text unique,
  auth_provider text,
  created_at timestamptz not null default now()
);
```

### brands
```sql
create table brands (
  id uuid primary key,
  name text not null,
  normalized_name text not null unique,
  created_at timestamptz not null default now()
);
```

### categories
```sql
create table categories (
  id uuid primary key,
  name text not null,
  slug text not null unique,
  parent_category_id uuid references categories(id),
  created_at timestamptz not null default now()
);
```

### materials
```sql
create table materials (
  id uuid primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);
```

### products
```sql
create table products (
  id uuid primary key,
  brand_id uuid references brands(id),
  category_id uuid references categories(id),
  name text not null,
  normalized_name text not null,
  description text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_name_idx on products (normalized_name);
create index products_brand_idx on products (brand_id);
create index products_category_idx on products (category_id);
```

### product_identifiers
Supports barcode and future identifiers.
```sql
create table product_identifiers (
  id uuid primary key,
  product_id uuid not null references products(id) on delete cascade,
  identifier_type text not null,
  identifier_value text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  unique(identifier_type, identifier_value)
);
```

Recommended `identifier_type` values:
- `upc`
- `ean`
- `gtin`
- `sku`
- `external_source_id`

### product_materials
```sql
create table product_materials (
  id uuid primary key,
  product_id uuid not null references products(id) on delete cascade,
  material_id uuid not null references materials(id),
  percentage numeric(5,2),
  created_at timestamptz not null default now()
);
```

## 2. Source and Provenance Tables

### sources
Represents a dataset/provider.
```sql
create table sources (
  id uuid primary key,
  name text not null,
  source_type text not null,
  base_url text,
  license_text text,
  license_url text,
  created_at timestamptz not null default now()
);
```

### source_records
Represents a specific ingested record from a source.
```sql
create table source_records (
  id uuid primary key,
  source_id uuid not null references sources(id),
  external_record_id text,
  record_title text,
  raw_payload jsonb,
  reference_url text,
  dataset_version text,
  published_at timestamptz,
  ingested_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index source_records_source_idx on source_records (source_id);
create index source_records_external_idx on source_records (external_record_id);
```

### product_source_links
Links products to source records, including mapping confidence.
```sql
create table product_source_links (
  id uuid primary key,
  product_id uuid references products(id),
  category_id uuid references categories(id),
  material_id uuid references materials(id),
  source_record_id uuid not null references source_records(id) on delete cascade,
  match_type text not null,
  confidence_score numeric(4,3),
  is_admin_verified boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);
```

Constraint rule to enforce in app/backend:
- one of `product_id`, `category_id`, or `material_id` must be set

## 3. Environmental Metrics Tables

### impact_metrics
Stores user-facing metrics tied to product/category/material scope.
```sql
create table impact_metrics (
  id uuid primary key,
  product_id uuid references products(id),
  category_id uuid references categories(id),
  material_id uuid references materials(id),
  source_record_id uuid not null references source_records(id),
  metric_type text not null,
  label text not null,
  metric_value numeric(14,4),
  metric_unit text,
  scope text not null,
  estimate_type text not null,
  confidence_score numeric(4,3),
  methodology text,
  valid_from timestamptz,
  valid_to timestamptz,
  created_at timestamptz not null default now()
);

create index impact_metrics_product_idx on impact_metrics (product_id);
create index impact_metrics_category_idx on impact_metrics (category_id);
create index impact_metrics_material_idx on impact_metrics (material_id);
create index impact_metrics_type_idx on impact_metrics (metric_type);
```

Recommended enums at application level:
- `metric_type`: `carbon_footprint`, `recycled_content`, `recyclability`, `water_use`, `hazard_indicator`
- `scope`: `product`, `category`, `material`
- `estimate_type`: `exact`, `inferred`, `modeled`, `category_based`, `material_based`

### disposal_guidance
```sql
create table disposal_guidance (
  id uuid primary key,
  product_id uuid references products(id),
  category_id uuid references categories(id),
  material_id uuid references materials(id),
  source_record_id uuid references source_records(id),
  guidance_type text not null,
  label text not null,
  details text,
  region_code text,
  confidence_score numeric(4,3),
  created_at timestamptz not null default now()
);
```

### hazard_flags
```sql
create table hazard_flags (
  id uuid primary key,
  product_id uuid references products(id),
  category_id uuid references categories(id),
  material_id uuid references materials(id),
  source_record_id uuid references source_records(id),
  flag_code text not null,
  label text not null,
  severity text,
  details text,
  confidence_score numeric(4,3),
  created_at timestamptz not null default now()
);
```

## 4. User Activity Tables

### saved_items
```sql
create table saved_items (
  id uuid primary key,
  user_id uuid not null references users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);
```

### lookup_history
Tracks scans/searches for history and analytics.
```sql
create table lookup_history (
  id uuid primary key,
  user_id uuid references users(id) on delete set null,
  lookup_type text not null,
  query_value text,
  product_id uuid references products(id),
  category_id uuid references categories(id),
  material_id uuid references materials(id),
  match_type text,
  confidence_score numeric(4,3),
  created_at timestamptz not null default now()
);

create index lookup_history_user_idx on lookup_history (user_id, created_at desc);
```

Recommended `lookup_type`:
- `barcode`
- `search`
- `image`

## 5. Admin and Review Tables

### mapping_overrides
```sql
create table mapping_overrides (
  id uuid primary key,
  source_record_id uuid not null references source_records(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  reason text,
  created_by_user_id uuid references users(id),
  created_at timestamptz not null default now()
);
```

### review_queue
```sql
create table review_queue (
  id uuid primary key,
  source_record_id uuid references source_records(id),
  product_id uuid references products(id),
  issue_type text not null,
  status text not null default 'open',
  priority int not null default 2,
  notes text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);
```

## 6. Key Schema Notes

Important implementation rules:
- Do not force all metrics to be product-scoped.
- Preserve raw source payloads in `source_records.raw_payload`.
- Keep `impact_metrics` append-friendly so newer source records can supersede old ones without destructive updates.
- Resolve "best metric" in the service layer, not with destructive overwrites in the database.

Good service-layer logic:
1. Prefer exact product metric.
2. Fall back to verified product mapping.
3. Fall back to category metric.
4. Fall back to material metric.
5. Return best result with confidence and estimate label.
