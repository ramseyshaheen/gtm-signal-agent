// n8n Code node: GitHub Signals
// Input: GitHub HTTP response

const company = $('Loop Over Items').item.json;

return [{
  json: {
    name: company.name,
    careers_url: company.careers_url,
    ats: company.ats,
    ats_token: company.ats_token,
    github_org: company.github_org,
    github: {
      repos: $input.all().map(item => ({
        name: item.json.name,
        updated_at: item.json.updated_at,
        pushed_at: item.json.pushed_at,
        stars: item.json.stargazers_count,
        forks: item.json.forks_count,
        description: item.json.description
      }))
    }
  }
}];