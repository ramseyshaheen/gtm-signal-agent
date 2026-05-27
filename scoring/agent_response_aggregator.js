// n8n Code node: Agent Response Aggregator
// Input: Loop Done - Interations from the Loop Over Items

const results = $input.all().map(item => item.json);

const sorted = results.sort((a, b) => 
  (b.scoring?.intent_score || 0) - (a.scoring?.intent_score || 0)
);

const runId = new Date().toISOString();

const formatList = (arr) => Array.isArray(arr) 
  ? arr.map((item, i) => `${i + 1}. ${item}`).join('\n')
  : '';

return sorted.map((c, i) => ({
  json: {
    run_id: runId,
    rank: i + 1,
    company: c.company,
    intent_score: c.scoring?.intent_score ?? 0,
    tier: c.scoring?.tier || '',
    company_summary: c.scoring?.company_summary || '',
    score_reasons: formatList(c.scoring?.score_reasons),
    key_signals: formatList(c.scoring?.key_signals),
    missing_signals: formatList(c.scoring?.missing_signals),
    gtm_job_count: c.signals?.jobs?.gtm_job_count ?? 0,
    total_job_count: c.signals?.jobs?.total_job_count ?? 0,
    news_article_count: Array.isArray(c.signals?.news) ? c.signals.news.length : 0,
    github_repo_count: Array.isArray(c.signals?.github) ? c.signals.github.length : 0,
    careers_url: c.careers_url || '',
    github_org: c.github_org || ''
  }
}));
