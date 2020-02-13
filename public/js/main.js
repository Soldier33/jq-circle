var  filename=location.href;

filename=filename.substr(filename.lastIndexOf('/')+1)

var user=decodeURI(getCookie("nickname"))
var userCircle=decodeURI(getCookie("circle"))
if(userCircle === 'j%3Anull')
  userCircle = '暂无'

$('#user').append(`${user}`)
$('#userCircle').append(`${userCircle}`)

$(`[href="/${filename}"]`).addClass('color-blue')
$(`[href="/admin/${filename}"]`).addClass('color-blue')

$('#sidebar').affix({
    offset: {
      top: $('header').height()
    }
});	

$(document).on("click",'.fa-search',function(){
  $.ajax({
    type: "get",
    url: `/user/circle`,
    data: {
        cname:  $('#i-advanced-search').val(),
    },
    dataType: "json",
    success: function (response) {
      if(response===0)
        response = '没有找到'
      $('.find-circle').remove()    
      $('.search_input').after(`
      <div class="card text-white bg-primary mb-3 find-circle" style="max-width: 18rem;">
          <div class="card-header">
              <h5 class="card-title">找到的圈</h5>
          </div>
          <div class="card-body my-font">
              <div>
                  <span class="cname">${response}</span>
                  
                  <a href='#'><i id="${response}" class="fa fa-share pull-right mt-2" aria-hidden="true"></i></a>
                  <a href='#'><i class="fa fa-plus pull-right mt-2" aria-hidden="true"></i></a>
              </div>
          </div>
      </div>
      `)     
    }
  })
})


$(document).on("click",'.fa-plus',function(){
  var cname = $('.cname').text()
  var nickname = getCookie('nickname')
  $.ajax({
    type: "get",
    url: `/user/addCircle`,
    data: {
        cname: cname,
        nickname: nickname
    },
    dataType: "json",
    success: function (response) {       
      $('.my-circle').append(`
        <div>
            <span>${cname}</span> 
            <a href='#'><i id="${cname}" class="fa fa-share pull-right mt-2" aria-hidden="true"></i></a>
            <a href='/user/deleteUserCircle?circle=${cname}'><i class="fa fa-trash pull-right mt-2" aria-hidden="true"></i></a>
        </div>
      `)      
    }
  })
})

$(document).on("click",'.fa-share',function(){
  var circle=$(this).attr("id");
  $.ajax({
    type: "get",
    url: `/user/updataUserCircle`,
    data: {
        circle: circle
    },
    dataType: "json",
    success: function (response) {   
      $('.topic').empty()    
      for(i in response) {
        $('.topic').prepend(`
        <a href="/content/topic?topic=${response[i].topicId}"><h3 class="ml-4">${ response[i].topic}</h3></a>
      `)    
      }
      $('#userCircle').empty()
      setCookie('circle',circle)
      $('#userCircle').append(`${circle}`)
    }
  })
})