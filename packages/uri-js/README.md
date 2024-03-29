# URI.js

URI.js is an [RFC 3986](http://www.ietf.org/rfc/rfc3986.txt) compliant, scheme extendable URI parsing/validating/resolving library for all JavaScript environments (browsers, Node.js, etc).
It is also compliant with the IRI ([RFC 3987](http://www.ietf.org/rfc/rfc3987.txt)) and IDNA ([RFC 5890](http://www.ietf.org/rfc/rfc5890.txt)) specifications.

URI.js weighs in at only 2.3kb (gzipped, 7kb deflated). Need IRI support? It's only an extra 1.3kb (3.6kb gzipped, 9.8kb deflated).

## API

### Parsing & Validating

	var components = URI.parse("uri://user:pass@example.com:123/one/two.three?q1=a1&q2=a2#body");
	//returns:
	//{
	//  scheme : "uri",
	//  userinfo : "user:pass",
	//  host : "example.com",
	//  port : 123,
	//  path : "/one/two.three",
	//  query : "q1=a1&q2=a2",
	//  fragment : "body"
	//}

### Serializing

	URI.serialize({scheme : "http", host : "example.com", fragment : "footer"}) === "http://example.com/#footer"

### Resolving

	URI.resolve("uri://a/b/c/d?q", "../../g") === "uri://a/g"

### Normalizing

	URI.normalize("HTTP://ABC.com:80/%7Esmith/home.html") === "http://abc.com/~smith/home.html"

### Comparison

	URI.equal("example://a/b/c/%7Bfoo%7D", "eXAMPLE://a/./b/../b/%63/%7bfoo%7d") === true

### IRI Support

	//convert IRI to URI
	URI.serialize(URI.parse("http://exampl�.org/ros�")) === "http://xn--exampl-gva.org/ros%C3%A9"
	//convert URI to IRI
	URI.serialize(URI.parse("http://xn--exampl-gva.org/ros%C3%A9"), {iri:true}) === "http://exampl�.org/ros�"

### Options

All of the above functions can accept an additional options argument that is an object that can contain one or more of the following properties:

*	`scheme` (string)
	
	Indicates the scheme that the URI should be treated as, overriding the URI's normal scheme parsing behavior.

*	`reference` (string)
	
	If set to `"suffix"`, it indicates that the URI is in the suffix format, and the validator will use the option's `scheme` property to determine the URI's scheme.
	
*	`tolerant` (boolean, false)
	
	If set to `true`, the parser will not report invalid URIs. It will also relax URI resolving rules.

*	`absolutePath` (boolean, false)
	
	If set to `true`, the serializer will not resolve a relative `path` component.

*	`iri` (boolean, false)

	If set to `true`, the serializer will unescape non-ASCII characters as per [RFC 3987](http://www.ietf.org/rfc/rfc3987.txt).
	
*	`unicodeSupport` (boolean, false)
	
	If set to `true`, the parser will unescape non-ASCII characters in the parsed output as per [RFC 3987](http://www.ietf.org/rfc/rfc3987.txt).

*	`domainHost` (boolean, false)
	
	If set to `true`, the library will treat the `host` component as a domain name, and convert IDNs (International Domain Names) as per [RFC 5891](http://www.ietf.org/rfc/rfc5891.txt).

## Scheme Extendable

URI.js supports inserting custom [scheme](http://en.wikipedia.org/wiki/URI_scheme) dependent processing rules. Currently, URI.js has built in support for the following schemes:

*	http \[[RFC 2616](http://www.ietf.org/rfc/rfc2616.txt)\]
*	https \[[RFC 2818](http://www.ietf.org/rfc/rfc2818.txt)\]
*	urn \[[RFC 2141](http://www.ietf.org/rfc/rfc2141.txt)\]
*	urn:uuid \[[RFC 4122](http://www.ietf.org/rfc/rfc4122.txt)\]
*	mailto \[[RFC 6068](http://www.ietf.org/rfc/rfc6068.txt)\]

Note: The minified version of URI.js only comes with http/https support compiled in.

### HTTP Support

	URI.equal("HTTP://ABC.COM:80", "http://abc.com/") === true

### Mailto Support

	URI.parse("mailto:alpha@example.com,bravo@example.com?subject=SUBSCRIBE&body=Sign%20me%20up!");
	//returns:
	//{
	//	scheme : "mailto", 
	//	to : ["alpha@example.com", "bravo@example.com"],
	//	subject : "SUBSCRIBE",
	//	body : "Sign me up!"
	//}

	URI.serialize({
		scheme : "mailto", 
		to : ["alpha@example.com"], 
		subject : "REMOVE", 
		body : "Please remove me",
		headers : {
			cc : "charlie@example.com"
		}
	}) === "mailto:alpha@example.com?cc=charlie@example.com&subject=REMOVE&body=Please%20remove%20me"

## Usage

To load in a browser, use the following tag:

	<script type="text/javascript" src="uri-js/dist/uri.min.js"></script>

If you need IRI support, use the following tag instead:

	<script type="text/javascript" src="uri-js/dist/uri-iri.min.js"></script>
	
To load in a CommonJS (Node.js/io.js) environment, first install with npm by running on the command line:

	npm install uri-js

Then, in your code, load it using:

	var URI = require("uri-js");

## Breaking changes from 1.x

The `errors` array on parsed components as now been changed to an `error` string.

## License

Copyright 2011 Gary Court. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1.	Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2.	Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY GARY COURT "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the authors and should not be interpreted as representing official policies, either expressed or implied, of Gary Court.