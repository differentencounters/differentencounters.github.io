function displayBios() {
  $('#ray .bio').show();

  $('.personnel img').on('click', function() {
    var thisBio = this.parentElement.lastElementChild
    $('.bio').slideUp();
    if ($(thisBio).is(':hidden')) {
     $(thisBio).slideDown();
   }
 })
}

function loadPageContent() {
  // Loads pages from the nav bar
  $('.toolbar li a').on('click', function(e) {
    e.preventDefault();
    var id = this.id;
    if (id === "contact") {
      $('.container').load(id + '.html')
      setTimeout(function() {
        sendFormData();
        console.log('send form data');
      }, 100)
    }
    $('.container').load(id + '.html');
  })

  // Loads Mosaic Partners page
  $(document).on('click', '#mosaic', function(e) {
    e.preventDefault();
    $('.container').load('mosaic.html');
    setTimeout(function() {
      console.log('image carousel loaded');
      imageCarousel();
    }, 100)
  })

  // Loads contact form from Donations page
  $(document).on('click', '#contact_us', function(e) {
    e.preventDefault();
    $('.container').load('contact.html');
    setTimeout(function() {
      sendFormData();
      console.log('send form data');
    }, 100)
  })
}

function pageInitializers() {
  $('html').hide();
  $('.container').load('home.html');
  $('html').fadeIn();
}

function imageCarousel() {
  $(".partner_school_carousel").owlCarousel({
    navigation : true,
    slideSpeed : 500,
    paginationSpeed : 400,
    singleItem:true
  });
}

function sendFormData() {
  $('.form').on('submit', function(e) {
    e.preventDefault();
    var nameField = $('.form_name');
    var name = nameField.val();
    var emailField = $('.form_email');
    var email = emailField.val().replace('@', '%40');
    var subjectField = $('.form_subject');
    var subject = subjectField.val();
    var messageField = $('.form_message');
    var message = messageField.val().replace(' ', '+');
    $.ajax({
      url: 'http://forms.brace.io/andrey@differentencouters.org?name=' + name + '&_replyto=' + email + '&subject=' + subject + '&message=' + message,
      method: 'post',
      success: function(data) {
        console.log('Form submitted')
        $('.form').hide();
        $('.sent').fadeIn();
      }
    })
  })
}

function stickyFooter() {
  var bodyHeight = $('.container').height();
  var windowHeight = $(window).height();
  if (windowHeight > bodyHeight) {
    $('.footer').css('position','absolute').css('bottom',0);
  }
}

$(function() {
  pageInitializers()
  loadPageContent();
})
