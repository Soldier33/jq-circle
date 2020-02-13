$('#sub').click(() => {
    var topic = getCookie("topic")
    var circle = getCookie("circle")
    var content = $('#content').val()
    $.ajax({
        type: "POST",
        url: `/admin/topic/content`,
        data: {
            circle: circle,
            topic: topic,
            content: content
        },
        dataType: "json",
        success: function (response) {        
            $('.content').first().after(`           
            <div class="content mt-5 mb-5">
                <div class="row">
                    <div class="col-md-1">
                        <img src="/public/img/authlogo.jpg" class="rounded-circle img-mini">
                    </div>
                    <div class="col-md-10">
                        <div class="my-name">
                            &nbsp;&nbsp;&nbsp;
                            <span><strong>admin</strong></span>
                        </div>
                        <div class="my-content">
                            &nbsp;&nbsp;&nbsp;
                            <span>${content}</span>
                        </div>             
                    </div>
                    <div class="col-md-1">
                        <a href="/admin/topic/content/delete"><i class="fa fa-trash pull-right mt-2" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            `)
        }
    })
    $('#content').val('')
})