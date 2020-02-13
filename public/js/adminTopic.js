$('#sub').click(() => {
    var topic = $('#topic').val()
    var circle = $('#circle').val()
    $.ajax({
        type: "POST",
        url: `/admin/topic`,
        data: {
            circle: circle,
            topic: topic,
        },
        dataType: "json",
        success: function (response) {        
            $('.topic').children(':first-child').after(`           
            <div class="my-nav2">
                <ul>
                    <li><a href="#"><strong>${circle}</strong></a></li>
                    <li>
                        <a href="#"><strong>${topic}</strong></a>
                        <i class="fa fa-trash pull-right mt-2" aria-hidden="true"></i>
                    </li>
                </ul>
            </div>
            `)
        }
    })
    $('#circle').val('')
    $('#topic').val('')
})