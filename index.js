/**
 * The jQuery pseudo-selectors and their replacement
 */
var selectors = {
	':first': '.first()'
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
 * Add some custom selectors on the fly from a file containing json
 * @param {String} the filepath
 * @param {Boolean} if true, overwrite existing entries
 */
var addFromFile = function(fileName, force) {
	fs.existsSync(fileName, function(exists) {
	  if (exists) {
	    fs.statSync(fileName, function(error, stats) {
	    	if (error) {
	    		throw (error);
	    	}
	      fs.openSync(fileName, "r", function(error, fd) {
		    	if (error) {
		    		throw (error);
		    	}
	        var buffer = new Buffer(stats.size);
	 
	        fs.readSync(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
	          var data = buffer.toString('utf8', 0, buffer.length);
	          data = JSON.parse(data);
	          add(data, force);
	          fs.close(fd);
	        });
	      });
	    });
	  } else {
	  	throw new Error('[jQ2Cheerio] Unable to find ' + fileName);
	  }
	});
}

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
		oSelector = oSelector.replace(selector + ' ', "')" + selectors[selector] + ".find('");
	}
	oSelector = cheerioVarName + "('" + oSelector + "')";
	// delete the empty find
	oSelector = oSelector.replace(".find('')", '');
	return oSelector;
};

var exec = function($,selector) {
	return eval(translate(selector));
}

module.exports.selectors = selectors;
module.exports.add = add;
module.exports.add = addFromFile;
module.exports.translate = translate;
module.exports.exec = exec;