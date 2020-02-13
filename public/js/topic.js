$('#sub').click(() => {
    var topic = $('#topic').val()
    $.ajax({
        type: "POST",
        url: `/admin/topic`,
        data: {
            topic: topic,
            circle: userCircle
        },
        dataType: "json",
        success: function (response) {        
            $('.topic').children(':first-child').before(`   
            <a href="/content/topic"><h3 class="ml-4">${ topic }</h3></a>
            `)
        }
    });
    $('#topic').val('')
})