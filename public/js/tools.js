var FADE_TIME = 150; // ms
 var TYPING_TIMER_LENGTH = 400; // ms
 var COLORS = [
   '#e21400', '#91580f', '#f8a700', '#f78b00',
   '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
   '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];
var $usernameInput = $('.usernameInput'); // Input for username
var $messages = $('.messages'); // Messages area

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function deconnecte(){
  localStorage.removeItem('hl_username');
  socket.disconnect();
  socket.emit('disconnect')

}


function addParticipantsMessage (data) {
   var message = '';
   if (data.numUsers === 1) {
     message += "there's 1 participant";
   } else {
     message += "there are " + data.numUsers + " participants";
   }
   log(message);
}

// Log a message
function log (message, options) {
  var $el = $('<li>').addClass('log').text(message);
  addMessageElement($el, options);
console.log(message);
console.log(options);
}

function addMessageElement (el, options) {
   var $el = $(el);

   // Setup default options
   if (!options) {
     options = {};
   }
   if (typeof options.fade === 'undefined') {
     options.fade = true;
   }
   if (typeof options.prepend === 'undefined') {
     options.prepend = false;
   }

   // Apply options
   if (options.fade) {
     $el.hide().fadeIn(FADE_TIME);
   }
   if (options.prepend) {
     $messages.prepend($el);
   } else {
     $messages.append($el);
   }
   $messages[0].scrollTop = $messages[0].scrollHeight;
 }

 // Prevents input from having injected markup
 function cleanInput (input) {
   return $('<div/>').text(input).text();
}
