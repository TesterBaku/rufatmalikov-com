# Lessons

Patterns captured after corrections, so they don't repeat.

## Don't infer a project's features from its repo name / description

- **What happened:** When adding the "Quiz Formatter" project to the site, I described it as having "AI explanations using ChatGPT" — inferred from the repo name `quiz_formatter_with_chatgpt` and its GitHub description ("Python + OpenAI"). The app does **not** use ChatGPT to answer questions or give hints; that was only a potential future idea. Mistake explanations come from the answer key embedded in the PDF.
- **Rule:** Repo names, taglines, and one-line GitHub descriptions are not a reliable spec. Before publishing feature claims (especially AI/ChatGPT capabilities) to the public site, confirm them against the actual code/README behavior or ask the user. When unsure, describe only what's verified and leave out the rest.
