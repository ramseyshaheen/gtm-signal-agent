# GTM Signal Agent

An autonomous account intelligence pipeline built with n8n and Claude. Given a list of target B2B companies, the agent pulls public buying signals across three sources: public job postings, recent company news, and GitHub activity. The workflow then scores each account using a weighted signal taxonomy, and generates a structured Markdown account brief per company.

## Architecture

-- In Progress -- 

## Stack

- **Orchestration:** n8n (self-hosted via Docker)
- **LLM:** Claude claude-sonnet-4-6 via Anthropic API
- **Signal sources:** GitHub API, NewsAPI, ATS job boards (Greenhouse, Lever, Ashby, Workday)
- **Config:** YAML
- **Output:** Markdown