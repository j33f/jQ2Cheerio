var cheerio = require('cheerio');
var jQ = require('./index');

var someHtml = [
	'<p class="rick">Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub></p>',
	'<p class="rick">Never gonna run around and desert <em>you</em></p>',
	'<p class="rick">Never gonna make you cry, never gonna say <strong>goodbye</strong></p>',
	'<p class="rick">Never gonna tell a <strong>lie</strong> and hurt <em>you</em></p>'
].join();

var $ = cheerio.load(someHtml); 		// load the HTML
var $element = jQ.exec($, 'p:first');	// execute the jQuery selector, $elements is the resulting Cheerio object
var pClass = $element.attr('class');
console.log(pClass); 					// rick
var pHtml = $element.html();
console.log(pHtml);						// Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub>