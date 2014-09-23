var cheerio = require('cheerio');
var jQ = require('./index');

var someHtml = [
	'<p class="rick">Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub></p>',
	'<p class="rick">Never gonna run around and desert <em>you</em></p>',
	'<p class="rick">Never gonna make you cry, never gonna say <strong>goodbye</strong></p>',
	'<p class="rick">Never gonna tell a <strong>lie</strong> and hurt <em>you</em></p>'
].join();

var $ = cheerio.load(someHtml);				// Load the HTML
var selector = jQ.translate('p:first');		// translate the jQuery selector to a Cheerio "command"
											// selector == "$('p').first()"
console.log(selector);
var getClass = selector + ".attr('class')";	// add something
var pClass = eval(getClass);				// pClass == 'rick'
console.log(pClass);
var pHtml = eval (selector + ".html()")		// pHtml == 'Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub>'
console.log(pHtml);

///
console.log (':eq() : ');
var selector = jQ.translate('p:eq(1)');
console.log(selector);
var res = jQ.exec($, 'p:eq(1)');
console.log(res.html());

console.log (':even : ');
var selector = jQ.translate('p:even');
console.log(selector);
var res = jQ.exec($, 'p:even');
console.log(res.html());

console.log (':odd : ');
var selector = jQ.translate('p:odd');
console.log(selector);
var res = jQ.exec($, 'p:odd');
console.log(res.html());