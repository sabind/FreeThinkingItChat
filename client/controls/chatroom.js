Deps.autorun(function () {
    Meteor.subscribe("messages");
});
Template.chatroom.messages = function () {
    return Messages.find({}, {sort: {when: 1}});
};

Template.chatroom.isTwitterMessage = function() {
    return this.twitter !== undefined
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

Template.user_message.renderInUserTime = function(messageTS) {
    return moment(messageTS, "LLLL");
}

Template.chatroom.events = {
    "click .send_message": function (event, template){
       var msg = template.find(".chat")
        Meteor.call('createMessage', {
            chat: msg.value,
            chat_ts: moment().format("LLLL")
        }, function (error, message) {
            if (!error) {
                msg.value = "";
                template.find(".chat").focus();
                Meteor.flush();
                $("#messages").scrollTop(99999);
            }
        });
    }
};

Template.user_message.messageOwnerName = function(user) {
    var owner = Meteor.users.findOne(user);
    if (owner._id === Meteor.userId())
        return "Me";
    return displayName(owner);
};

Template.user_message.events({
    'click .remove': function () {
        Messages.remove(this._id);
    }
});

Template.twitter_message.events({
    'click .remove': function () {
        Messages.remove(this._id);
    }
});