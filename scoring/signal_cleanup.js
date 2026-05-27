// n8n Code node: Signal Clean Up
// Input: Merged signals from each of the three parallel processes and their sources

const input = $input.first().json;

const gtmKeywords = ['sales','marketing','revenue','gtm','go-to-market','account executive','account manager','business development','demand generation','growth','partnerships','customer success','revops','sales ops','marketing ops'];

const allJobs = input.jobs?.raw || [];
const gtmJobs = allJobs.filter(j => {
  const t = (j.title || '').toLowerCase();
  return gtmKeywords.some(k => t.includes(k));
});

return [{
  json: {
    company: input.name,
    careers_url: input.careers_url,
    github_org: input.github_org,
    signals: {
      news: input.news?.articles || [],
      github: input.github?.repos || [],
      jobs: {
        source: input.jobs?.source || 'none',
        gtm_job_count: gtmJobs.length,
        total_job_count: allJobs.length,
        gtm_jobs: gtmJobs.slice(0, 10)
      }
    }
  }
}];