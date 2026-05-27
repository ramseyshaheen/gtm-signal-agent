// n8n Code node: Build Agent Prompt
// Input: Signal Clean Up - Output of parallel processes clean up to be read by the Claude API calls


const data = $input.first().json;
const prompt = `Analyze the following public signals for ${data.company} and score their demand potential from 0-100 based on evidence that they are actively building or scaling their go-to-market motion.
High-weight signals:
- Hiring for GTM, sales, RevOps, or marketing roles
- Recent funding round (more budget, more tooling)
- New sales or marketing leadership (new leaders buy new tools)
- Product launches suggesting commercial expansion
- Rapid headcount growth signals
Low-weight signals:
- General press coverage unrelated to commercial motion
- Pure engineering activity with no GTM relevance
GitHub Activity:
${JSON.stringify(data.signals.github)}
Recent News:
${JSON.stringify(data.signals.news)}
Job Postings (GTM roles only):
${JSON.stringify(data.signals.jobs)}
Return JSON only, no other text, in this exact format:
{
  "company_summary": "2-3 sentence snapshot based only on signals provided",
  "intent_score": 0,
  "tier": "high or medium or low",
  "score_reasons": ["reason 1", "reason 2"],
  "key_signals": ["signal 1", "signal 2"],
  "missing_signals": ["what would strengthen this score"]
}`;
const response = await this.helpers.httpRequest({
  method: 'POST',
  url: 'https://api.anthropic.com/v1/messages',
  headers: {
    'x-api-key': '<ANTHROPIC_API_KEY>',
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    system: 'You are a senior sales intelligence analyst at an enterprise B2B GTM software company. Your job is to assess how likely a prospect company is to be actively in-market for GTM software. Base your analysis strictly on the signals provided. Do not use prior knowledge about the company beyond what is present in the data.',
    messages: [{ role: 'user', content: prompt }]
  })
});
const content = response.content[0].text;
const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const parsed = JSON.parse(cleaned);
return [{
  json: {
    company: data.company,
    careers_url: data.careers_url,
    github_org: data.github_org,
    signals: data.signals,
    scoring: parsed
  }
}];