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
  // $(document).on('click', 'a', function(e) {
    e.preventDefault();
    var id = this.id;
    $('.container').load(id + '.html')
  })

  $(document).on('click', '#mosaic', function(e) {
    e.preventDefault();
    var id = this.id;
    $('.container').load(id + '.html')
  })
}

function pageInitializers() {
  $('html').hide();
  $('.container').load('home.html');
  $('html').fadeIn();
  imageCarousel();
}

function imageCarousel() {
  $(".partner_school_carousel").owlCarousel({
    navigation : true,
    slideSpeed : 500,
    paginationSpeed : 400,
    singleItem:true
  });
}

// URL FOR CONTACT FORM
// http://forms.brace.io/andrey@differentencouters.org?name=Dmitry&_replyto=dshamis317%40gmail.com&subject=TEST&message=TEST+TEST+TEST+TEST+TEST

$(function() {
  pageInitializers()
  loadPageContent();
})
