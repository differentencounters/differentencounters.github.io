var differentEncounters = {
	init: function() {
		this.navSlideTransition();
		this.renderDescriptions();
	},
	navSlideTransition: function() {
		$('nav a[href^="#"]').click(function(e) {
			e.preventDefault();

			var target = this.hash;

			$('html, body').stop().animate({
				'scrollTop': $(target).offset().top
			}, 500, 'swing', function () {
				window.location.hash = target;
			});

		});
	},
	sendFormData: function() {
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
			});
		});
	},
	renderDescriptions: function() {
		$('.reveal-link').click(function(e) {
			e.preventDefault();
			var divToShow = $(this).closest('.reveal-container').data('id');
			var $this = $('#'+divToShow);
			var divClass = $($this).attr('class');
			
			$('.'+divClass).not($this).each(function(){
				$(this).slideUp();
			});

			if ($this.is(':visible')) {
				$($this).slideUp();
			} else {
				$($this).slideDown();
			}
		});
	}
}


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

$(function() {
	differentEncounters.init();
});
