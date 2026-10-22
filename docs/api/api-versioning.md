---
title: "Version history"
source: "https://platform.claude.com/docs/en/api/versioning"
category: "api"
generated: true
---
---
title: Versions
url: https://platform.claude.com/docs/en/api/versioning
description: "When making API requests, you must send an `anthropic-version` request header. For example, `anthropic-version: 2026-10-21`. If you are using the [client SDKs](../general/general-cli-sdks-libraries-overview.md), this is handled for you automatically."
---

For any given API version, Anthropic preserves:

* Existing input parameters
* Existing output parameters

However, Anthropic may do the following:

* Add additional optional inputs
* Add additional values to the output
* Change conditions for specific error types
* Add new variants to enum-like output values (for example, streaming event types)

Generally, if you are using the API as documented in this reference, Anthropic will not break your usage.

## Version history

Anthropic recommends using the latest API version whenever possible.

* `2026-10-21`

  * [Migrating to API version 2026-10-21](./api-migration-2026-10-21.md) shows how to upgrade.

  * Available on the Claude API, [Claude Platform on AWS](../build-with-claude/build-with-claude-claude-platform-on-aws.md), [Microsoft Foundry](../build-with-claude/build-with-claude-claude-in-microsoft-foundry.md), and [Google Cloud](../build-with-claude/build-with-claude-claude-on-vertex-ai.md). On [Amazon Bedrock](../build-with-claude/build-with-claude-claude-in-amazon-bedrock.md), it's available for Claude 4.7 and later models. For other models on Bedrock, see the [migration guide](./api-migration-2026-10-21.md#upgrade).

  * Messages API:

    * A request that places a `document` block directly in an `assistant` message returns a 400 error.
    * Sending a `text` block with a non-empty `citations` array in a `user` message, directly or inside a `search_result` block, returns a 400 error.
    * The `temperature`, `top_p`, and `top_k` request parameters are removed. A request that sends any of them returns a 400 error on every model.

  * Admin API:

    * [RBAC groups](./api-beta-organization-rbac_groups-list.md) no longer return `roles`. Use `role_ids` instead.
    * [RBAC group members](./api-beta-organization-rbac_groups-members-list.md), and the response to removing one, no longer return `group_id`. Use `rbac_group_id` instead.
    * [RBAC roles](./api-beta-organization-rbac_roles-list.md) no longer return `name`. Use `display_name` instead.
    * [Organization](./api-organization-rate_limits-list.md) and [workspace](./api-organization-workspaces-rate_limits-list.md) rate-limit entries no longer return `group_type`. Use `group.type` instead.
    * [API keys](./api-organization-api_keys-list.md) no longer return `workspace_id`. Use `scope.workspace_id` instead, which gives the workspace's real ID even for the Default Workspace (an all-workspaces key has no `workspace_id` in `scope`).

  * Claude Enterprise Analytics API:

    * The per-user [usage](./api-beta-organization-analytics-user_usage_report-list.md) and [cost](./api-beta-organization-analytics-user_cost_report-list.md) reports no longer have `actor.email`. Use `actor.email_address` instead.
    * The [activity summaries](./api-beta-organization-analytics-summaries-list.md) response no longer has `summaries`. Use `data` instead.

- `2023-06-01`

  * New format for [streaming](../build-with-claude/build-with-claude-streaming.md) server-sent events (SSE):

    * Completions are incremental. For example, `" Hello"`, `" my"`, `" name"`, `" is"`, `" Claude." `instead of `" Hello"`, `" Hello my"`, `" Hello my name"`, `" Hello my name is"`, `" Hello my name is Claude."`.
    * All events are [named events](https://developer.mozilla.org/en-US/Web/API/Server-sent%5Fevents/Using%5Fserver-sent%5Fevents#named%5Fevents), rather than [data-only events](https://developer.mozilla.org/en-US/Web/API/Server-sent%5Fevents/Using%5Fserver-sent%5Fevents#data-only%5Fmessages).
    * Removed unnecessary `data: [DONE]` event.

  * Removed legacy `exception` and `truncated` values in responses.

- `2023-01-01`: Initial release.
