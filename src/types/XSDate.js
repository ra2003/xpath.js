function cXSDate(nYear, nMonth, nDay, nTimezone) {
	this.year		= nYear;
	this.month		= nMonth;
	this.day		= nDay;
	this.timezone	= nTimezone;
};

cXSDate.RegExp	= /^-?([1-9]\d\d\d+|0\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(Z|[+\-](0\d|1[0-4]):[0-5]\d)?$/;

cXSDate.prototype	= new cXSAnyAtomicType;

cXSDate.prototype.year		= null;
cXSDate.prototype.month		= null;
cXSDate.prototype.day		= null;
cXSDate.prototype.timezone	= null;

cXSDate.prototype.toString	= function() {
	return fXSDateTime_getDateComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSDate.parse	= function(sValue) {
	if (sValue.match(cXSDate.RegExp))
		return new cXSDate;
	throw new cXPath2Error("FORG0001");
};