function displayBios() {
  $('#ray .bio').show();

  $('.personnel .name .name_link').on('click', function(e) {
    e.preventDefault();
    var thisBio = this.parentElement.parentElement.parentElement.lastElementChild
    $('.bio').slideUp();
    if ($(thisBio).is(':hidden')) {
     $(thisBio).slideDown();
   }
 })
}

function loadPageContent() {
  $('a[href^="#"]').click(function(e) {
      e.preventDefault();

      var target = this.hash;
      console.log(target)

      $('html, body').stop().animate({
        'scrollTop': $(target).offset().top
      }, 500, 'swing', function () {
        window.location.hash = target;
      });

    });

  // // Loads Mosaic Partners page
  // $(document).on('click', '#mosaic', function(e) {
  //   e.preventDefault();
  //   $('.container').load('mosaic.html');
  //   setTimeout(function() {
  //     console.log('image carousel loaded');
  //     imageCarousel();
  //   }, 100)
  // })

  // // Loads contact form from Donations page
  // $(document).on('click', '#contact_us', function(e) {
  //   e.preventDefault();
  //   $('.container').load('contact.html');
  //   setTimeout(function() {
  //     sendFormData();
  //     console.log('send form data');
  //   }, 100)
  // })
}

function pageInitializers() {
  $('html').hide();
  $('.container').load('home.html');
  $('html').fadeIn();
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
      url: '//formspree.io/andrey@differentencouters.org',
      method: 'post',
      data: {name: name, _replyto: email, _subject: subject, message: message},
      dataType: 'json',
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
  // pageInitializers()
  loadPageContent();
})
