/**
 * @fileoverview react hook arguments  break line
 * @author meerkat-morecat
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/deps-break-line"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("deps-break-line", rule, {

    valid: [
        "useDemo(\nargument1,\n[deps]\n)",
        "useDemo(argument1,argument2)",
        "f(1,2)",
        "f(1,[2])",
        "var demo = useDemo(\nargument1,\n[deps]\n)",
        "var demo =useDemo(argument1,argument2)",
        "var result = f(1,2)",
        "var result = f(1,[2])",
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "useInvalidDemo1(argument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }]
        },
        {
            code: "var demo = useInvalidDemo2(argument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }]
        }
    ]
});
