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
        "useDemo(\nargument1,\n[argument2]\n)",
        "f(1,2)",
        "f(1,[2])",
        "useDemo(argument1,argument2)",
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code:  "useDemo(argument1,[argument2])",
            errors: [{
                messageId: 'hookArgumentsBreakLine',
            }]
        },
    ]
});
