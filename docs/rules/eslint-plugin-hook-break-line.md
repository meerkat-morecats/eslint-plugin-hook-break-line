# react hook arguments break line (eslint-plugin-hook-break-line)

Wrap rules for react-hook with two arguments.

## Rule Details

Examples of **incorrect** code for this rule:

```js
useEffect(()=>{},[deps])

useEffect(
    ()=>{},[deps])

useEffect(
    ()=>{},
    [deps])
```

Examples of **correct** code for this rule:

```js

useEffect(
    ()=>{
        // do something
    },
    [deps]
)

```
