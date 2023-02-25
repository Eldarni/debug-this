# Debug This!

**Too lazy to turn on Xdebug? look no further for automatic generation of console.log and var_dump!**

## Features

Quickly replace single variables with a debug command of your choise, multiple variables across multiple lines are also supported.

![feature X](/images/preview.apng)

> Tip: Add a shorcut for `debug-this.createDebugReplacement` for fast debugging!

## Settings

Out of the box the plugin supports JavaScript and PHP contexts, however you are able to add your own, or edit the default replacements to suite your workflow - prefer `console.warn()`? then just edit the rules.

> Tip: search for `Debug This!` in your settings and hit `Edit in setting.json`.

**Each rule is a object with the following properties:**

`language` - An array of VSCode language id that this format rule is applied to. See [Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers) for info.

`single` - [Mustache](https://github.com/janl/mustache.js/) template for a replacement of a single line, `{{0}}` is the variable after going trhough the replacement, `{{1}}` is the raw variable.

`multi` - [Mustache](https://github.com/janl/mustache.js/) template for a replacement of multiple lines, use `{{#variables}}{{/variables}}` to iterate over the array of variables.

`delimiters` - Alternate mustache delimiters - used when the output template uses curly brackets.

`replace` - An array of search-replace rules to apply to the variable - typically used to escape whatever string literal quotes used in the template.

```json
[
    {
        "language": [
            "javascript"
        ],
        "single": "console.log('[[{0}]]', [[{1}]]);",
        "multi": "console.log({[[#variables]]\n\t'[[{0}]]' : [[{1}]],[[/variables]]\n});",
        "delimiters": [
            "[[",
            "]]"
        ],
        "replace": [
            [
                "'",
                "\\'"
            ]
        ]
    }
]
```