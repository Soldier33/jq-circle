$('#out').click(()=>{
    var user=getCookie("nickname");
    setCookie("nickname","",1);
})