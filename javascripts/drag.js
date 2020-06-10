
function initDrag()
{

  Dropzone.options.drag = {
  	 	init: function() {
  	 		this.on("success", function(file) { 
  	 			var obj = JSON.parse(file.xhr.responseText);
  	 			//console.log(obj.path);
          localStorage.setItem("dbPath",obj.path);
  	 			window.location.href = "http://zhangxi.me/sqlite/manage" //?path="+obj.path
  	 			//alert("Added file."); 
  	 		});
  		},
  		paramName: "file", // The name that will be used to transfer the file
  		maxFilesize: 5, // MB
  		maxFiles:1,
      dictDefaultMessage:"drag & drop *.sqlite3 file here",
  		accept: function(file, done) {
  			console.log(file);

  			var index = file.name.indexOf(".sqlite3");
  			if(index > 0)
  			{
  				done();
  			}else
  			{
  				done("Only *.sqlite3 can be allowed.");
  			}
	  }
	};



	console.log("initDrag finish");
}

function startLoading()
{
  $("#data").html("查询中..."); 
}

function displayTables(data,div)  
{
	var htmlStr ="<ul>";

	for(var i=0 ; i < data.length; i++)  
    {
      var sql1 = "select * from "+data[i].name + ";";
      var item1 = '<a href="#" onclick=\'runAndFill(dbPath,"'+sql1+'");\'><li>'+sql1+'</li></a>';
      //var item1 = "<li>"+sql1+"</li>";

    	htmlStr += "<li>"+data[i].name+
      "<ul>"+
      item1+
      "</ul>"+
      "</li>";
    }

    htmlStr += "</ul>"

    $(div).html(htmlStr); 
}  
function parseJsonAndDisplay(data,div)  
{
	var firstRow = data[0];
	var names    = new Array()
	for(var name in firstRow)
	{
		names.push(name);
		//console.log(name);
	}

	var htmlStr ="<table class=\"gridtable\"><tr>";
	for(var i=0 ; i < names.length;i++) 
	{
		htmlStr += "<th>"+names[i]+"</th>"
	}

	htmlStr += "</tr>"

	for(var i=0 ; i < data.length; i++)  
    {
    	htmlStr += "<tr>"
    	var item = data[i];

    	for(var j=0 ; j < names.length;j++)  
    	{
    		htmlStr += "<td>"+item[names[j]]+"</td>"
    	}
    	htmlStr += "</tr>"
    }

    htmlStr += "</table>"
    //console.log(htmlStr);
    $(div).html(htmlStr); 
}  
  


function runSQL(path,query)
{
  var h = JSON.parse(localStorage.getItem("query_history"));
  if(h == null)
  {
    h = new Array();
  }
  h.push(query);
  localStorage.setItem("query_history",JSON.stringify(h));



  startLoading();
  $.ajax({
    method: "POST",
    url: "http://zhangxi.me/sql/runsql",
    data: { path: path, query: query}
  })
  .done(function( result ) {
    console.log(result);
    if(result.data != null)
    {
      parseJsonAndDisplay(result.data,"#data");
    }
  });
}
function fillInput(query)
{
  $("#query").val(query);
}
function runAndFill(path,query)
{
    fillInput(query);
    runSQL(path,query); 
}




function showTables(path)
{
  $("#tables").html("表结构查询中..."); 
    $.ajax({
    	method: "POST",
    	url: "http://zhangxi.me/sql/runsql",
    	data: { path: path, query: "SELECT * FROM sqlite_master WHERE type='table';" }
    })
    .done(function( result ) {
    	console.log(result.data);
    	displayTables(result.data,"#tables");
    });
}

function showAllTables(path)
{
    var sql = "SELECT * FROM sqlite_master WHERE type='table';";
    runAndFill(path,sql);
}


function showHistory()
{
    var data = JSON.parse(localStorage.getItem("query_history"));
    if(data == null)
    {
      return;
    }
    /*
    JSON.stringify(names);

var storedNames=JSON.parse(localStorage['names']);
    */
    var htmlStr ="<ul>";

    for(var i=0 ; i < data.length; i++)  
    {
      var sql1 = data[i];
      var item1 = '<a href="#" onclick=\'runAndFill(dbPath,"'+sql1+'");\'><li>'+sql1+'</li></a>';

      htmlStr += item1;
    }

    htmlStr += "</ul>"

    $("#history").html(htmlStr); 
}