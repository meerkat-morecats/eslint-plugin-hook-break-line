/**
 * @fileoverview react hook arguments  break line
 * @author meerkat-morecat
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
var path = require('path');
var fs = require('fs');
var RuleTester = require("eslint").RuleTester;
var rule = require("../lib/rules/deps-break-line");


var code = file => {
    var filePath = path.join(__dirname, 'fixtures', `${file}.js`);
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
};

var testCase = (file, errors = []) => {
    console.log(code(file + '.output'))
    return {
        code: code(file),
        errors: errors.map(function (messageId) { return { messageId } }),
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        output: code(file + '.output'),
    };
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("deps-break-line", rule, {

    valid: [
        testCase('valid'),
    ],

    invalid: [
        testCase('invalid0',['hookArgumentsBreakLine','hookArgumentsBreakLine']),
        testCase('invalid1',['hookArgumentsBreakLine','hookArgumentsBreakLine']),
        testCase('invalid2',['hookArgumentsBreakLine','hookArgumentsBreakLine']),
    ],
});
