export async function transcribeAudio(fileUri: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", { uri: fileUri, type: "audio/m4a", name: "audio.m4a" } as any);
  formData.append("model", "whisper-1");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}` },
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Whisper: ${json.error?.message ?? res.status}`);
  return json.text ?? "";
}
