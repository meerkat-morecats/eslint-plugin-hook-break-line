/**
 * @fileoverview react hook arguments  break line
 * @author kangkai
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        var HOOK_NAME_REG = /^use/ig;

        return {

            // give me methods
            "ExpressionStatement CallExpression":(node)=>{
                const _arguments= node.arguments;
                if (HOOK_NAME_REG.test(node.callee.name)&&_arguments.length>1 && _arguments[_arguments.length-1].type === 'ArrayExpression'){
                    const nodeList = [node,..._arguments,node]
                    for (let i = 0 ; i < nodeList.length-1 ; i++ ) {
                        const currentNode = nodeList[i];
                        const nextNode = nodeList[i+1];
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
        };
    }
};
