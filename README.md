jq2cheerio
==========

A jQuery specific selectors to Cheerio for nodeJs

Cherrio is great but not fully compatible with jQuery (pseudo) selectors, this module aim to make jQuery selectors to work with Cheerio.

## Installation

As usual 

```
npm install jq2cheerio
```

## Usage

### The easy way

This snippet show your how to directly execute some jQuery selector and get the resulting Cheerio object

```
var cheerio = require('cheerio');
var jQ = require('jq2cheerio');

var someHtml = [
	'<p class="rick">Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub></p>',
	'<p class="rick">Never gonna run around and desert <em>you</em></p>',
	'<p class="rick">Never gonna make you cry, never gonna say <strong>goodbye</strong></p>',
	'<p class="rick">Never gonna tell a <strong>lie</strong> and hurt <em>you</em></p>'
].join();

var $ = cheerio.load(someHtml); 		// load the HTML
var $elements = jq.exec($, 'p:first');	// execute the jQuery selector, $elements is the resulting Cheerio object
$elements.each(function(){
	// some code here
});
```

### The less easy way

You may want to control things or add something to the Cheerio command

```
var cheerio = require('cheerio');
var jQ = require('jq2cheerio');

var someHtml = [
	'<p class="rick">Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub></p>',
	'<p class="rick">Never gonna run around and desert <em>you</em></p>',
	'<p class="rick">Never gonna make you cry, never gonna say <strong>goodbye</strong></p>',
	'<p class="rick">Never gonna tell a <strong>lie</strong> and hurt <em>you</em></p>'
].join();

var $ = cheerio.load(someHtml);				// Load the HTML
var selector = jQ.translate('p:first');		// translate the jQuery selector to a Cheerio "command"
											// selector == "$('p').first()"
var getClass = selector + ".attr('class')";	// add something
var pClass = eval(getClass);				// pClass == 'rick'
var pHtml = eval (selector + ".html()");	// pHtml == 'Never gonna give you <sup>up</sup>, never gonna let you <sub>down</sub>'
```

## Methods

### .translate(selector, cheerioVarName)

Will translate the jQuery selector `selector` to a Cheerio "command" using `cheerioVarName` as the… well the Cheerio variable name (default `$`)

```
var jQ = require('jq2cheerio');
console.log( jQ.translate('p:first') ); // => $('p').first();
console.log( jQ.translate('p:first', 'cheer') ); // => cheer('p').first();

```

### .exec($, selector)

Will use the jQuery selector `selector`, translate it then pass it to the Cheerio instance `$` and return a Cheerio object.

Look above, the "Easy way", for an example.

### .add(object, force)

Add some selectors to the translation table

`object` is an object like 

```
{
	':first': function(oSelector) {
		// do things with oSelector
		return string // string is like "p').first().find('"
	}
}
```

and `force` is a boolean saying if you want to overwrite existing selectors or not.
Have a look at the source code.

## Currently supported selectors

- [:first](http://api.jquery.com/first-selector/)
- [:last](http://api.jquery.com/last-selector/)
- [:eq()](http://api.jquery.com/eq-selector/)
- [:even](http://api.jquery.com/even-selector/)
- [:odd](http://api.jquery.com/odd-selector/)