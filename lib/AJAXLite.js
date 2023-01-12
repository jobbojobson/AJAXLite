/*
	Andrew Jobson - January 2023
	
	Based on code written in 2019
*/
export class AJAXLite {
	
	#templateCallback = function(xhr, cb){
		var data;
		var responseHeader = xhr.currentTarget.getResponseHeader('Content-Type');
		
		switch(responseHeader){
			case 'application/json':
				data = JSON.parse(xhr.currentTarget.responseText);
				break;
			//TODO: more response headers
			
			default:
				data = xhr.currentTarget.reponseTarget;
		}
		
		cb(data, xhr);
	}
	
	/*
	*  takes an object (or array?) and returns it like '?key=value&key=value'
	*/
	#buildQueryString( data ){
		if(!data) return null;
		
		var qs = [];
		for(var key in data){
			qs.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]));
		}
		
		return (qs.length ? '?' + qs.join('&') : null);
	}
	
	/*
	
	*/
	#jsonEncode( data ){
		if(!data) return null;
		return JSON.stringify( data );
	}
	
	/* 
		Core of this library, public to allow more specific requests, but usually get() and post() should be used
	*/
	send( opt ){
		var x = new XMLHttpRequest();
		var data;
		var url;
		var method;
		var contentType;
		
		if(!opt.url) throw 'AJAXLite: URL not defined';
		
		if(!opt.contentType || (typeof opt.contentType === 'boolean' && opt.contentType == true)){
			contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
			data = this.buildQueryString( opt.data );
		} else {
			if(typeof opt.contentType === 'string'){
				contentType = opt.contentType;
				
				if(contentType.includes('application/json')){
					data = this.#jsonEncode( opt.data );
				} else {
					data = this.#buildQueryString( opt.data );
				}
			}
		}
		
		//default method is GET
		method = opt.method || 'GET';
		
		if(method == 'GET' || method == 'DELETE'){
			url = opt.url + (data ? data : '');
		} else {
			url = opt.url;
		}
		
		if( opt.success && typeof opt.success === 'function' )
			x.addEventListener('load', opt.success);
		if( opt.error && typeof opt.error === 'function' )
			x.addEventListener('error', opt.error);
		//TODO: more event listeners
		
		
		//GET, or DELETE: data is null, url holds the answers..
		//POST or PUT: data is formatted based on contentType and sent as paramater to send()
		x.open(method, url, true);
		x.setRequestHeader('Content-Type', contentType);
		x.send(data);
	}
	
	
	get(url, data, callback, contentType){
		this.send({
			url:url,
			success:function(xhr){
				if(typeof data === 'function'){
					this.#templateCallback(xhr, data);
				}else if(typeof callback === 'function'){
					this.#templateCallback(xhr, callback);
				}
			},
			data:data || null,
			method:'GET',
			contentType:contentType
		});
	}
	
	
	post(url, data, callback, contentType){
		this.send({
			url:url,
			success:function(xhr){
				if(typeof data === 'function'){
					this.#templateCallback(xhr, data);
				} else if (typeof callback === 'function'){
					this.#templateCallback(xhr, callback);
				}
			},
			data:data || null,
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

