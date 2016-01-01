'use strict';


var Rsvp = new function() {

  // -------------------------
  // 	Settings
  // -------------------------
  var obj = this,
      form = {};

  // -------------------------
  // 	Initialize
  // -------------------------
  this.init = function() {
    toggle_accept(true);
    init_listener();
  };

  var toggle_accept = function(accept) {
    if (accept) {
      $('#rsvp_accept').show();
      $('#rsvp_decline').hide();
    } else {
      $('#rsvp_accept').hide();
      $('#rsvp_decline').show();
    }
  };

  var send_message = function(msg) {
    var $msg = $('#message');
    $msg.find('.alert').html(msg);
    $msg.show();

    $('html, body').animate({
        scrollTop: ($msg.offset().top-100)
    }, 700);
  };

  var validate = function(form) {
    if ((form.email == '') || (form.first_name == '')) {
      send_message('Es fehlen noch ein paar Angaben');
      return false;
    } else {
      return true;
    }
  }

  var init_listener = function() {

    $('#reservation_option input').change(function() {
      toggle_accept($(this).val() == 'true');
    })

    $('#rsvp_form').submit(function(e) {
      e.preventDefault();
      $.each($(this).serializeArray(), function(i, field) {
        form[field.name] = field.value;
      })

      if (validate(form)) {
        Fieldbook.create(
          form,
          function(data) {
            if ((data.error) && (data.duplicate)) {
              send_message('Wir haben Dein Feedback schon und Deine Angaben aktualisiert');
            } else {
              send_message('Dankeschön für Dein Feedback');
            }
            $('#rsvp_form').hide();
          },
          function(data) {
            send_message(data)
          }
        );
      }
    })
  };

}; // END



$(document).ready(function() {
  Rsvp.init()
});
