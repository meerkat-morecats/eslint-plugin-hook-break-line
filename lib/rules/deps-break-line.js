/**
 * @fileoverview react hook arguments  break line
 * @author kangkai
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
var isHookName = s => {
    return /^use[A-Z0-9].*$/.test(s);
}

var addBlockFix = function (indexes) {
    return function (fixer) {
        return indexes.map(index => fixer.insertTextAfterRange([index, index], '\n'))
    }
}

var functionType = ['ArrowFunctionExpression','FunctionExpression']

var ruleCallback = function (context) {
    return function (node) {
        if (!isHookName(node.callee.name)) {
            return ;
        }
        var _arguments = node.arguments;
        if (_arguments.length !== 2) {
            // only deal with two arguments
            return;
        }
        if (_arguments[1].type !== 'ArrayExpression' || !functionType.includes(_arguments[0].type)) {
            return;
        }
        // collect error prev node 
        var errorIndexes = [];
        var nodeList = [node.callee].concat(_arguments).concat(node)
        var length = nodeList.length - 1;
        for (let i = 0; i < length; i++) {
            var currentNode = nodeList[i];
            var nextNode = nodeList[i + 1];
            if (currentNode.loc.end.line === nextNode.loc.start.line) {
                // because the last node is the callee function , use previous node`s end index
                if (i === length - 1){
                    errorIndexes.push(currentNode.range[1]);
                    continue;
                }
                errorIndexes.push(nextNode.range[0]);
            }
        }
        if (_arguments[1].loc.end.line === node.loc.end.line){
            errorIndexes.push(currentNode.range[1]);
        }
        // report together
        if (errorIndexes.length > 0) {
            context.report({
                loc: node.loc,
                node,
                messageId: 'hookArgumentsBreakLine',
                data: {
                    name: node.callee.name,
                },
                fix: addBlockFix(errorIndexes),
            });
        }
        return;
    }
}

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "except react hooks's arguments in different line",
            category: "Fill me in",
            recommended: false
        },
        fixable: "whitespace",  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ],
        messages: {
            hookArgumentsBreakLine: "hook {{name}} and its arguments should list in different lines"
        },
    },

    create: function (context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        var ruleMethod = ruleCallback(context)
        return {
            // give me methods
            "ExpressionStatement CallExpression": ruleMethod,
            "VariableDeclaration VariableDeclarator CallExpression": ruleMethod,
        };
    },

};
