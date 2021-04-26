/**
 * @fileoverview react hook arguments  break line
 * @author meerkat-morecat
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/deps-break-line");

var RuleTester = require("eslint").RuleTester;


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
        "var demo = useDemo(argument1,argument2)",
        "var result = f(1,2)",
        "var result = f(1,[2])",
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "useInvalidDemo1(argument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: 'useInvalidDemo1(\nargument1,\n[argument2]\n)'
        },
        {
            code: "useInvalidDemo2(\nargument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: 'useInvalidDemo2(\nargument1,\n[argument2]\n)'
        },
        {
            code: "useInvalidDemo3(argument1,\n[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: 'useInvalidDemo3(\nargument1,\n[argument2]\n)'
        },
        // with VariableDeclaration
        {
            code: "var demo = useInvalidDemo4(argument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: "var demo = useInvalidDemo4(\nargument1,\n[argument2]\n)",
        },
        {
            code: "var demo = useInvalidDemo5(\nargument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: "var demo = useInvalidDemo5(\nargument1,\n[argument2]\n)",
        },
        {
            code: "var demo = useInvalidDemo6(argument1,\n[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }],
            output: "var demo = useInvalidDemo6(\nargument1,\n[argument2]\n)",
        }
    ],
});
