import type { PluginReturn } from 'ts-macro'
import { getProperty } from 'dot-prop'
import { replaceSourceRange } from 'muggle-string'
import { createPlugin } from 'ts-macro'

interface NestedObject {
  [key: string]: NestedObject | boolean
}

export interface ReplaceWithBooleanLiteralPluginOptions {
  constants: NestedObject
}

export const replaceWithBooleanLiteralPlugin: PluginReturn<ReplaceWithBooleanLiteralPluginOptions> = createPlugin(({ ts }, { constants }) => {
  return {
    name: 'ts-macro-insert-boolean-literal',
    resolveVirtualCode({ ast, codes }) {
      Object.entries(constants).forEach(([key, value]) => {
        codes.push(`declare const ${key} = ${JSON.stringify(value)};`)
      })
      const rawText = ast.getText()

      ts.forEachChild(ast, (node) => {
        if (
          ts.isIfStatement(node)
          && ts.isPropertyAccessExpression(node.expression)
        ) {
          const getterExprStr = rawText.substring(
            node.expression.pos,
            node.expression.end,
          )
          const target = `${getProperty(constants, getterExprStr)}`
          replaceSourceRange(
            codes,
            undefined,
            node.expression.pos,
            node.expression.end,
            target,
          )
        }
      })
    },
  }
})
