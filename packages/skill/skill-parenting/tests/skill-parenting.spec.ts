import { Context } from '@deepseek-ai/cordis'
import { describe, expect, it } from 'vitest'
import SkillRegistry from '@deepseek-ai/dsh-skill'
import * as SkillParenting from '@deepseek-ai/dsh-skill-parenting'

describe('dsh-skill-parenting', () => {
  it('registers and disposes the bundled parenting-master skill', async () => {
    const ctx = new Context()
    await ctx.plugin(SkillRegistry)
    const fiber = await ctx.plugin(SkillParenting)

    const listed = await ctx.skills.list()
    expect(listed).toEqual([{
      name: 'parenting-master',
      description: expect.stringContaining('育儿大师'),
      invocation: { modelInvocable: true, userInvocable: true },
      provider: 'dsh-parenting',
      source: 'bundled',
    }])

    const loaded = await ctx.skills.get('parenting-master')
    expect(loaded?.content).toContain('每一个孩子都是天才')
    expect(loaded?.invocation).toEqual({ modelInvocable: true, userInvocable: true })

    await fiber.dispose()
    expect(await ctx.skills.list()).toEqual([])
  })
})
