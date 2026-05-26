// n8n Code node: News Signals
// Input: NewsAPI HTTP response
const company = $('Loop Over Items').item.json;
const articles = ($input.first().json.articles) || [];

return [{
  json: {
    name: company.name,
    careers_url: company.careers_url,
    ats: company.ats,
    ats_token: company.ats_token,
    github_org: company.github_org,
    news: {
      articles: articles.map(a => ({
        title: a.title,
        source: a.source?.name,
        published_at: a.publishedAt,
        url: a.url,
        description: a.description
      }))
    }
  }
}];