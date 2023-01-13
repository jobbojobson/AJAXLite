/*
	Andrew Jobson - January 2023
	
	Based on code written in 2019
*/
export class AJAXLite {
	
	/*
	*	deal with the Content type of the response and call the user's callback
	*/
	#templateCallback = function(xhr, cb){
		
		var data;
		var responseHeader = xhr.getResponseHeader('Content-Type');
		
		switch(responseHeader){
			case 'application/json':
			case 'application/json; charset=UTF-8':
				data = JSON.parse(xhr.responseText);
				break;
			//TODO: more response headers
			
			default:
				data = xhr.responseText;
		}
		
		cb(data, xhr);
	}
	
	/*
	*  takes an object (or array?) and returns it like '?key=value&key=value'
	*/
	#buildQueryString = function( data ){
		if(!data) return null;
		
		var qs = [];
		for(var key in data){
			qs.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));
		}
		
		return (qs.length ? '?' + qs.join('&') : null);
	}
	
	/*
	*	
	*/
	#jsonEncode = function( data ){
		if(!data) return null;
		return JSON.stringify( data );
	}
	
	/* 
		Core of this library, public to allow more specific requests, but usually get() and post() should be used
	*/
	send( url, opt ){
		
		if(!url) throw 'AJAXLite: URL not defined';
		
		if( typeof url === 'object' ){
			opt = url;
			url = opt.url;
		}
		
		var x;
		
		if( opt.xhr && (typeof opt.xhr === 'function') ){
			x = opt.xhr();
		} else {
			x = new XMLHttpRequest();
		}
		
		//default content type
		if( typeof opt.contentType === 'undefined' ){
			opt.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		}
		
		var method;
		var data;
		
		//default method is GET
		method = opt.method || 'GET';
		
		if(method == 'GET' || method == 'DELETE'){
			if( typeof data === 'string' ){
				url = opt.url + '?' + data;
			} else {
				data = this.#buildQueryString( opt.data );
				url += (data ? data : '');
			}
		} else {
			url = opt.url;
		}
		
		if( opt.success && typeof opt.success === 'function' )
			x.addEventListener('load', (e) => { this.#templateCallback(e.target, opt.success); });
		if( opt.error && typeof opt.error === 'function' )
			x.addEventListener('error', (e) => { this.#templateCallback(e.target, opt.error); });
		if( opt.complete && typeof opt.complete === 'function' )
			x.addEventListener('loadend', (e) => { this.#templateCallback(e.target, opt.complete); });
		if( opt.progress && typeof opt.progress === 'function' )
			x.addEventListener('progress', (e) => { this.#templateCallback(e.target, opt.progress); });
		//TODO: more event listeners
		
		
		//GET, or DELETE: data is null, url holds the answers..
		//POST or PUT: data is formatted based on contentType and sent as paramater to send()
		x.open(method, url, true);
		
		
		// set the content type to false to not send a Content-Type in the header
		if( typeof opt.contentType === 'string' ){
			x.setRequestHeader('Content-Type', opt.contentType);
		} 
		
		if( opt.headers && (typeof opt.headers === 'object') ){
			for(const h in opt.headers){
				x.setRequestHeader( h, opt.headers[h] );
			}
		}
		x.send(data);
	}
	
	/*
	*	Perform a GET with the given data, callback and contentType
	*/
	get(url, data, callback, contentType){
		
		if(typeof data === 'function'){ //data isn't defined and is actually a function
			callback = data;
			data = undefined;
		}
		
		if(typeof callback === 'string'){ //callback param must be a content type
			contentType = callback;
			callback = undefined;
		}
		
		this.send(url, {
			success:callback,
			data:data,
			method:'GET',
			contentType:contentType
		});
	}
	
	/*
	*	Perform a POST with the given data, callback and contentType
	*/
	post(url, data, callback, contentType){
		
		if(typeof data === 'function'){ //data isn't defined and is actually a function
			callback = data;
			data = undefined;
		}
		
		if(typeof callback === 'string'){ //callback param must be a content type
			contentType = callback;
			callback = undefined;
		}
		
		this.send(url, {
			success:callback,
			data:data,
			method:'POST',
			contentType:contentType
		});
	}
	
	
	getJSON(url, data, callback){
		this.get(url, data, callback, 'application/json; charset=UTF-8');
	}
	
	postJSON(url, data, callback){
		this.post(url, data, callback, 'application/json; charset=UTF-8');
	}
}

