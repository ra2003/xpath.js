/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDayTimeDuration(nDay, nHour, nMinute, nSecond, bNegative) {
	cXSDuration.call(this, 0, 0, nDay, nHour, nMinute, nSecond, bNegative);
};

cXSDayTimeDuration.RegExp	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

cXSDayTimeDuration.prototype	= new cXSDuration;

cXSDayTimeDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (fXSDuration_getDayTimeComponent(this) || 'T0S');
};

//
cFunctionCall.dataTypes["dayTimeDuration"]	= function(sValue) {
	var aMatch	= sValue.match(cXSDayTimeDuration.RegExp);
	if (aMatch)
		return new cXSDayTimeDuration(+aMatch[2] || 0,
										+aMatch[3] || 0,
										+aMatch[4] || 0,
										+aMatch[5] || 0,
										aMatch[1] == '-'
		);
	throw new cXPath2Error("FORG0001");
};

function fXSDayTimeDuration_normalize(oDuration) {
	if (oDuration.second >= 60) {
		oDuration.minute	+= ~~(oDuration.second / 60);
		oDuration.second	%= 60;
	}
	if (oDuration.minute >= 60) {
		oDuration.hour		+= ~~(oDuration.minute / 60);
		oDuration.minute	%= 60;
	}
	if (oDuration.hour >= 24) {
		oDuration.day		+= ~~(oDuration.hour / 60);
		oDuration.hour		%= 24;
	}
};