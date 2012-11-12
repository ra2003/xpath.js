/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	14 Functions and Operators on Nodes
		op:is-same-node
		op:node-before
		op:node-after
*/

// 14 Operators on Nodes
// op:is-same-node($parameter1 as node(), $parameter2 as node()) as xs:boolean
cFunctionCall.operators["is-same-node"]	= function(oLeft, oRight) {
	return this.staticContext.DOMAdapter.isSameNode(oLeft, oRight);
};

// op:node-before($parameter1 as node(), $parameter2 as node()) as xs:boolean
cFunctionCall.operators["node-before"]	= function(oLeft, oRight) {
	return !!(this.staticContext.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 4);
};

// op:node-after($parameter1 as node(), $parameter2 as node()) as xs:boolean
cFunctionCall.operators["node-after"]	= function(oLeft, oRight) {
	return !!(this.staticContext.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 2);
};