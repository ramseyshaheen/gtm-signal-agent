# Sales Intelligence Agent

An autonomous account intelligence pipeline built with n8n and Claude. Given a list of target B2B companies, the agent pulls public buying signals across three sources: public job postings, recent worldwide company news, and public GitHub repo activity. The agent then scores each account using AI-powered signal scoring, and generates a structured Markdown account brief per company. The 0-100 intent score with reasoning, firm status summary, and key signal breakdowns enable a live, indepth view of B2B sales opportunity across target companies. 

## Architecture

-- In Progress -- 

## Problem Being Addressed

Sales teams target hundreds of accounts but most lack a systematic way to surface which ones are showing key buying signals right now and focus their efforts on enterprises with the highest demand for the product.

## Signal Sources

| Source | Method | What We Capture |
|---|---|---|
| GitHub API | Public org repos endpoint | Repo activity, stars, push frequency |
| NewsAPI | Keyword search by company name | Recent mentions, product news |
| Job Boards | Greenhouse + Ashby APIs | Open GTM roles, total headcount |

## Stack

- **Orchestration:** n8n (self-hosted via Docker)
- **LLM:** Claude claude-sonnet-4-6 via Anthropic API
- **Signal sources:** GitHub API, NewsAPI, Job Board ATS APIs (Greenhouse, Ashby)
- **Config:** YAML
<<<<<<< HEAD
- **Output:** Google Sheets/CSV File (Set up for easy future Snowflake integration)
=======
- **Output:** Google Sheets/CSV File (Set up for easy future Snowflake integration)
>>>>>>> d17ca925195b5e11c3f368ab9b608328a2faf628
