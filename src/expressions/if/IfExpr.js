/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cIfExpr(oCondExpr, oThenExpr, oElseExpr) {
	this.condExpr	= oCondExpr;
	this.thenExpr		= oThenExpr;
	this.elseExpr		= oElseExpr;
};

cIfExpr.prototype.condExpr	= null;
cIfExpr.prototype.thenExpr	= null;
cIfExpr.prototype.elseExpr	= null;

// Static members
cIfExpr.parse	= function (oLexer, oStaticContext) {
	var oCondExpr,
		oThenExpr,
		oElseExpr;
	if (oLexer.peek() == "if" && oLexer.peek(1) == "(") {
		oLexer.next(2);
		//
		if (oLexer.eof() ||!(oCondExpr = cExpr.parse(oLexer, oStaticContext)))
			throw "IfExpr.parse: expected Expr expression";
		//
		if (oLexer.peek() == ")") {
			oLexer.next();
			if (oLexer.peek() == "then") {
				oLexer.next();
				if (oLexer.eof() ||!(oThenExpr = cExprSingle.parse(oLexer, oStaticContext)))
					throw "IfExpr.parse: expected 'then' statement operand";

				if (oLexer.peek() == "else") {
					oLexer.next();
					if (oLexer.eof() ||!(oElseExpr = cExprSingle.parse(oLexer, oStaticContext)))
						throw "IfExpr.parse: expected 'else' statement operand";
					//
					return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
				}
				else {
					throw "IfExpr.parse: Expected 'else' token";
				}
			}
			else {
				throw "IfExpr.parse: Expected 'then' token";
			}
		}
		else {
			throw "IfExpr.parse: Expected ')' token";
		}
	}
};

// Public members
cIfExpr.prototype.evaluate	= function (oContext) {
	return this[this.condExpr.evaluate(oContext).toBoolean(oContext) ? "thenExpr" : "elseExpr"].evaluate(oContext);
};