const text = ''
window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '2976178016014497', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v14.0' // use graph api version 2.8
    });
};
var token = window.localStorage.getItem('tokenmenu-kl');
var tokensession = sessionStorage;
// console.log(tokensession);

function allStorage() {

    var archive = {}, // Notice change here
        keys = Object.keys(sessionStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = sessionStorage.getItem( keys[i] );
		console.log(keys[i], sessionStorage.getItem( keys[i] ));
    }
	
    // return archive;
}
allStorage();




// ready Login
async function GetData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'GET', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json',
		"Authorization":'Bearer '+ token // Here you can add your token,
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
	console.log(response.status);
	if (response.ok) {
	  return response.json(); // parses JSON response into native JavaScript objects
	} else {
		// Dang nhap lai
		print(response.json())
		// window.localStorage.setItem('tokenmenu-kl', token);
		// window.location.href="/";
	}

	// return response.json(); // parses JSON response into native JavaScript objects
	
  }
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

  GetData('/show_user')
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
	if(data['username'] === 'Could not validate credentials'){
		console.log('het han');
		// window.location.href="/";
	} else{
	const username = document.getElementsByClassName("branda");// show name user
	const photo = document.getElementsByClassName("photousername");// show photousername
	// document.getElementById("myspan").innerHTML="newtext";
	// document.getElementById("myspan").textContent="newtext";
	// console.log(toggleSidebar)
	username[0].innerHTML= "<i class='bx bxs-user icon'></i>" + data['username'];//.toUpperCase();
	// <img alt='' src='/templates/logo.png' style='position: absolute;'></img>
    // document.getElementById("imageid").src="../template/save.png";
	// console.log(photo)
	photo[0].src=data['photo'];
	}
  });


////////////// logout fb /////////////////////
function fbLogout() {
	window.location.href="/";
	// FB.logout(function() {
	// 	console.log('logout fb');
		
	// });
}

 //////////////////////// Socket Chart //////////////////////////////////////
 var ipserver = location.host;
 var client_id = Date.now();
 var count = 0;
 var newData = [];
//  document.querySelector("#ws-id").textContent = client_id;
 var ws = new WebSocket(`wss://${ipserver}/wss/${client_id}`);
 ws.onmessage = function(event) {
	const recv = JSON.parse(event.data)
	if (recv.type === 'Cyber Report'){
		// Remove first data if we received more than 20 values
		if (newData.length > 14) {
			let dst1 = newData.slice(1);
			newData = dst1;
		}else{
			newData.push(recv.value)
		}
		chart.updateSeries([
		{
			name: 'Number of PCs online',
			data: newData
		}, 
		{
			name: 'Total time pc online',
			data: [11, 32, 45, 32, 34, 52, 41, 11, 32, 45, 32, 34, 52, 41]
		}])
	} else{
		//////// messege //////////////////////////////
		var messages = document.getElementById('messages')
		var message = document.createElement('li')
		var content = document.createTextNode(event.data)
		message.appendChild(content)
		messages.appendChild(message)
		
	}
	 
 };
 
 function sendMessage(event) {
	 var input = document.getElementById("messageText")
	//  ws.send(input.value)
	 const a = {type: 'Cyber Report'}
	 ws.send(JSON.stringify(a))
	 input.value = ''
	 event.preventDefault()
 }
//// event loop chart ///////
 function sendChart() {
	const a = {type: 'Cyber Report'}
	// Create an interval to send echo messages to the server
    window.setInterval(() =>ws.send(JSON.stringify(a)), 10000)
}
sendChart()

//////////////////// Get page ///////////////////////////////////

/*================= get gameonline offline ============*/
async function sumitt(id, call){
    return await fetch("/page", {
    method: "POST",
	mode: 'cors', // no-cors, *cors, same-origin
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, *same-origin, omit
	headers: {
	// "Content-type": "application/json; charset=UTF-8",
	'Content-Type': 'application/json',
	"Authorization":'Bearer '+ token}, // Here you can add your token,
    body: JSON.stringify({
                            ID: id,
                            call: call}),
    // headers: {"Content-type": "application/json; charset=UTF-8"},
	})
    .then((response) => response.json())
    .then((responseData) => {
    // console.log(responseData);
    //Thay text element cách 1
    const main = document.getElementById('main');
	main.innerHTML = "";
    main.innerHTML = responseData;
	
    //Thay text element cách 2
   
}).catch(error => console.warn(error));}
// sumitt('khaicafe','info').then(response => console.log(response));


function clickshow(){
	var btn=document.querySelector('.btna');
	var about=document.querySelector('.abouta');
	if(this.innerText=="More"){
		about.style.display="block";
		this. innerText="Less";
	}
	else{
		about.style.display="none";
		this. innerText="More";
	}
}	


//////////////////// Return Dashboard /////////////////////////////

function DashboardID(){
	window.location.href="/Dashboard";
}



////////////////////// commingsoon ////////////////////////////////////////

let customeDate = new Date("September 10, 2023 12:00:00").getTime();
let timer = setInterval(timing, 1000);
function timing(){
	let now = new Date().getTime();
	let x = customeDate - now;
	// console.log(x);
	if(x > 0){
		
		let days = Math.floor(x / (1000*60*60*24));
		
		let hours = Math.floor((x % (1000*60*60*24)) / (1000*60*60));
		
		let mins = Math.floor((x % (1000*60*60)) / (1000*60));
		
		let secs = Math.floor((x % (1000*60)) / 1000);
		
		let time = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
		// console.log(time);
		try{document.querySelector('.timing').innerHTML = time;}
		catch{}
		
	}
            }
















/////////////////////////////// SIDEBAR DROPDOWN ////////////////////////////////

const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})





// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})





// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})




// APEXCHART
var options = {
  series: [{
  name: 'Number of PCs online',
  data: [0, 0, 0, 0, 0, 0, 0]
}, {
  name: 'Total time pc online',
  data: [11, 32, 45, 32, 34, 52, 41]
}],
//   chart: {
//   height: 350,
//   type: 'area'
// },
// dataLabels: {
//   enabled: false
// },
// stroke: {
//   curve: 'smooth'
// },
// xaxis: {
//   type: 'datetime',
//   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:00:00.000Z", "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z", "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z", "2018-09-19T12:30:00.000Z", "2018-09-19T13:30:00.000Z", "2018-09-19T14:30:00.000Z"]
// },
// tooltip: {
//   x: {
//     format: 'dd/MM/yy HH:mm'
//   },
// },

chart: {
	id: 'realtime',
	height: 350,
	type: 'area',
	animations: {
	  enabled: true,
	  easing: 'linear',
	  dynamicAnimation: {
		speed: 1000
	  }
	},
	toolbar: {
	  show: false
	},
	zoom: {
	  enabled: false
	}
  },
  dataLabels: {
	enabled: false
  },
  stroke: {
	curve: 'smooth'
  },
//   title: {
// 	text: 'Dynamic Updating Chart',
// 	align: 'left'
//   },
  markers: {
	size: 0
  },
  xaxis: {
	type: 'datetime',
	categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:00:00.000Z", "2018-09-19T08:30:00.000Z", "2018-09-19T09:30:00.000Z", "2018-09-19T10:30:00.000Z", "2018-09-19T11:30:00.000Z", "2018-09-19T12:30:00.000Z", "2018-09-19T13:30:00.000Z"],
	// range: XAXISRANGE,
  },
  tooltip: {
	x: {
	  format: 'dd/MM/yy HH:mm'
	},
  },
  grid: {
	row: {
		colors: ['#e5e5e5', 'transparent'],
		opacity: 0.5
	}, 
  },
  
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

const mode = document.getElementById("mode");
mode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
  



