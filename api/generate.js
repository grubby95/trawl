export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { roundNum, dayNum, dateSeed, parTarget, wordCount, edgeRange } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 2000,
        temperature: 0.8,
        messages: [{
          role: 'system',
          content: 'You generate word puzzle data. Return ONLY valid JSON, no markdown, no explanation.',
        }, {
          role: 'user',
          content: `Generate round ${roundNum} of puzzle #${dayNum} (${dateSeed}) for TRAWL word maze.
Create a graph of exactly ${wordCount} common English nouns (ALL CAPS, single words, concrete/picturable).
CONNECTION RULES -- STRICT:
- Each connection = compound word or STRONG, OBVIOUS word association
- ALLOWED: compound words (SUN+BURN=sunburn), synonyms, part/whole, tight category pairs
- BANNED: vague thematic, "both found in...", requires explanation
- TEST: 80%+ of people would immediately agree these are directly associated
- Each word: 2-4 connections. Total edges: ${edgeRange}.
PUZZLE STRUCTURE:
- Shortest path from START to END = exactly ${parTarget} steps
- At least 2-3 longer alternative paths
- Include 2-3 trap words (dead ends or long detours)
Return ONLY JSON: {"words":[...],"start":"WORD","end":"WORD","edges":[["A","B"],...],"optimalPath":[...],"par":${parTarget}}`,
        }],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(text.replace(/\`\`\`json|\`\`\`/g, '').trim());

    res.status(200).json(parsed);
  } catch (error) {
    console.error('Puzzle generation error:', error);
    res.status(500).json({ error: 'Generation failed' });
  }
}
