/**  
 * @author 张玺
 * @class
 * @classdesc 用于客户端内网页和客户端的通信,参数不需要URL编码.
 * @example
 * var bridge = new Bridge();
 * bridge.Back() //返回上一页面
 * bridge.ShowWeb("http://m.chinaso.com","手机国搜") //在新视图中打开页面
*/
function Bridge()
{
	var theScheme = "chinaso.app"
	var isAndroid = navigator.userAgent.match(/android/gi);
	var isIos = navigator.userAgent.match(/iphone|ipod/gi);

	function post(param)
	{	
		if(isIos)
		{
			var query = ""
			for(key in param)
			{
				query += encodeURIComponent(key)+"="+encodeURIComponent(param[key])+"&"
			}
			query = query.slice(0,query.length-1)
			query = query.replace(/'/g,"\\'");
			var url = "window.location.href = '"+theScheme+"://?"+query+"'"
			setTimeout(url, 10);
		}
		if(isAndroid)
		{
			var paramArray = {}
			for(key in param)
			{
				paramArray[key] = param[key];
			}
			try {
				window.ActionBridge.post(JSON.stringify(paramArray)) 
			} catch (error){

			}
		}
		console.log(document.location.host);
		if(document.location.host == "")
		{
			debugPost(param);
		}
	}

	this.post=post;
}





