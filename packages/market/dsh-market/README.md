---
description: "Default Web bundle that ships the dshmarket plugin market in the Official group."
kind: "package-bundle"
---

# @deepseek-ai/dsh-market

English | [中文](README.zh.md)

## Summary

This bundle mounts the [dshmarket](https://github.com/dsh-market/dsh-market) plugin market in the Web application so a person can browse, search, and install community plugins from inside the harness. The Web profile selects it by default, and the Plugin Manager keeps listing it in the Official group so it can be switched off without uninstalling a product dependency.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

The Web profile ships this bundle enabled, so the plugin market is present on a stock `dsh web` launch and in the packaged desktop application. Open **Plugin Market** from the Plugin Manager's Official group to browse and install plugins.

Switch the bundle off in the Official group to remove the market from the current Web profile. Because it is an optional bundle rather than an installed dependency, switching it off never uninstalls a product package.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

[`cordis.patch.yml`](cordis.patch.yml) inserts the `dshmarket` plugin into the Web composition after `@deepseek-ai/dsh-web-app`, so the settings and locale slots it injects already exist. The launcher names this package in both `OPTIONAL_BUNDLES` and `DEFAULT_ENABLED_OFFICIAL_BUNDLES`, which keeps it in the Official group while the Web template selects it. `dshmarket` supplies the market implementation; this package carries only the icon and locale display metadata the Official group requires.

</details>

-----

<a id="model-experience"></a>
## Model Experience

None, as this bundle mounts the dshmarket plugin-market UI without contributing model context.

#### KV Cache effect

None; the bundle adds no request content.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>

- **Web only** — the market UI requires the Web application's Plugin Manager services.
- **External package** — the market implementation is the published `dshmarket` package; this bundle does not vendor its source.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

None.

</details>
