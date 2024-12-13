const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
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

const nameInput = document.getElementById('yourName');
const emailInput = document.getElementById('yourEmail');
const yourNumber = document.getElementById('yourNumber');
const yourComments = document.getElementById('yourComments');

function validateForm() {
    if (nameInput.value === '') {
        return false;
    }
    if (emailInput.value === '') {
        return false;
    }
    if (yourNumber.value === '') {
        return false;
    }
    if (yourComments.value === '') {
        return false;
    }
    return true;
}

const alertTrigger = document.getElementById('liveAlertBtn');
alertTrigger.addEventListener('click', (event) => {

    if (validateForm()) {
        event.preventDefault();
        document.getElementById('spinner').style.display = 'block';
        $.ajax({
            type: 'POST',
            url: 'form_capture.php',
            data: $('#myForm').serialize(),
            success: function (response) {
                appendAlert('Thank you, we received your message and we will be in touch soon!', 'success');
                document.getElementById('spinner').style.display = 'none';
                document.getElementById("myForm").reset();
            },
            error: function (xhr, status, error) {
                appendAlert('There was an error processing your request. Please try again.', 'danger');
                console.error('Error:', error);
            }
        });
    }
});