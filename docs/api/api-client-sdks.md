---
title: "CLI, SDKs, and libraries"
source: "https://platform.claude.com/docs/en/api/client-sdks"
category: "api"
generated: true
---
# CLI, SDKs, and libraries

Official tools for building with the Claude API: the ant CLI, client SDKs in seven languages, and framework-specific libraries.

---

Anthropic provides three kinds of official tooling for building with the Claude API:

- **CLI:** The `ant` command-line tool for shell scripting and interactive use.
- **Client SDKs:** General-purpose Messages API clients for Python, TypeScript, C#, Go, Java, PHP, and Ruby. Each SDK provides idiomatic interfaces, type safety, and built-in support for streaming, retries, and error handling.
- **Libraries and integrations:** Packages and compatibility layers that expose Claude inside another framework's API surface rather than the Messages API directly.

<Info>
  For the full API specification, see the [API reference](./api-overview.md).
</Info>

## CLI

<CardGroup cols={3}>
  <Card title="ant CLI" href="https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart.md">
    Shell scripting, typed flags, response transforms
  </Card>
</CardGroup>

## Client SDKs

<CardGroup cols={3}>
  <Card title="Python" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/python.md">
    Sync and async clients, Pydantic models
  </Card>
  <Card title="TypeScript" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript.md">
    Node.js, Deno, Bun, and browser support
  </Card>
  <Card title="C#" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/csharp.md">
    .NET Standard 2.0+, IChatClient integration
  </Card>
  <Card title="Go" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/go.md">
    Context-based cancellation, functional options
  </Card>
  <Card title="Java" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/java.md">
    Builder pattern, CompletableFuture async
  </Card>
  <Card title="PHP" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/php.md">
    Value objects, builder pattern
  </Card>
  <Card title="Ruby" href="https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/ruby.md">
    Sorbet types, streaming helpers
  </Card>
</CardGroup>

## Libraries and integrations

Libraries and integrations expose Claude through another framework's API surface. They are not general-purpose Messages API clients.

<CardGroup cols={3}>
  <Card title="Apple Foundation Models" href="https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/apple-foundation-models.md">
    Swift package for Apple's `LanguageModelSession` API
  </Card>
  <Card title="OpenAI SDK compatibility" href="https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/openai-sdk.md">
    Use Claude through the OpenAI SDK surface
  </Card>
</CardGroup>