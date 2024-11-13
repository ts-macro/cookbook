import { replaceWithBooleanLiteralPlugin } from '@tsm-cookbook/replace-with-boolean-literal'
import { defineConfig } from 'ts-macro'

export default defineConfig({
  plugins: [replaceWithBooleanLiteralPlugin({
    constants: {
      globalObject: {
        trueValue: true,
        falsyValue: false,
      },
    },
  })],
})
