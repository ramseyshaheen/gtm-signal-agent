// n8n Code node: News Signals
// Input: Greenhouse API OR Ashby API

const company = $('Loop Over Items').item.json;
const data = $input.first().json || {};

let rawJobs = [];
let source = 'none';

if (Array.isArray(data.jobs)) {
  source = 'greenhouse';
  rawJobs = data.jobs.map(j => ({
    title: j.title,
    location: j.location?.name,
    posted_at: j.first_published,
    url: j.absolute_url
  }));
} else if (Array.isArray(data.jobPostings)) {
  source = 'ashby';
  rawJobs = data.jobPostings.map(j => ({
    title: j.title,
    location: j.location,
    posted_at: j.publishedAt,
    url: j.jobUrl
  }));
}

return [{
  json: {
    name: company.name,
    careers_url: company.careers_url,
    ats: company.ats,
    ats_token: company.ats_token,
    github_org: company.github_org,
    jobs: { source, raw: rawJobs }
  }
}];