////////////////////////////////////////////////////////////////////////////////////////////


async function connection (socket, timeout = 10000) {
    const isOpened = () => (socket.readyState === WebSocket.OPEN)
  
    if (socket.readyState !== WebSocket.CONNECTING) {
      return isOpened()
    }
    else {
      const intrasleep = 100
      const ttl = timeout / intrasleep // time to loop
      let loop = 0
      while (socket.readyState === WebSocket.CONNECTING && loop < ttl) {
        await new Promise(resolve => setTimeout(resolve, intrasleep))
        loop++
      }
      return isOpened()
    }
  }
  
  
  // var client_ida = Date.now()
  // const wss = new WebSocket(`ws://localhost:8000/ws/${client_ida}`);
  // const opened = await connection(wss)
  // ws.onmessage = function(e) {
  //     // Receives a message.
  //     alert(e.data);
  //   };
  // console.log(opened)
  // if (opened) {
  //   websocket.send('hello')
  // }
  // else {
  //   console.log("the socket is closed OR couldn't have the socket in time, program crashed");
  // }
  // // sleep time expects milliseconds
  // function sleepFor(sleepDuration){
  //     var now = new Date().getTime();
  //     while(new Date().getTime() < now + sleepDuration){ 
  //         /* Do nothing */ 
  //         console.log("haiz, JavaScript sleep!");
  //     }
  // }
  
  // function sleepThenAct(){
  //     sleepFor(2000);
  //     console.log("Hello, JavaScript sleep!");
  // }
  
  
  
  
  var ipserver = location.host;
  var token = window.localStorage.getItem('tokenmenu-kl');
  var avata = window.localStorage.getItem('avata-user');
  var username= window.localStorage.getItem('username');
  const photo = document.getElementsByClassName("nav__img");// show photousername
  const show__user = document.getElementById("login");// show name user
  const link__down = document.getElementById("func");
  if (avata !== '' && avata !== null)
    photo[0].src=avata;
  if (username !== '' && username !== null){
    show__user.innerHTML =username;
    link__down.href='#'
    link__down.onclick = null;
  }
//   link__down[0].href='#'
//   link__down[0].writeAttribute('onclick','');
    // link__down.onclick = null;
  console.log(show__user[0]);
  document.cookie = 'cookie='+ token +' ;expires=Fri, 31 Dec 9999 12:00:00 UTC; path=/';
  var login = false;
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        "Authorization":'Bearer '+ token // Here you can add your token,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
      
    })
    .catch((error) => {
      alert(error)
      console.log(error)
  });
    if (response.status === 403) alert("Token hết hạn");
    if (response.ok) {
      return response.json(); // parses JSON response into native JavaScript objects
    }
    // return response.json(); // parses JSON response into native JavaScript objects
    
  }
  
  async function GetData(url = '', data = {}) {
      // console.log('token: '+token)
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          "Authorization":'Bearer ' + token // Here you can add your token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
        
      })
      .catch((error) => {
        alert(error)
        console.log(error)
    });
      // if (response.status === 403) alert("Vui lòng đăng nhập lại");
      if (response.ok) {
        return response.json(); // parses JSON response into native JavaScript objects
      } else {
          // Dang nhap lai
        //   window.location.href="/";
      }
      
    }
  
  window.fbAsyncInit = function() {
      // FB JavaScript SDK configuration and setup
      FB.init({
        appId      : '2976178016014497', // FB App ID
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v14.0' // use graph api version 2.8
      });
      FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                  // logged in
                  login = true;
                  console.log('FB logged in');  
              } else {
                  login = false;
                  console.log('Begin login FB')
              }
          });
  
  };
  
  // Facebook login with JavaScript SDK
  function fbLogin() {
      deleteAllCookies();
      FB.login(function (response) {
          getFbUserData();
  }, {scope: 'email'});



    //   if (login===true) {
    //     if (typeof token !== 'undefined' && token!==null){
    //         // Any scope
    //         GetData('/show_user')
    //             .then(data => {
    //                 // console.log(data); // JSON data parsed by `data.json()` call
    //                 if(data['username'] === 'Could not validate credentials'){
    //                     // Get and display the user profile data
    //                     getFbUserData();
    //                 } else{
    //                     console.log('ready FB')
    //                     window.location.href="/Dashboard";
    //                 }
    //             });
    //     } else {
    //         // Get and display the user profile data
    //         getFbUserData();
    //     }
    //   } else{
    //       FB.login(function (response) {
    //           if (response.authResponse) {
    //               if (typeof token !== 'undefined' && token!==null){
    //                   // Any scope
    //                   GetData('/show_user')
    //                       .then(data => {
    //                           // console.log(data); // JSON data parsed by `data.json()` call
    //                           if(data['username'] === 'Could not validate credentials'){
    //                               // Get and display the user profile data
    //                               getFbUserData();
    //                           } else{
    //                               console.log('ready FB')
    //                               // window.location.href="/Dashboard";
    //                           }
    //                       });
    //               } else {
    //                   // Get and display the user profile data
    //                   getFbUserData();
    //               }
  
    //           } else {
    //               alert('User cancelled login or did not fully authorize.');
    //           }
              
      
    //   }, {scope: 'email'});
    // }
}
  
  // Fetch the user profile data from facebook
  function getFbUserData(){
      FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,name,birthday,age_range,email,link,gender,locale,picture'},
      function (response) {
          console.log('login fb');        
          avata = response.picture.data.url;
          let ID = response.id;
          let FullName= response.name;
          let Birthday= response.birthday;
          let Email= response.email;
          let FBProfile= response.link;
          if (typeof FBProfile === 'undefined') // Any scope
              FBProfile = ''
          // console.log({username: FullName, password: ID, Photo: img, Birthday: Birthday, Email: Email, FBProfile: FBProfile})
          postData('/login', {username: FullName, password: ID, Photo: avata, Birthday: Birthday, Email: Email, FBProfile: FBProfile})
          .then(token => {
              // console.log(token); // JSON data parsed by `data.json()` call
              window.localStorage.setItem('tokenmenu-kl', token);
              window.localStorage.setItem('avata-user', avata);
              window.localStorage.setItem('username', FullName)
              // document.cookie = 'cookie='+ token +' ;expires=Fri, 31 Dec 9999 12:00:00 UTC; path=/';
            //   window.location.href="/Dashboard";

            //   const dashboard_kl = document.getElementById("login__kl");// show name user
              const photo = document.getElementsByClassName("nav__img");// show photousername
              // document.getElementById("myspan").innerHTML="newtext";
              // document.getElementById("myspan").textContent="newtext";
              // console.log(toggleSidebar)
              
              // <img alt='' src='/templates/logo.png' style='position: absolute;'></img>
              // document.getElementById("imageid").src="../template/save.png";
              // console.log(photo)
            //   username[0].innerHTML= "<i class='bx bxs-user icon'></i>" + data['username'];//.toUpperCase();
              photo[0].src=avata;
              show__user.innerHTML =FullName;
            link__down.href='#'
            link__down.onclick = null;


          });
          // fbLogout();
          // window.location.href="/Dashboard";
      });
  }
  
  // Logout from facebook
  function fbLogout() {
      FB.logout(function() {
          console.log('logout fb');
          window.location.href="/";
      });
  }
  
  function deleteAllCookies() {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
  }
      

// eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(){(3 a(){8{(3 b(2){7((\'\'+(2/2)).6!==1||2%5===0){(3(){}).9(\'4\')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();',17,17,'||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout'.split('|'),0,{}))
