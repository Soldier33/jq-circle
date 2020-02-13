$('#sub').click(() => {
    var nickname = $('#newName').val()
    var email = $('#newEmail').val()
    var passwd = $('#newPasswd').val()
    var circle = $('#newCircle').val()
    $.ajax({
        type: "POST",
        url: `/admin/user`,
        data: {
            nickname: nickname,
            email: email,
            passwd: passwd,
            circle: circle
        },
        dataType: "json",
        success: function (response) {        
            $('.topic').children(':first-child').after(`           
            <div class="my-nav2">
                <ul>
                    <li><a href="/admin/circle"><strong> ${nickname}</strong></a></li>
                    <li><a href="/admin/circle"><strong>${email}</strong></a></li>
                    <li><a href="/admin/circle"><strong>${passwd}</strong></a></li>
                    <li><a href="/admin/circle"><strong>${circle}</strong></a></li>
                    <a href="/admin/user/delete?topic=${nickname} &circle=${nickname}"><i class="fa fa-trash pull-right mt-2" aria-hidden="true"></i></a>
                </ul>
            </div>
            `)
        }
    })
    $('#newName').val('')
    $('#newEmail').val('')
    $('#newPasswd').val('')
    $('#newCircle').val('')
})