# Sales Intelligence Agent

An autonomous account intelligence pipeline built with n8n and Claude. Given a list of target B2B companies, the agent pulls public buying signals across three sources: public job postings, recent worldwide company news, and public GitHub repo activity. The agent then scores each account using AI-powered signal scoring, and generates a structured Markdown account brief per company. The 0-100 intent score with reasoning, firm status summary, and key signal breakdowns enable a live, indepth view of B2B sales opportunity across target companies. 

## Architecture

For each target enterprise customer, the workflow runs three parallel process branches inside a 
loop: news collection, GitHub activity, and ATS-routed job postings via a Switch 
node (Greenhouse API or Ashby API). Signals are merged by company name, cleaned, and sent to Claude. For each interation, results accumulate via the loop's done output, where they're sorted by intent score 
and appended to a completed Google Sheets or CSV file output.

# n8n Node Diagram 

<img width="1329" height="668" alt="image" src="https://github.com/user-attachments/assets/f7de80ce-65ff-4d6b-9e55-44a326678590" />

## Problem Being Addressed

Sales teams target hundreds of accounts but most lack a systematic way to surface which ones are showing key buying signals right now and focus their efforts on enterprises with the highest demand for their product.

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
- **Output:** Google Sheets/CSV File (Set up for easy future Snowflake integration)
