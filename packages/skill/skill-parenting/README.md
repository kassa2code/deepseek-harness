---
description: "The bundled 'parenting-master' skill for users and maintainers enabling, using, or debugging the default-on parenting guidance provider."
kind: "package-reference"
---

# @deepseek-ai/dsh-skill-parenting

English | [中文](README.zh.md)

## Summary

Agents can load the bundled `parenting-master` skill from this provider and follow its instructions to give caregivers evidence-informed parenting guidance for children aged 0-18 plus the parents' own growth. The provider has no configuration, and the shipped base composition includes the plugin enabled, so it is present right after install. The skill is both model-invocable and user-invocable: the model loads it when a request is parenting-related, and a user can select it directly from the `/` skill picker.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

The `parenting-master` skill appears in the session skill catalog as soon as the plugin is composed; the model can load it like any other skill, and the user can pick it from the `/` list.

### When to choose it

Choose this provider when a deployment wants caregivers to have built-in parenting guidance without storing it in a local skill directory. The skill translates authoritative parenting knowledge into judgment criteria, steps, and scripts a caregiver can use today, and it states its own boundaries: it does not diagnose, prescribe, or provide psychological therapy or legal/medical judgment.

### Enable the plugin

The plugin has no configuration and is enabled by default in the shipped base composition. Add its composition row to any base-backed profile; it is already present there:

```yaml
- name: '@deepseek-ai/dsh-skill-parenting'
```

Set `disabled: true` on the row to opt out for a deployment that does not want the skill.

### What the parenting skill provides

- **A fixed role and stance.** Caregiver-first, connection over correction, permission over suppression, and ruling out medical causes first.
- **A six-part output structure.** Problem framing, analysis, actionable steps, ready-to-say scripts, risk/when-to-seek-care guidance, and a disclaimer.
- **Explicit scope boundaries.** Out-of-scope requests (diagnosis, prescription, therapy, legal/schooling policy, rehabilitation protocols) get a three-part boundary reply with a referral, never a forced answer. Content defaults to the mainland China medical and public-service system and defers to local official guidance elsewhere.

### Observable success and failures

With the plugin composed, `parenting-master` appears in the catalog and is loadable by name and selectable from `/`; disabling the row keeps it out of every catalog. Because the provider is immutable, discovery always succeeds with exactly one skill and never reports partial results.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

This section explains how the bundled provider is wired; the observable behavior is fully covered in [Use this package](#use-this-package).

### Design concept

The provider is an immutable, synchronously registered skill source: it registers one fixed candidate at the bundled skill rank (600) under the provider name `dsh-parenting`, marks it both model-invocable and user-invocable, and reads the skill body from the packaged `assets/parenting-master.md` file on every load. The description that routes both the model catalog and the `/` picker lives in the provider source.

### Source map

| File | Role |
|---|---|
| [`src/index.ts`](src/index.ts) | Plugin entry and the immutable provider: one candidate, routing description, body load |
| [`assets/parenting-master.md`](assets/parenting-master.md) | Packaged skill body |

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

Read these pages when the package-level contract is not enough. They move from the registry this provider registers on to how the skill reaches the model.

- [Skill subsystem reference](../../../docs/subsystems/skills.md) — the registry and provider contract this provider implements.
- [skill package](../skill/README.md) — the registry the provider registers on, and the shared rendering of loaded skills.
- [tool-skill package](../tool-skill/README.md) — how the parenting skill reaches the session catalog and the model.

-----

<a id="model-experience"></a>
## Model Experience

Indirectly, through `dsh-tool-skill`, which renders the provider's catalog entry and the selected skill body to the model.

#### KV Cache effect

Enabled by default, the plugin adds one catalog entry to the provider KV prefix at its insertion point; loading the body adds it at the tool-result insertion point.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>


These limits define what the bundled provider does not do. They are current package constraints, not a task backlog.

- **One fixed skill, no runtime customization** — the provider contributes exactly the `parenting-master` skill; deployments that need another variant author their own skill instead.
- **Advice only, never a professional judgment** — the skill does not diagnose, prescribe, or provide therapy or legal/medical decisions; out-of-scope requests get a boundary reply and a referral.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
