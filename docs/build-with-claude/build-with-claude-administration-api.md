---
title: "Admin API"
source: "https://platform.claude.com/docs/en/build-with-claude/administration-api"
category: "build-with-claude"
generated: true
---
# Admin API

Manage organization members, workspaces, invites, and API keys programmatically with the Admin API, using an Admin API key or an `org:admin` OAuth token.

---

<Tip>
  **The Admin API is unavailable for individual accounts.** To collaborate with teammates and add members, set up your organization in **Console → Settings → Organization**.
</Tip>

The [Admin API](../api/api-admin.md) allows you to programmatically manage your organization's resources, including organization members, workspaces, and API keys. This provides programmatic control over administrative tasks that would otherwise require manual configuration in the [Claude Console](/).

<Check>
  **The Admin API requires special access**

  The Admin API accepts two credentials:

  * An **Admin API key** (starting with `sk-ant-admin...`) sent in the `x-api-key` header. Only organization members with the admin role can provision one. See [Create an Admin API key](../manage-claude/manage-claude-admin-api-keys.md).
  * An **OAuth bearer token** with the `org:admin` scope sent in the `authorization: Bearer` header. Only members with the admin, owner, or primary owner role can obtain one. See [Obtain an OAuth bearer token](#oauth-bearer-token).
</Check>

<Note>
  **Claude Enterprise:** Claude Enterprise (claude.ai) organizations use the Admin API too, with a scoped API key created in claude.ai. Of the endpoints on this page, only members and invites are available to them (in beta), alongside Claude-Enterprise-only endpoints: groups and custom-role reads (beta), and [spend limits](../manage-claude/manage-claude-spend-limits-api.md). See [User management](../manage-claude/manage-claude-user-management.md) for Claude Enterprise.
</Note>

<Note>
  **Claude Platform on AWS:** Most of the Admin API is not available on Claude Platform on AWS. Workspace endpoints (create, get, list, update, and archive on `/v1/organizations/workspaces`) are available. Other endpoints including organization members, workspace members, invites, API keys, usage reports, cost reports, and rate limit reports are not available. See [Claude Platform on AWS](./build-with-claude-claude-platform-on-aws.md) for details.
</Note>

## Authentication

Authenticate with either credential. An Admin API key covers most endpoints; the service-account, federation-issuer, and federation-rule endpoints accept only an `org:admin` OAuth token. The following examples call the [organization info endpoint](#accessing-organization-info) both ways.

### OAuth bearer token

Log in with the [`ant` CLI](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart.md) under a dedicated profile, requesting the `org:admin` scope (see [Admin access](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication.md#admin-access)), then export the bearer token. A dedicated profile keeps your routine commands from running with elevated access:

```bash CLI
ant auth login --profile admin --scope "org:admin"
export ANTHROPIC_OAUTH_TOKEN=$(ant auth print-credentials --profile admin --access-token)
```

Interactive tokens are short-lived; if requests start returning 401, re-run the `export` command, which refreshes the token automatically.

Call the Admin API with the exported token:

```bash cURL
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/me" \
  --header "anthropic-version: 2023-06-01" \
  --header "authorization: Bearer $ANTHROPIC_OAUTH_TOKEN"
```

An `org:admin` token grants access to the whole organization, regardless of the workspace the underlying profile or [federation rule](#federation-rules) is bound to.

For CI and other non-interactive workloads, mint the token with Workload Identity Federation instead of logging in interactively. See [Manage WIF with the Admin API](../manage-claude/manage-claude-wif-admin-api.md#workload-ci-and-automation).

### Admin API key

To create an Admin API key for your organization type, see [Create an Admin API key](../manage-claude/manage-claude-admin-api-keys.md).

```bash cURL
curl --fail-with-body -sS "https://api.anthropic.com/v1/organizations/me" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

## How the Admin API works

When you use the Admin API:

1. You make requests using either credential from the [Authentication](#authentication) section

2. The API allows you to manage:

   * Organization members and their roles
   * Organization member invites
   * Workspaces and their members
   * API keys
   * Service accounts, federation issuers, and federation rules (these endpoints require an `org:admin` OAuth token; Admin API keys are not accepted)

This is useful for:

* Automating user onboarding/offboarding
* Programmatically managing workspace access
* Monitoring and managing API key usage

## Organization roles and permissions

There are five organization-level roles. See more details in the [API Console roles and permissions](https://support.claude.com/en/articles/10186004-api-console-roles-and-permissions) article.

| Role               | Permissions                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| user               | Can use Workbench                                                             |
| claude\_code\_user | Can use Workbench and [Claude Code](https://code.claude.com/docs/en/overview) |
| developer          | Can use Workbench and manage API keys                                         |
| billing            | Can use Workbench and manage billing details                                  |
| admin              | Can do all of the preceding, plus manage users                                |

Organization owners and primary owners have all admin permissions and can additionally manage admins. All references to the admin role on this page also apply to owners and primary owners.

## Key concepts

### Organization members

You can list [organization members](https://platform.claude.com/docs/en/api/admin-api/users/get-user.md), update member roles, and remove members.

<CodeGroup>
  ```bash cURL
  # List organization members
  curl "https://api.anthropic.com/v1/organizations/users?limit=10" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"

  # Update member role
  curl "https://api.anthropic.com/v1/organizations/users/{user_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "content-type: application/json" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    --data '{"role": "developer"}'

  # Remove member
  curl --request DELETE "https://api.anthropic.com/v1/organizations/users/{user_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
  ```
</CodeGroup>

### Organization invites

You can invite users to organizations and manage those [invites](https://platform.claude.com/docs/en/api/admin-api/invites/get-invite.md).

<CodeGroup>
  ```bash cURL
  # Create invite
  curl --request POST "https://api.anthropic.com/v1/organizations/invites" \
    --header "anthropic-version: 2023-06-01" \
    --header "content-type: application/json" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    --data '{
      "email": "newuser@domain.com",
      "role": "developer"
    }'

  # List invites
  curl "https://api.anthropic.com/v1/organizations/invites?limit=10" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"

  # Delete invite
  curl --request DELETE "https://api.anthropic.com/v1/organizations/invites/{invite_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
  ```
</CodeGroup>

### Workspaces

For a comprehensive guide to workspaces, including Console and API examples, see [Workspaces](../manage-claude/manage-claude-workspaces.md).

### Workspace members

Manage [user access to specific workspaces](https://platform.claude.com/docs/en/api/admin-api/workspace_members/get-workspace-member.md):

<CodeGroup>
  ```bash cURL
  # Add member to workspace
  curl --request POST "https://api.anthropic.com/v1/organizations/workspaces/{workspace_id}/members" \
    --header "anthropic-version: 2023-06-01" \
    --header "content-type: application/json" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    --data '{
      "user_id": "user_xxx",
      "workspace_role": "workspace_developer"
    }'

  # List workspace members
  curl "https://api.anthropic.com/v1/organizations/workspaces/{workspace_id}/members?limit=10" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"

  # Update member role
  curl --request POST "https://api.anthropic.com/v1/organizations/workspaces/{workspace_id}/members/{user_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "content-type: application/json" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    --data '{
      "workspace_role": "workspace_admin"
    }'

  # Remove member from workspace
  curl --request DELETE "https://api.anthropic.com/v1/organizations/workspaces/{workspace_id}/members/{user_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
  ```
</CodeGroup>

### API keys

Monitor and manage [API keys](../api/api-admin-api_keys-list.md). Each key in the response includes its `expires_at` timestamp (`null` for keys without an [expiration](../manage-claude/manage-claude-authentication.md#key-expiration)):

<CodeGroup>
  ```bash cURL
  # List API keys
  curl "https://api.anthropic.com/v1/organizations/api_keys?limit=10&status=active&workspace_id=wrkspc_xxx" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY"

  # Update API key
  curl --request POST "https://api.anthropic.com/v1/organizations/api_keys/{api_key_id}" \
    --header "anthropic-version: 2023-06-01" \
    --header "content-type: application/json" \
    --header "x-api-key: $ANTHROPIC_ADMIN_KEY" \
    --data '{
      "status": "inactive",
      "name": "New Key Name"
    }'
  ```
</CodeGroup>

### Service accounts

Create and manage service accounts (`svac_...`), the non-human identities that [Workload Identity Federation](../manage-claude/manage-claude-workload-identity-federation.md) tokens act as. Admin API keys are not accepted on the service-account, federation-issuer, or federation-rule endpoints; use an `org:admin` OAuth token. See [Manage WIF with the Admin API](../manage-claude/manage-claude-wif-admin-api.md#service-accounts).

### Federation issuers

Register the OIDC identity providers (`fdis_...`) whose tokens may assert workload identity for your organization. See [Manage WIF with the Admin API](../manage-claude/manage-claude-wif-admin-api.md#federation-issuers).

### Federation rules

Manage the rules (`fdrl_...`) that map issuer tokens to service accounts and scopes. See [Manage WIF with the Admin API](../manage-claude/manage-claude-wif-admin-api.md#federation-rules).

## Accessing organization info

Get information about your organization programmatically with the `/v1/organizations/me` endpoint.

For example:

```bash cURL
curl "https://api.anthropic.com/v1/organizations/me" \
  --header "anthropic-version: 2023-06-01" \
  --header "x-api-key: $ANTHROPIC_ADMIN_KEY"
```

```json
{
  "id": "12345678-1234-5678-1234-567812345678",
  "type": "organization",
  "name": "Organization Name"
}
```

This endpoint is useful for programmatically determining which organization an Admin API key belongs to.

For complete parameter details and response schemas, see the [Organization Info API reference](https://platform.claude.com/docs/en/api/admin-api/organization/get-me.md).

## Usage and cost reports

Track your organization's usage and costs with the [Usage and Cost API](../manage-claude/manage-claude-usage-cost-api.md).

## Claude Code analytics

Monitor developer productivity and Claude Code adoption with the [Claude Code Analytics API](../manage-claude/manage-claude-claude-code-analytics-api.md).

## Rate limits

Read the rate limits configured for your organization and its workspaces with the [Rate Limits API](../manage-claude/manage-claude-rate-limits-api.md).

## Compliance API

Retrieve audit and activity data for your organization with the [Compliance API](../manage-claude/manage-claude-compliance-api.md). Admin API keys can read the Activity Feed only; for full access, see [Set up the Compliance API](../manage-claude/manage-claude-compliance-api-access.md).

## Best practices

To effectively use the Admin API:

* Use meaningful names and descriptions for workspaces and API keys
* Implement proper error handling for failed operations
* Regularly audit member roles and permissions
* Clean up unused workspaces and expired invites
* Monitor API key usage, audit each key's [`expires_at`](../manage-claude/manage-claude-authentication.md#key-expiration), and rotate keys periodically

## FAQ

<AccordionGroup>
  <Accordion title="What permissions are needed to use the Admin API?">
    The Admin API accepts either an Admin API key (starting with `sk-ant-admin`) or an OAuth bearer token with the `org:admin` scope. Only organization members with the admin role can provision Admin API keys, and only members with the admin, owner, or primary owner role can obtain `org:admin` tokens. See [Authentication](#authentication).
  </Accordion>

  <Accordion title="Can I create new API keys through the Admin API?">
    No, new API keys can only be created through the Claude Console for security reasons. The Admin API can only manage existing API keys.
  </Accordion>

  <Accordion title="What happens to API keys when removing a user?">
    API keys persist in their current state as they are scoped to the organization, not to individual users.
  </Accordion>

  <Accordion title="Can organization admins be removed through the API?">
    No, organization members with the admin role cannot be removed through the API for security reasons.
  </Accordion>

  <Accordion title="How long do organization invites last?">
    Organization invites expire after 21 days. There is currently no way to modify this expiration period.
  </Accordion>
</AccordionGroup>

For workspace-specific questions, see the [Workspaces FAQ](../manage-claude/manage-claude-workspaces.md#faq).
