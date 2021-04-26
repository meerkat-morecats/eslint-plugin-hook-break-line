/**
 * @fileoverview react hook arguments  break line
 * @author kangkai
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
var HOOK_NAME_REG = /^use/ig;

var addBlockFix = function (indexes) {
    return function (fixer) {
        return indexes.map(index => fixer.insertTextAfterRange([index, index], '\n'))
    }
}

var ruleCallback = function (context) {
    return function (node) {
        HOOK_NAME_REG.lastIndex = 0;
        var _arguments = node.arguments;
        // collect error prev node 
        const errorIndexes = [];
        if (HOOK_NAME_REG.test(node.callee.name) && _arguments.length > 1 && _arguments[_arguments.length - 1].type === 'ArrayExpression') {
            var nodeList = [node].concat(_arguments).concat(node)
            const length = nodeList.length - 1;
            for (var i = 0; i < length; i++) {
                var currentNode = nodeList[i];
                var nextNode = nodeList[i + 1];
                if (currentNode.loc.start.line === nextNode.loc.end.line) {
                    // because the last node is the callee function , use previous node`s end index
                    if (i === length - 1){
                        errorIndexes.push(currentNode.range[1]);
                        continue;
                    }
                    errorIndexes.push(nextNode.range[0]);
                }
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
        const ruleMethod = ruleCallback(context)
        return {
            // give me methods
            "ExpressionStatement CallExpression": ruleMethod,
            "VariableDeclaration VariableDeclarator CallExpression": ruleMethod,
        };
    },

};
