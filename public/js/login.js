$('input').blur(function(){
    if($(this).val()==="") {
        $(this).prev().show()
    } else {
        $(this).prev().hide()
    }
})

$('#visitor').click( ()=> { 
    var nickname = 'visitor'+Math.ceil(Math.random()*10000)
    $.ajax({
        type: "POST",
        url: `/auth/register/user`,
        data: {
            nickname: nickname,
            email: 'visitor'+Math.ceil(Math.random()*10000),
            passwd: 'visitor'+Math.ceil(Math.random()*10000)
        },
        dataType: "json",
        success: function (response) {      
            location.href = '/topic'
        }
    })
})