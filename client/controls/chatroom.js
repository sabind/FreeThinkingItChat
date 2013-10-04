Meteor.subscribe("messages");

Template.chatroom.messages = function () {
  return Messages.find();
};

Template.chatroom.events = {
  "submit": function (){
    var $msg  = $("#msg");
    if ($msg.val()){
      Messages.insert({
        "message": $msg.val(),
        "user": Meteor.user(),
        "timestamp": (new Date()).toUTCString()
      });
    }
    $msg.val("");
    $msg.focus();
    Meteor.flush()
    $("#messages").scrollTop(99999);
  }
};