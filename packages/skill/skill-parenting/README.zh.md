---
description: "随包附带的「parenting-master（育儿大师）」skill（技能），供启用、使用或排查该默认开启的育儿建议提供方的用户与维护者阅读。"
kind: "package-reference"
---

# @deepseek-ai/dsh-skill-parenting

[English](README.md) | 中文

## 概述

agent（智能体）可以通过该提供方加载内置的 `parenting-master` skill，并遵循其指令，为家长提供覆盖 0-18 岁孩子以及父母自身成长的循证养育建议。该提供方没有配置，随附的 base 组合以启用状态包含该插件，因此安装后即存在。该 skill 同时可被模型调用与可被用户调用：模型在请求与育儿相关时加载它，用户也可以直接从 `/` skill 选择器中选它。

## 目录

- [使用本包](#use-this-package)
- [理解实现](#understand-the-implementation)
- [进一步探索](#further-exploration)
- [模型体验](#model-experience)
- [已知限制与延期工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

插件一经组合，`parenting-master` skill 就会出现在会话 skill 目录中；模型可以像加载任何其他 skill 一样加载它，用户也可以从 `/` 列表中选择它。

### 何时选择

当部署方希望家长无需存入本地 skill 目录即可拥有内置育儿建议时，选择此提供方。该 skill 把权威育儿知识翻译成家长今天就能用的判断标准、步骤与话术，并说明自身边界：不诊断、不处方、不做心理治疗与法律/医疗判断。

### 启用插件

该插件没有配置，且在随附的 base 组合中默认启用。把它的组合行加入任意基于 base 的 profile 即可；该行已经存在于其中：

```yaml
- name: '@deepseek-ai/dsh-skill-parenting'
```

对于不需要该 skill 的部署，在该行上设 `disabled: true` 即可退出。

### 育儿 skill 提供什么

- **固定的角色与立场。** 先托举家长、连接优先于纠正、允许优先于压制、身体不适先排除医学问题。
- **六段式输出结构。** 问题定位、分析、可执行方案、可直接照说的话术、风险提醒/就医指征，以及免责声明。
- **明确的范围边界。** 范围外请求（诊断、处方、心理治疗、法律/升学政策、康复训练处方）会得到带去向的三段式边界回应，绝不硬答。内容以中国内地医疗与公共服务体系为基准，其他地区以当地官方发布为准。

### 可观察的成功与失败

组合该插件后，`parenting-master` 会出现在目录中、可凭名称加载、并可在 `/` 中选择；禁用该行则它不会出现在任何目录中。由于提供方不可变，发现始终成功且恰好返回一个 skill，绝不会报告部分结果。

-----

<a id="understand-the-implementation"></a>
## 理解实现

<details>
<summary>实现细节——点击展开</summary>

本节解释内置提供方如何接线；可观察行为已在[使用本包](#use-this-package)中完整说明。

### 设计理念

该提供方是一个不可变、同步注册的 skill 来源：它以 `dsh-parenting` 作为提供方名称、按内置 skill rank（600）注册一个固定候选项，将其标记为既可模型调用又可用户调用，并在每次加载时从随包分发的 `assets/parenting-master.md` 文件读取 skill 正文。用于路由模型目录与 `/` 选择器的描述位于提供方源码中。

### 源码地图

| 文件 | 职责 |
|---|---|
| [`src/index.ts`](src/index.ts) | 插件入口与不可变提供方：一个候选项、路由描述、正文加载 |
| [`assets/parenting-master.md`](assets/parenting-master.md) | 随包分发的 skill 正文 |

</details>

-----

<a id="further-exploration"></a>
## 进一步探索

当包级约定不够用时，请阅读以下页面。这些页面先介绍该提供方注册到的注册表，再说明 skill 如何到达模型。

- [skill 子系统参考](../../../docs/subsystems/skills.zh.md)——该提供方实现的注册表与提供方约定。
- [skill 包](../skill/README.zh.md)——该提供方注册到的注册表，以及已加载 skill 的共享渲染。
- [tool-skill 包](../tool-skill/README.zh.md)——育儿 skill 如何到达会话目录与模型。

-----

<a id="model-experience"></a>
## 模型体验

通过 `dsh-tool-skill` 间接影响模型；该包会把该提供方的目录条目和所选 skill 的正文渲染给模型。

#### KV Cache 影响

该插件默认启用，会在其插入点为提供方 KV 前缀增加一个目录条目；加载正文时会在工具结果插入点增加相应内容。

## 已知限制与延期工作

<a id="known-limitations-and-deferred-work"></a>


这些限制说明内置提供方不做什么。它们是当前包约束，不是任务积压。

- **固定一个 skill，无运行时自定义**——提供方恰好贡献 `parenting-master` 这一个 skill；需要其他变体的部署请自行编写 skill。
- **只做建议，绝不做专业判断**——该 skill 不诊断、不处方、不做心理治疗或法律/医疗判断；范围外请求会得到边界回应与去向。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

无。

</details>
