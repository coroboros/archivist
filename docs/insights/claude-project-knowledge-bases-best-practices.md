---
title: "Best Practices for Claude Project Knowledge Bases"
source: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags"
category: "insights"
author: "Anthropic"
date: "2025-01-01"
tags: ["claude-projects", "knowledge-base", "rag", "frontmatter", "chunking"]
---

## Best Practices for Claude Project Knowledge Bases

These best practices are designed around Claude’s own recommendations for optimal document ingestion.

1. **Use One Level of Subfolders**

    Claude performs best with a single level of categorization, avoiding deep nesting.

    Recommended structure:

    ```shell
    docs/
    ├── code/
    │   ├── code-amazon-bedrock.md
    │   └── code-analytics.md
    │   └── ...
    ├── developer/
    │   ├── developer-about-claude-model-deprecations.md
    │   └── developer-about-claude-models-choosing-a-model.md
    │   └── ...
    └── resources/
    │   ├── resources-about-claude-glossary.md
    │   └── resources-about-claude-use-case-guides-content-moderation.md
    │   └── ...
    ```

    This strikes the right balance between clarity and simplicity.

2. **Prefer Multiple, Small Files**

    Smaller, focused documents improve retrieval accuracy and reduce irrelevant context when Claude answers questions.

3. **Filenames Are Critical Metadata**

    Filenames are scanned before content and act as implicit context.

    ✅ **Good examples**:
      - business-setup-uk-llp.md
      - aml-uae-law-2023.md

    ❌ **Avoid**:
      - doc1.md
      - final-version.pdf

    ✅ **Use**:
      - Hyphens (`-`)
      - Years, regions, and document type when relevant
      - No special characters

4. **Clean and Standard Markdown**

    Stick to clean Markdown:
      - Avoid custom syntax
      - Avoid excessive HTML
      - Keep headings meaningful

    This ensures compatibility with Claude’s internal parsing and chunking.
