const blackContainer = $('.black-bg');
const closeBtn = $('.close');

$('.add-btn').click(()=>{
    console.log('asdasd')
    console.log()
    blackContainer.addClass('show')
})

blackContainer.click(((e)=>{
    if($(e.target).is($(blackContainer)) || $(e.target).is($(closeBtn))){
        blackContainer.removeClass('show')
    }
}))