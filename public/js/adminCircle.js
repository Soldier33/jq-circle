$(document).on("click",'.delete',function(){
    var cname=$(this).attr("id");
    if (confirm("真的要删除吗?")) {         
        $.get('/admin/circle/delete', {
            cname: cname
        },
        function (data) {
            alert('删除成功')
            location.reload()
        })
    }
})    


$('#sub').click(() => {
    var cname = $('#cname').val()
    var cbrief = $('#cbrief').val()
    $.ajax({
        type: "POST",
        url: `/admin/circle`,
        data: {
            cname: cname,
            cbrief: cbrief
        },
        dataType: "json",
        success: function (response) {
            $('.Circle').prepend(`
            <div class="card ml-3 mt-3 mb-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${cname}</h5>
                    <p class="card-text">${cbrief}</p>
                    <a href="/admin/topic" class="btn btn-primary">进入</a>
                    <button id="${cname}" class="btn btn-primary delete">删除</button>
                </div>
            </div>
            `)
        }
    });
    $('#cname').val('')
    $('#cbrief').val('')
})