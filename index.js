/**
 * The jQuery pseudo-selectors and their replacement
 */
var selectors = {
	':first': function(oSelector) {
		return oSelector.replace(':first ', "').first().find('");
	}
	, ':last': function(oSelector) {
		return oSelector.replace(':last ', "').last().find('");
	}
	, ':eq()': function(oSelector) {
		return oSelector.replace(/:eq\(([^)]*)\)/, "').eq($1).find('");
	}
};

/**
 * Add some custom selectors on the fly from an object
 * @param {Object} the selectors to add
 * @param {Boolean} if true, overwrite existing entries
 */
var add = function(object, force) {
	if (!force) {
		var force = false;
	}
	for (var i in object) {
		if (!selectors[i] || force) {
			selectors[i] = object[i];
		}
	}
};

/**
 * Translate the jQuery selector to a Cheerio "string"
 * @param {String} the selector
 * @param {String} the Cheerio var name you want to use, defaults to '$'
 * @return {String} The Cheerio "string" like $('selector').first().find('other selector')
 */
var translate = function(oSelector, cheerioVarName) {
	if (!cheerioVarName) cheerioVarName = '$'
	oSelector += ' '; // add a trailing space, important !
	for (var selector in selectors) {
		oSelector = selectors[selector](oSelector);
	}
	oSelector = cheerioVarName + "('" + oSelector + "')";
	oSelector = oSelector.replace(/\.find\(' *'\)/, '');
	return oSelector;
};

var exec = function($,selector) {
	return eval(translate(selector));
}

module.exports.selectors = selectors;
module.exports.add = add;
module.exports.translate = translate;
module.exports.exec = exec;