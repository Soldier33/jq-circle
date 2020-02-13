$('input').blur(function(){
    if($(this).val()==="") {
        $(this).prev().show()
    } else {
        $(this).prev().hide()
    }
})
