(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.eu_cookie_compliance_popup = {
    attach: function(context, settings) {
      if (context !== document) {
        return;
      }
      $('body').each(function() {
        try {
          var enabled = Drupal.settings.eu_cookie_compliance.popup_enabled;
          if (!enabled) {
            return;
          }
          if (!Drupal.eu_cookie_compliance.cookiesEnabled()) {
            return;
          }
          var status = Drupal.eu_cookie_compliance.getCurrentStatus();
          var clickingConfirms = Drupal.settings.eu_cookie_compliance.popup_clicking_confirmation;
          var scrollConfirms = Drupal.settings.eu_cookie_compliance.popup_scrolling_confirmation;
          var agreedEnabled = Drupal.settings.eu_cookie_compliance.popup_agreed_enabled;
          var popupHideAgreed = Drupal.settings.eu_cookie_compliance.popup_hide_agreed;
          if (status === 0 || status === null) {
            var nextStatus = 1;
            if (clickingConfirms) {
              $('a, input[type=submit], button[type=submit]').bind('click.euCookieCompliance', function() {
                if (!agreedEnabled) {
                  Drupal.eu_cookie_compliance.setStatus(1);
                  nextStatus = 2;
                }
                Drupal.eu_cookie_compliance.changeStatus(nextStatus);
              });
            }

            if (scrollConfirms) {
              $(window).bind('scroll', function() {
                if(!agreedEnabled) {
                  Drupal.eu_cookie_compliance.setStatus(1);
                  nextStatus = 2;
                }
                Drupal.eu_cookie_compliance.changeStatus(nextStatus);
              });
            }

            $('.agree-button').click(function() {
              if (!agreedEnabled) {
                Drupal.eu_cookie_compliance.setStatus(1);
                nextStatus = 2;
              }
              Drupal.eu_cookie_compliance.changeStatus(nextStatus);
            });

            if (!Drupal.settings.eu_cookie_compliance.disagree_do_not_show_popup || status === null) {
              Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_info);
            }
          } else if (status === 1) {
            Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_agreed);
            if (popupHideAgreed) {
              $('a, input[type=submit], button[type=submit]').bind('click.euCookieComplianceHideAgreed', function() {
                Drupal.eu_cookie_compliance.changeStatus(2);
              });
            }
          }
        }
        catch(e) {
        }
      });
    }
  };

  Drupal.eu_cookie_compliance = {};

  Drupal.eu_cookie_compliance.createPopup = function(html) {
    var popup = $(html)
      .attr('id', 'sliding-popup')
      .height(Drupal.settings.eu_cookie_compliance.popup_height)
      .width(Drupal.settings.eu_cookie_compliance.popup_width)
      .hide();
    var height = 0;
    if (Drupal.settings.eu_cookie_compliance.popup_position) {
      popup.prependTo('body');
      height = popup.height();
      popup.show()
        .attr('class', 'sliding-popup-top clearfix')
        .css('top', -1 * height)
        .animate({top: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
    } else {
      popup.appendTo('body');
      height = popup.height();
      popup.show()
        .attr('class', 'sliding-popup-bottom')
        .css('bottom', -1 * height)
        .animate({bottom: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
    }
    Drupal.eu_cookie_compliance.attachEvents();
  };

  Drupal.eu_cookie_compliance.attachEvents = function() {
    var clickingConfirms = Drupal.settings.eu_cookie_compliance.popup_clicking_confirmation;
    var agreedEnabled = Drupal.settings.eu_cookie_compliance.popup_agreed_enabled;
    $('.find-more-button').click(function() {
      if (Drupal.settings.eu_cookie_compliance.disagree_do_not_show_popup) {
        Drupal.eu_cookie_compliance.setStatus(0);
        $('#sliding-popup').remove();
      }
      if (Drupal.settings.eu_cookie_compliance.popup_link_new_window) {
        window.open(Drupal.settings.eu_cookie_compliance.popup_link);
      }
      else {
        window.location.href = Drupal.settings.eu_cookie_compliance.popup_link;
      }
    });
    $('.agree-button').click(function() {
      var nextStatus = 1;
      if(!agreedEnabled) {
        Drupal.eu_cookie_compliance.setStatus(1);
        nextStatus = 2;
      }
      if (clickingConfirms) {
        $('a, input[type=submit], button[type=submit]').unbind('click.euCookieCompliance');
      }
      Drupal.eu_cookie_compliance.changeStatus(nextStatus);
    });
    $('.hide-popup-button').click(function() {
      Drupal.eu_cookie_compliance.changeStatus(2);
    });
  };

  Drupal.eu_cookie_compliance.getCurrentStatus = function() {
    var value = $.cookie('cookie-agreed');
    value = parseInt(value);
    if (isNaN(value)) {
      value = null;
    }
    return value;
  };

  Drupal.eu_cookie_compliance.changeStatus = function(value) {
    var status = Drupal.eu_cookie_compliance.getCurrentStatus();
    if (status === value) {
      return;
    }
    if (Drupal.settings.eu_cookie_compliance.popup_position) {
      $('.sliding-popup-top').animate({top: $('#sliding-popup').height() * -1}, Drupal.settings.eu_cookie_compliance.popup_delay, function () {
        if (status === 0) {
          $('#sliding-popup').html(Drupal.settings.eu_cookie_compliance.popup_html_agreed).animate({top: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
          Drupal.eu_cookie_compliance.attachEvents();
        }
        if (status === 1) {
          $('#sliding-popup').remove();
        }
      });
    } else {
      $('.sliding-popup-bottom').animate({bottom: $('#sliding-popup').height() * -1}, Drupal.settings.eu_cookie_compliance.popup_delay, function () {
        if (status === 0) {
          $('#sliding-popup').html(Drupal.settings.eu_cookie_compliance.popup_html_agreed).animate({bottom: 0}, Drupal.settings.eu_cookie_compliance.popup_delay);
          Drupal.eu_cookie_compliance.attachEvents();
        }
        if (status === 1) {
          $('#sliding-popup').remove();
        }
      });
    }
    Drupal.eu_cookie_compliance.setStatus(value);
  };

  Drupal.eu_cookie_compliance.setStatus = function(status) {
    var date = new Date();
    var domain = Drupal.settings.eu_cookie_compliance.domain ? Drupal.settings.eu_cookie_compliance.domain : '';
    date.setDate(date.getDate() + parseInt(Drupal.settings.eu_cookie_compliance.cookie_lifetime));
    $.cookie('cookie-agreed', status, date.toUTCString(), Drupal.settings.basePath, domain);
  };

  Drupal.eu_cookie_compliance.hasAgreed = function() {
    var status = Drupal.eu_cookie_compliance.getCurrentStatus();
    return status === 1 || status === 2;
  };

  Drupal.eu_cookie_compliance.cookiesEnabled = function() {
    var cookieEnabled = navigator.cookieEnabled;
    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testCookie';
      cookieEnabled = (document.cookie.indexOf('testCookie') !== -1);
    }
    return cookieEnabled;
  };

})(jQuery, Drupal);
