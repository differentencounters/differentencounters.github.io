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

  // $('#about').on('click', function(e) {
  //   e.preventDefault();
  //   $('.container').load('about.html')
  // })

  // $('#contact').on('click', function(e) {
  //   e.preventDefault();
  //   $('.container').load('contact.html')
  // })

  // $('#partners').on('click', function(e) {
  //   e.preventDefault();
  //   $('.container').load('partners.html')
  // })

  // $('#team').on('click', function(e) {
  //   e.preventDefault();
  //   $('.container').load('team.html')
  // })

  // $('#donate').on('click', function(e) {
  //   e.preventDefault();
  //   $('.container').load('donate.html')
  // })
}

$(function() {
  $('.container').load('home.html')

  loadPageContent();
})
