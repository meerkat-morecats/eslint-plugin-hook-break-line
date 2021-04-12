/**
 * @fileoverview react hook arguments  break line
 * @author kangkai
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
var HOOK_NAME_REG = /^use/ig;

var ruleCallback = function (context) {
    return function (node) {
        HOOK_NAME_REG.lastIndex = 0;
        var _arguments = node.arguments;
        if (HOOK_NAME_REG.test(node.callee.name) && _arguments.length > 1 && _arguments[_arguments.length - 1].type === 'ArrayExpression') {
            var nodeList = [node].concat(..._arguments).concat(node)
            for (var i = 0; i < nodeList.length - 1; i++) {
                var currentNode = nodeList[i];
                var nextNode = nodeList[i + 1];
                if (currentNode.loc.start.line === nextNode.loc.end.line) {
                    context.report({
                        node,
                        messageId: 'hookArgumentsBreakLine',
                        data: {
                            name: node.callee.name,
                        },
                    });
                    break;
                }
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
        fixable: null,  // or "code" or "whitespace"
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
            "VariableDeclaration VariableDeclarator CallExpression": ruleMethod
        };
    }
};
