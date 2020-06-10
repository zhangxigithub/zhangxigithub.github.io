var store_key = "tip_history";
var emptyTip = "<ul>"+
               "<li>Mac & Safari only</li>"+
               "<li>使用系统通知,关闭Safari依然可以收到消息</li>"+
               "<li>需要允许接收网站通知</li>"+
               "</ul>";
window.setInterval("reloadHistory()",1000); 


function delayFocus()
{
  //$("#slider").css("display","block");
  var min = parseInt($("#delay").val());
  $("#delay").val(min);
}
function delayBlur()
{
  var min = parseInt($("#delay").val());
  if(isNaN(min))
  {
    min = 10;
  }
  $("#delay").val(min+"分钟后");
}

function dateAfter(min)
{
  var d=new Date();
  var t=d.getTime();
  t += min*60*1000;
  return new Date(t);
}
function timeLeft(date)
{
  var t1 = Date.parse(Date())/1000;
  var t2 = Date.parse(date)/1000;
  return ((t2-t1)/60);
}

function storeTip(token,msg,delay)
{

  var list = JSON.parse(localStorage.getItem(store_key))
  if(list == null)
  {
    list = new Array();
  }

  list.push({msg:msg,token:token,date:dateAfter(delay)});

  localStorage.setItem(store_key,JSON.stringify(list));
  reloadHistory();
}
function tips()
{
  return cleanList();
  //JSON.parse(localStorage.getItem(store_key));
}
function reloadHistory()
{
  var list = tips();
  if(list == null)
  {
    //$("#tips").html(emptyTip);
    return;
  }
  if(list.length == 0)
  {
    //$("#tips").html(emptyTip);
    return;
  }
  var html = "<ul>";

  for(var i=0;i<list.length;i++)
  {
    var min = parseInt(timeLeft(list[i].date));
    if(min >= 0)
    {
      html += "<li>"+min+"分钟后, "+list[i].msg+"</li>";
    }
  }
  html += "</ul>";

  $("#tips").html(html);
}
function cleanList()
{
  var list = JSON.parse(localStorage.getItem(store_key))
  var newList = new Array();
  if(list == null)
  {
    return
  }
  for(var i=0;i<list.length;i++)
  {
    var min = parseInt(timeLeft(list[i].date));
    if(min >= 0)
    {
      newList.push(list[i]);
    }
  }

  localStorage.setItem(store_key,JSON.stringify(newList));
  return newList;
}

function notification()
{
    reloadHistory();
    var min = parseInt($("#delay").val());
    var msg = $("#message").val();

    if(msg == '')
    {
      alert("提醒事项不能为空");
      return;
    }
    if(localStorage["push_token"] == null)
    {
      alert("你禁止了系统通知，这样收不到消息，需要去Safari -> 偏好设置 -> 通知 中打开.");
      return;
    }

    storeTip(localStorage["push_token"],msg,min)


    $("#submit_button").html("提交中");
    $('#submit_button').attr('disabled',"true");
    $('#submit_button').attr('class',"s_disable");



    $.ajax({
        method: "POST",
        url: "/timer/later",
        data: { delay: 0, msg:min+"分钟后提醒您:"+msg,token:localStorage["push_token"],title:"开始计时"}
    })
    .done(function( result ) {
      console.log(result);
    });


    $.ajax({
        method: "POST",
        url: "/timer/later",
        data: { delay: min*60*1000, msg:msg,token:localStorage["push_token"],title:"时间到"}
    })
    .done(function( result ) {
      console.log(result);
      console.log("need stop");

      $("#delay").val("10分钟后");
      $("#message").val("");
      $("#submit_button").html("提交");
      $('#submit_button').attr('class',"s");
      $('#submit_button').removeAttr("disabled"); 

    });
}

function initNotification()
{
    reloadHistory();
    console.log("token : "+localStorage["push_token"]);


    console.log("initNotification start");



    document.body.onload = function() {
    if ('safari' in window && 'pushNotification' in window.safari) {
        var permissionData = window.safari.pushNotification.permission('web.me.zhangxi.notification');
        checkRemotePermission(permissionData);
    }else
    {
      tip("你的浏览器或者电脑不支持该应用。必须使用Mac & Safari.");      
    }
};
 
var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
        // This is a new web service URL and its validity is unknown.

        console.log('default');

        window.safari.pushNotification.requestPermission(
            'https://zhangxi.me/timer/server', // The web service URL.
            'web.me.zhangxi.notification',     // The Website Push ID.
            {}, // Data that you choose to send to your server to help you identify the user.
            checkRemotePermission         // The callback function.
        );
    }
    else if (permissionData.permission === 'denied') {
      console.log('denied');
        // The user said no.
        tip("你禁止了系统通知，这样收不到消息，需要去Safari -> 偏好设置 -> 通知 中打开.");
    }
    else if (permissionData.permission === 'granted') {

      console.log('granted');
      var deviceToken = permissionData.deviceToken;
      localStorage["push_token"] = deviceToken;


        // The web service URL is a valid push provider, and the user said yes.
        // permissionData.deviceToken is now available to use.
    }
};


    console.log("initNotification end");
}
function tip(msg)
{
  $("#tips").html(msg);
}


function changeDelay(slider)
{
  console.log(slider.value);
  //$("#delayTag").html(slider.value);
  $("#delay").val(slider.value+"分钟后");
}

$("#tips").html(emptyTip);

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-77346238-1', 'auto');
  ga('send', 'pageview');



