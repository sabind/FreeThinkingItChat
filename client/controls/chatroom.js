Meteor.subscribe("messages");

Template.chatroom.messages = function () {
    return Messages.find();
};

Template.chatroom.isTwitterMessage = function() {
    return this.twitter !== undefined
}

Template.chatroom.isFacebookMessage = function() {
    return this.facebook !== undefined
}

Template.chatroom.isGuestMessage = function() {
    return this.twitter === undefined && this.facebook === undefined
}

Template.chat_box.isTwitter = function() {
    return Meteor.user().services.facebook === undefined
}

Template.chat_box.isFacebook = function() {
    return Meteor.user().services.twitter === undefined
}

Template.chat_box.isGuest = function() {
    return Meteor.user() === null
}

Template.twitter_message.renderInUserTime = function(messageTS) {
    return moment(messageTS, "LLLL");
}

Template.facebook_message.renderInUserTime = function(messageTS) {
    return moment(messageTS, "LLLL");
}

Template.guest_message.renderInUserTime = function(messageTS) {
    return moment(messageTS, "LLLL");
}

Template.chatroom.events = {
    "submit": function (){
        var $msg  = $("#msg");
        if ($msg.val() && Meteor.user() !== null){
            Messages.insert({
                "message": $msg.val(),
                "twitter": Meteor.user().services.twitter,
                "facebook": Meteor.user().services.facebook,
                "user": Meteor.user(),
                "timestamp": moment().format("LLLL")
            });
        } else {
            Messages.insert({
                "message": $msg.val(),
                "twitter": undefined,
                "facebook": undefined,
                "user": "Guest",
                "timestamp": moment().format("LLLL")
            });
        }
        $msg.val("");
        $msg.focus();
        Meteor.flush()
        $("#messages").scrollTop(99999);
    }
};