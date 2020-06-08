$(document).ready(function() {
    $('.message a').click(function() {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");

    });
    $('#signup').click(function(event) {
        event.preventDefault();
        var data = {};
        data.username = $('.register-form').find('input[name="username"]').val();
        data.password = $('.register-form').find('input[name="password"]').val();
        data.password2 = $('.register-form').find('input[name="password2"]').val();
        data.age = $('.register-form').find('input[name="age"]').val();
        console.log(data);
        $.ajax({
            url: '/signup',
            type: 'POST',
            data: JSON.stringify(data),
            success: function(data) {
                console.log('Submission was successful.');
                $('#status').text(data.status);
            },
            error: function(data) {
                console.log('An error occurred.');
                console.log(data);
            },
            dataType: "json",
            contentType: "application/json"
        });
        event.preventDefault();
    });
});