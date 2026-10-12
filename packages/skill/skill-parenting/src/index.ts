/**
 * Bundled `parenting-master` skill provider.
 *
 * @module @deepseek-ai/dsh-skill-parenting
 */

import { readFile } from 'node:fs/promises'
import type { Context } from '@deepseek-ai/cordis'
import {
  BUNDLED_SKILL_RANK,
  type SkillCandidate,
  type SkillDefinition,
  type SkillProvider,
} from '@deepseek-ai/dsh-skill'

const PROVIDER_NAME = 'dsh-parenting'
const SKILL_BODY_URL = new URL('../assets/parenting-master.md', import.meta.url)
const INVOCATION = { modelInvocable: true, userInvocable: true } as const
const DESCRIPTION = '育儿大师：面向家长的循证养育支持，覆盖 0-18 岁孩子的日常照护与发育、行为与情绪、亲子沟通话术、健康症状与就医指征、中医辅助调理、父母自我成长与家庭结构议题。当用户咨询育儿、孩子的行为/情绪/睡眠/喂养/学习、亲子沟通、发育里程碑、儿童常见症状何时就医、父母养育压力或家庭培养计划时使用。只做建议，不做疾病诊断、处方或心理治疗。Evidence-informed parenting guidance for caregivers of children aged 0-18.'
const CANDIDATE: SkillCandidate = {
  name: 'parenting-master',
  description: DESCRIPTION,
  invocation: INVOCATION,
  provider: PROVIDER_NAME,
  source: 'bundled',
  rank: BUNDLED_SKILL_RANK,
  locator: SKILL_BODY_URL,
}

const provider: SkillProvider = {
  name: PROVIDER_NAME,
  list: () => Promise.resolve([CANDIDATE]),
  async get(_candidate): Promise<SkillDefinition> {
    return {
      name: CANDIDATE.name,
      description: CANDIDATE.description,
      invocation: CANDIDATE.invocation,
      provider: CANDIDATE.provider,
      source: CANDIDATE.source,
      content: await readFile(SKILL_BODY_URL, 'utf8'),
    }
  },
}

/** Cordis plugin name. */
export const name = 'skill-parenting'
/** Service required by the bundled provider. */
export const inject = ['skills']

/** Register the bundled `parenting-master` provider on `ctx.skills`. */
export function apply(ctx: Context): void {
  ctx.skills.registerProvider(() => provider)
}
