function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        axios
        .post('http://bucket.adhiarta.com',{}, {
            header: {
                token: response.authResponse.accessToken
            }
        })
        .then(res => {
            console.log(res);
        })
    // testAPI()
    } else {
    document.getElementById('status').innerHTML = 'login use facebook';
    }
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
    appId      : 159911174626779,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
    });
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log(response);
    document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
}