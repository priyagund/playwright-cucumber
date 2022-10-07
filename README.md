## step by step instalation for playwright cucumber

1.initialize npm

```
npm init
```

2.install cucumber

```
npm install @cucumber/cucumber
```

3.install typescript

```
npm install typescript
```

4.install playwright as library

```
npm install playwright@latest

```

5. add cucumber extentions

## error and solution

1.

```
/Users/priyankagund/Documents/playwright-cucumber/step-defs/login-step.ts:1
import { Given, Then, When } from "@cucumber/cucumber";
^^^^^^

SyntaxError: Cannot use import statement outside a module

```

solution

```
i.npm install ts-node
ii. add --require-module ts-node/register package.json

```
