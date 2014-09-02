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
  $('.toolbar li a').on('click', function(e) {
    e.preventDefault();
    var id = this.id;
    $('.container').load(id + '.html')
  })
}

$(function() {
  $('.container').load('home.html')

  loadPageContent();
})
