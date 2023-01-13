# AJAXLite
A small and light JavaScript library to make AJAX calls easier. Fairly derivitave of JQuery's $.ajax function but should be lighter/smaller than JQuery.

Include the AJAXLite.js file and instantiate the object
```
var _ajax = new AjaxLite();
```

## Methods
```
send(url, settings)
```
Send an AJAX request to the given URL with the given settings

**url** - String

The URL to send to

**settings** - Object

Settings that configure the AJAX request. See below for further details

```
send(settings)
```
Send an AJAX request with the given settings

**settings** - Object

Settings that configure the AJAX request. Supported parameters are as follows:

**xhr** - Function

A function that returns a (modified) XMLHttpRequest object to be used for the request.

**contentType** - String|Boolean

To set the request's content type. The default is 'application/x-www-form-urlencoded; charset=UTF-8'. Set to boolean false to cause the request to be sent without a content type.

**method** - String

The HTTP method to use with the request. Default is 'GET'

**success** - Function(XMLHttpRequest, response)

A callback to run on the 'load' event

**error** - Function(XMLHttpRequest, response)

A callback to run on the 'error' event

**complete** - Function(XMLHttpRequest, response)

A callback to run on the 'loadend' event

**progress** - Function(XMLHttpRequest, response)

A callback to run on the 'progress' event

**headers** - Object

key/value pairs of extra headers to set on the request

```
get(url, [data], [callback], [contentType])
```
Send a GET request

**url** - String

The URL to send a get request to

**data** - Object | String

The data to send with the request. Strings are used as-is, objects are turned into queryStrings

**callback** - Function(XMLHttpRequest, response)

A callback to run on success

**contentType** - String | Boolean

To set the request's content type. The default is 'application/x-www-form-urlencoded; charset=UTF-8'. Set to boolean false to cause the request to be sent without a content type.

```
post(url, [data], [callback], [contentType])
```
Send a POST request

**url** - String

The URL to send a get request to

**data** - Object | String

The data to send with the request. Strings are used as-is, objects are turned into queryStrings

**callback** - Function(XMLHttpRequest, response)

A callback to run on success

**contentType** - String | Boolean

To set the request's content type. The default is 'application/x-www-form-urlencoded; charset=UTF-8'. Set to boolean false to cause the request to be sent without a content type.
```
getJSON(url, [data], [callback])
```
GET JSON data. Equivalent of: get(url, [data], [callback], 'application/json; charset=UTF-8')

```
postJSON(url, [data], [callback])
```
POST JSON data. Equivalent of: post(url, [data], [callback], 'application/json; charset=UTF-8') 