/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2Context(oSequence, nPosition, oScope) {
	this.sequence	= oSequence || new cXPath2Sequence;
	this.position	= nPosition || 1;
	this.scope	= oScope || {};
	this.stack	= {};
};

cXPath2Context.prototype.sequence	= null;
cXPath2Context.prototype.position	= null;
cXPath2Context.prototype.scope		= null;
cXPath2Context.prototype.stack		= null;	// Variables stack

cXPath2Context.prototype.pushVariable	= function(sName, vValue) {
	if (!this.stack.hasOwnProperty(sName))
		this.stack[sName]	= [];
	this.stack[sName].push(this.scope[sName]);
	this.scope[sName] = vValue;
};

cXPath2Context.prototype.popVariable	= function(sName) {
	if (this.stack.hasOwnProperty(sName)) {
		this.scope[sName] = this.stack[sName].pop();
		if (typeof this.scope[sName] == "undefined")
			delete this.scope[sName];
		if (!this.stack[sName].length)
			delete this.stack[sName];
	}
};

cXPath2Context.clone	= function(oContext) {
	// Make clone of scope
	var oScope	= {};
	for (var sKey in oContext.scope)
		if (oContext.scope.hasOwnProperty(sKey))
			oScope[sKey]	= oContext.scope[sKey];
	return new cXPath2Context(oContext.node, oContext.position, oScope);
};