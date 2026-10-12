---
description: "默认 Web 组合包，在官方分组中提供 dshmarket 插件市场。"
kind: "package-bundle"
---

# @deepseek-ai/dsh-market

[English](README.md) | 中文

## 概述

本组合包在 Web 应用中挂载 [dshmarket](https://github.com/dsh-market/dsh-market) 插件市场，让用户可以在 Harness 内浏览、搜索并安装社区插件。Web profile 默认选择它，插件管理器仍将其列在官方分组，因此可以关闭它而不必卸载产品依赖。

## 目录

- [使用本包](#use-this-package)
- [理解实现](#understand-the-implementation)
- [模型体验](#model-experience)
- [已知限制与延期工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

Web profile 默认启用本组合包，因此在标准的 `dsh web` 启动和打包后的桌面应用中都自带插件市场。在插件管理器的官方分组中打开**插件市场**即可浏览并安装插件。

在官方分组中关闭本组合包，即可从当前 Web profile 移除插件市场。由于它是可选组合包而非已安装依赖，关闭它不会卸载任何产品包。

-----

<a id="understand-the-implementation"></a>
## 理解实现

<details>
<summary>实现内部细节 — 点击展开</summary>

[`cordis.patch.yml`](cordis.patch.yml) 在 `@deepseek-ai/dsh-web-app` 之后将 `dshmarket` 插件插入 Web 组合，因此它注入的设置与语言槽位已经存在。启动器把本包同时登记在 `OPTIONAL_BUNDLES` 和 `DEFAULT_ENABLED_OFFICIAL_BUNDLES` 中，使其既保留在官方分组，又被 Web 模板默认选择。`dshmarket` 提供市场实现；本包只携带官方分组所需的图标与语言显示元数据。

</details>

-----

<a id="model-experience"></a>
## 模型体验

无，因为本组合包挂载 dshmarket 插件市场界面，不贡献模型上下文。

#### KV Cache 影响

无；本组合包不增加请求内容。

## 已知限制与延期工作

<a id="known-limitations-and-deferred-work"></a>

- **仅支持 Web** — 市场界面依赖 Web 应用的插件管理器服务。
- **外部包** — 市场实现来自已发布的 `dshmarket` 包；本组合包不内置其源码。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者工作上下文 — 点击展开</summary>

无。

</details>
