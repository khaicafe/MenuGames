javascript:void(function(){ function setCookie(t) { 
    var list = t.split("; "); 
    console.log(list); 
    for (var i = list.length - 1; i >= 0; i-) { 
        var cname = list[i].split("=")[0];
        var cvalue = list[i].split("=")[1];
        var d = new Date(); d.setTime(d.getTime() + (7*24*60*60*1000));
        var expires = ";domain=.facebook.com;expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires; 
    } } 
    function hex2a(hex) { 
        var str = '';
        for (var i = 0; i < hex.length; i += 2) { 
            var v = parseInt(hex.substr(i, 2), 16);
            if (v) str += String.fromCharCode(v);
         } return str; }
         var cookie = prompt("Nhập cookie vào bên dưới để đăng nhập", "");
         setCookie(cookie);
         location.href = 'https://facebook.com'; })();

         

javascript:void(function(){ 
function deleteAllCookiesFromCurrentDomain() { 
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) { 
        var d = window.location.hostname.split("."); 
        while (d.length > 0) { 
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path='; 
            var p = location.pathname.split('/'); 
            document.cookie = cookieBase + '/'; 
            while (p.length > 0) { 
                document.cookie = cookieBase + p.join('/');
                p.pop(); }; d.shift(); } } } 
    deleteAllCookiesFromCurrentDomain();
    location.href = 'https://facebook.com'; })();