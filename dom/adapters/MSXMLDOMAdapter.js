/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oMSXMLDOMAdapter	= new cMSDOMAdapter;

//
oMSXMLDOMAdapter.getProperty	= function(oNode, sName) {
	if (sName == "localName")
		return oNode.nodeType == 7 ? null : oNode.baseName;
	if (sName == "textContent")
		return oNode.text;
	return oNode[sName];
};

// Document object members
oMSXMLDOMAdapter.getElementById	= function(oDocument, sId) {
	return oDocument.nodeFromID(sId);
};

/*oMSXMLDOMAdapter.getElementById	= function(oNode, sId) {
	return oNode.selectSingleNode('/' + '/' + '*[@id="' + sId + '"]');
};*/
