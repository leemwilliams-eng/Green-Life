export async function askClaude(userMessage: string, itemContext: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: `You are a sustainability assistant in the Green Life app. The user has the following scanned/saved items: ${itemContext}. Answer questions about sustainability, environmental impact, and eco-friendly alternatives for their items. Be concise (2-4 sentences) since your response will be read aloud.`,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Claude: ${json.error?.message ?? res.status}`);

  const textBlock = json.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text ?? "Sorry, I couldn't generate a response.";
}
