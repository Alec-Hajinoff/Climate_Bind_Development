//Code that deals with new user registration start:
/*
const alertPlaceholder = document.getElementById('registerPlaceholder')
var wrapper = null;
const appendAlert = (message, type) => {
    if (!wrapper) {
        wrapper = document.createElement('div');
        alertPlaceholder.append(wrapper)
    }
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
}
*/
const nameInput = document.getElementById('yourFirstName');
//const premiumInput = document.getElementById('yourPremium');
const yourEmail = document.getElementById('yourEmailRegister');
const yourPassword = document.getElementById('yourPasswordRegister');

function validateForm(event) {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameInput || !nameRegex.test(nameInput.value)) {
        return false;
    }
    /* if (premiumInput.value === '') {
        return false;
    }
    */
    if (!yourEmail || !emailRegex.test(yourEmail.value)) {
        return false;
    }
    if (!yourPassword || yourPassword.value.length < 8) {
        event.preventDefault();
        $('#error-message').text('Password must be at least 8 characters long.').show().fadeOut(3000); 
        return false;
    }
    return true;
}

const alertTrigger = document.getElementById('registerBtn');
alertTrigger.addEventListener('click', (event) => {

    if (validateForm(event)) {
        //event.preventDefault();
        document.getElementById('spinnerRegister').style.display = 'block';
        $.ajax({
            type: 'POST',
            url: 'form_capture.php',
            data: $('#myFormRegister').serialize(),
            success: function (response) {
                appendAlert('Thank you, we received your data and we will be in touch soon!', 'success');
                //document.getElementById('spinnerRegister').style.display = 'none';
                document.getElementById("myFormRegister").reset();
            },
            error: function (xhr, status, error) {
                appendAlert('There was an error processing your request. Please try again.', 'danger');
                console.error('Error:', error);
            }
        });
    }
});
//Code that deals with new user registration end!
//Code that deals with user login start:
const yourEmailLoginOne = document.getElementById('yourEmailLogin');
const yourPasswordLoginOne = document.getElementById('yourPasswordLogin');

function validateFormLog(event) {
    const emailRegexOne = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (yourEmailLoginOne.value === '' || !emailRegexOne.test(yourEmailLoginOne.value)) {
        return false;
    }
    if (yourPasswordLoginOne.value === '' || yourPasswordLoginOne.value.length < 8) {
        event.preventDefault();
        $('#error-message-one').text('Password must be at least 8 characters long.').show().fadeOut(3000);
        return false;
    }
    return true;
}

const alertTriggerLogin = document.getElementById('loginBtn');
alertTriggerLogin.addEventListener('click', (event) => {
    //event.preventDefault();
    if (validateFormLog(event)) {
        $.ajax({
            type: 'POST',
            url: 'login_capture.php',
            data: $('#myFormLogin').serialize(),
            success: function (response) {
                console.log("Success!");
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});
//Code that deals with user login end!
//Code that deals with user login from the file registered_login.php, start:
const yourEmailLoginTwo = document.getElementById('yourEmailLoginOne');
const yourPasswordLoginTwo = document.getElementById('yourPasswordLoginOne');

function validateFormLogOne(event) {
    const emailRegexTwo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (yourEmailLoginTwo.value === '' || !emailRegexTwo.test(yourEmailLoginTwo.value)) {
        return false;
    }
    if (yourPasswordLoginTwo.value === '' || yourPasswordLoginTwo.value.length < 8) {
        event.preventDefault();
        $('#error-message-one').text('Password must be at least 8 characters long.').fadeOut(3000);
        return false;
    }
    return true;
}

const alertTriggerLoginOne = document.getElementById('loginBtnOne');
alertTriggerLoginOne.addEventListener('click', (event) => {
    //event.preventDefault();
    if (validateFormLogOne(event)) {
        $.ajax({
            type: 'POST',
            url: 'login_capture.php',
            data: $('#myFormLogin').serialize(),
            success: function (response) {
                console.log("Success!");
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});
//Code that deals with user login from the file registered_login.php, end!