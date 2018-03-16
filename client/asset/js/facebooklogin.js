function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        localStorage.setItem('facebookId', response.authResponse.userID)
        // window.location.href = 'index.html';

    testAPI(response)
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
    appId: 200716787345167,
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

function testAPI(token) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: ['id', 'name', 'email', 'picture.width(150).height(150)']} ,function(response) {
    console.log('Successful login for: ' + response.name);
    console.log(response);
        localStorage.setItem('name', response.name)
        axios.post('http://bersama.teddydevstack.com/login/', {
            idFB: response.id,
            email: response.email,
            fbToken: token.authResponse.accessToken,
            imgUrl: response.picture.data.url,
            username: response.name
        })
        .then(function (response_login) {
            localStorage.setItem('token', response_login.data.token);
            console.log('done - ' + localStorage.getItem('token'));
        })
        .catch(function (error) {

        });


    // document.getElementById('status').innerHTML =
    //     'Thanks for logging in, ' + response.name + '!';
    });
}
