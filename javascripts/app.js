function displayBios() {
  $('#ray .bio').slideDown();

  $('.personnel img').on('click', function() {
    var thisBio = this.parentElement.lastElementChild
    $('.bio').slideUp();
    if ($(thisBio).is(':hidden')) {
     $(thisBio).slideDown();
   }
 })
}

function loadPageContent() {
  $('#about').on('click', function(e) {
    e.preventDefault();
    $('.container').load('about.html')
  })
}

$(function() {
  $('.container').load('home.html')
})
