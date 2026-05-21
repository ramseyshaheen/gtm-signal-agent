# GTM Signal Agent

An autonomous account intelligence pipeline built with n8n and Claude. Given a list of target B2B companies, the agent pulls public buying signals across three sources: public job postings, recent worldwide company news, and public GitHub repo activity. The agent then scores each account using AI-powered signal scoring, and generates a structured Markdown account brief per company. The 0-100 intent score with reasoning, firm status summary, and key signal breakdowns enable a live, indepth view of B2B sales opportunity across target companies. 

## Architecture

-- In Progress -- 

## Signal Sources

| Source | Method | What We Capture |
|---|---|---|
| GitHub API | Public org repos endpoint | Repo activity, stars, push frequency |
| NewsAPI | Keyword search by company name | Recent mentions, product news |
| Job Boards | Greenhouse + Ashby APIs | Open GTM roles, total headcount |

## Stack

- **Orchestration:** n8n (self-hosted via Docker)
- **LLM:** Claude claude-sonnet-4-6 via Anthropic API
- **Signal sources:** GitHub API, NewsAPI, ATS job boards (Greenhouse, Lever, Ashby, Workday)
- **Config:** YAML
- **Output:** Markdown
