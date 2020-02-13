$('#sub').click(() => {
    var user=decodeURI(getCookie("nickname"))
    var content = $('#content').val()
    $.ajax({
        type: "POST",
        url: `/content/topic`,
        data: {
            content: content
        },
        dataType: "json",
        success: function (response) {        
            $('.content').append(`   
            <div class="mt-4">
                <div class="row">
                    <div class="col-md-1">
                        <img src="/public/img/authlogo.jpg" class="rounded-circle img-mini">
                    </div>

                    <div class="col-md-11">
                        <div class="my-name">
                            &nbsp;&nbsp;&nbsp;
                            <span><strong>${user}</strong></span>
                        </div>
                        <div class="topic-content">
                            &nbsp;&nbsp;&nbsp;
                            <span>${content}</span>
                        </div>
                    </div>
                </div>
                <div class="btn-group my-flex mt-2" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary my-flex-child button-blue">收藏</button>
                    <button type="button" class="btn btn-secondary my-flex-child button-blue">评论</button>
                    <button type="button" class="btn btn-secondary my-flex-child button-blue">私信</button>
                    <button type="button" class="btn btn-secondary my-flex-child button-blue">点赞</button>
                </div>
            </div>
            `)
        }
    })
    $('#content').val('')
})

var topic=decodeURI(getCookie("topic"))

$('#userCircle').append(` \\ ${topic}`)