# replace-with-boolean-literal plugin

Replace given constants with boolean literals.

## Setup

```ts
import { replaceWithBooleanLiteral } from '@tsm-cookbook/replace-with-boolean-literal'

export default defineConfig({
  plugins: [replaceWithBooleanLiteral({
    constants: {
      globalObject: {
        trueValue: true,
        falsyValue: false,
      }
    }
  })],
})
```

## Example (`LSP Runtime`)

```ts
if (globalObject.trueValue) {
  console.log('true')
}

if (globalObject.falsyValue) {
  console.log('false')
}
```

To

```ts
if (true) {
  console.log('true')
}

if (false) {
  console.log('false')
}
```
