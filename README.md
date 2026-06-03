# Sales Intelligence Agent

An autonomous sales intelligence agent built with n8n and Claude. Given a list of target enterprise companies, the agent pulls buying signals from three public sources: job postings, global company news, and GitHub repo activity. It then scores each account and generates a structured Markdown account brief. Enables sales teams to focus on high-value enterprise accounts showing live buying signals. Each score comes with a written rationale and signal breakdown, not a black-box number, so reps get both a defensible priority rank and the reasoning behind it.

## 1. Problem Being Addressed

Sales teams target hundreds of enterprise accounts and most lack live context on which ones are showing buying signals right now. Modern intent tool stacks flood reps with scores and alerts but rarely explain why an account ranks where it does, so reps either work a static list by gut feel or chase every signal without prioritization.

## 2. Stack

- **Orchestration:** n8n (self-hosted via Docker)
- **LLM:** Claude Sonnet 4.6 via Anthropic API
- **Signal sources:** GitHub API, NewsAPI, Job Board ATS APIs (Greenhouse, Ashby)
- **Config:** YAML
- **Output:** Google Sheets/CSV File (Set up for easy future Snowflake integration)

## 3. Architecture

For each target enterprise customer, the workflow runs three parallel process branches inside a 
loop: news collection, GitHub activity, and ATS-routed job postings via a Switch 
node (Greenhouse API or Ashby API). Signals are merged by company name, cleaned, and sent to Claude. For each iteration, results accumulate via the loop's done output, where they are sorted by intent score 
and appended to a completed Google Sheets or CSV file output.

## 4. n8n Node Diagram 

<img width="1967" height="1027" alt="image" src="https://github.com/user-attachments/assets/274e401d-47cf-48a4-b03c-7d1945b35782" />

## 5. Signal Sources

| Source | Method | What is Captured |
|---|---|---|
| GitHub API | Public org repos endpoint | Repo activity, stars, push frequency |
| NewsAPI | Keyword search by company name | Recent mentions, product news |
| Job Boards | Greenhouse + Ashby APIs | Open GTM roles, total headcount |

## 6. Summarized Example Output

Live run from 2026-05-29 against a list of 20 SaaS target accounts. 
Top 3 by intent score:

| Rank | Company | Score | Tier | GTM Roles | Key Signal |
|:----:|---------|:-----:|:----:|:---------:|------------|
| 1 | Anthropic | 91 | High | 87 / 389 | Multi-region GTM buildout (EU, APAC, Korea) plus 5x Salesforce usage growth |
| 2 | Databricks | 88 | High | 139 / 768 | Industry-specific GTM leaders across APAC, EMEA, LATAM signal segmented enterprise motion |
| 3 | Hightouch | 88 | High | 34 / 64 | 53% GTM hiring ratio plus new 18,000 SF NYC office and dedicated AI Operations GTM role |

Full example output briefs are in the repo root: [anthropic_account_brief.md](anthropic_account_brief.md), [fivetran_account_brief.md](fivetran_account_brief.md), including reasoning, signal breakdown, and missing-signal monitoring.

Note: The agent weighs GTM hiring intensity, not just volume. For example, Hightouch (34 roles) ties Databricks (139 roles) because 53% of Hightouch's open postings are GTM-focused, signaling concentrated commercial investment rather than broad scaling.

## 7. Learnings

**Preventing parallel branch cross-contamination**

The three signal branches (news, GitHub, jobs) run in parallel for speed, and each hits a different external API that responds at its own pace. The first version merged branches by row position, assuming every branch returned companies in the same order. They didn't. One company's news got stitched to another's GitHub data, and the bug was invisible in single-company tests since there was only one record in output.

The fix was to stop trusting order. Each branch now stamps the company name onto its output, and the Merge nodes combine on a matching name field instead of position. Every record carries its own identity, so it no longer matters which branch finishes first. This was the hardest problem to diagnose and the most important fix in the build.

**Restructuring around the Switch node for ATS API calls**

Companies use different applicant tracking systems, so my early approach fired both Greenhouse and Ashby requests for every company and let the wrong one error out. That meant silent failures and wasted API calls on every run. Routing each company through a Switch node on its ats field, with a fallback for companies on neither system, made the jobs branch secure: exactly one path runs per company, and companies without a supported ATS return a clean empty result instead of an error that stalls the loop.

## 8. Cost Analysis 

Using Claude Sonnet 4.6 with API pricing as of 5/29/2026, the expected cost per company analysis brief is ~$0.011 and each account process in the loop takes ~20 seconds for the web API calls and LLM generation. Costs can be increased or decreased by selecting a different model or by changing API token limits (max_tokens) in the 'Build Agent Prompt' node.

## 9. Quick Start

1. Copy .env.example to .env, fill in API keys
2. Import workflows/sales_intelligence_agent_v1.json into n8n
3. Update config/accounts.yml with your target accounts
4. Click Execute Workflow

## 10. Roadmap
- Snowflake persistence layer with run history table
- dbt models for week-over-week score deltas and trend analysis
- Threshold-based Slack/email alerts when a company crosses tier boundaries
- Expansion from 20 target accounts to 50+ target accounts and weekly scheduled runs
