var cheerio = require('cheerio');
var j2c = require('../index.js');

var fixture = '<html><head><title>The title</title><script src="script.js"></script><script src="script2.js"></script></head>'
			+ '<body><div class="content"><h1>The H1</h1><p>The first paragraph</p>'
			+ '<p>The <strong>second</strong> paragraph wich <strong>contain</strong> three <strong>strong</strong> tags.</p></div></body></html>';
var $ = cheerio.load(fixture);

var selectors = function(selector) {
	describe('#selector "' + selector + '"', function(){
		it('selector should be a string', function(){
			selector.should.be.type('string');
		});
		it('selector should have a Cheerio equivalent', function(){
			j2c.selectors[selector].should.be.type('string');
			var toEval = "$('html')" + j2c.selectors[selector] + ";";
			var res = eval(toEval);
			res.should.be.ok;
		});
	});
}

/*********************************************************************************/
// tests

describe('Selectors', function() {
	for (var selector in j2c.selectors) {
		selectors(selector);
	}
});