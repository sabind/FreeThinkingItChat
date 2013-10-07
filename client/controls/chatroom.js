Meteor.subscribe("messages");

Template.chatroom.messages = function () {
    return Messages.find({}, {sort: {when: 1}});
};

Template.chatroom.isTwitterMessage = function() {
    var owner = Meteor.users.findOne(this.user);
    return owner !== null && owner !== undefined && owner.services.twitter !== undefined
}

Template.twitter_message.renderInUserTime = function(messageTS) {
    return moment(messageTS, "LLLL");
}

Template.twitter_message.getTwitterHandle = function(userId) {
    var user = Meteor.users.findOne(userId);
    if (user !== null && user !== undefined) {
        return user.services.twitter.screenName;
    }
}

Template.twitter_message.getTwitterProfileImage = function(userId) {
    var user = Meteor.users.findOne(userId);
    if (user !== null && user !== undefined) {
        return user.services.twitter.profile_image_url;
    }
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
    if (owner === null || owner === undefined)
        return "";
    if (owner._id === Meteor.userId())
        return "Me";
    return displayName(owner);
};

Template.twitter_message.messageOwnerName = function(user) {
    var owner = Meteor.users.findOne(user);
    if (owner === null || owner === undefined)
        return "";
    if (owner._id === Meteor.userId())
        return "Me";
    return displayName(owner);
};

Template.twitter_message.messageBelongsToUser = function(user) {
    return Meteor.user() && user !== null && user !== undefined && user === Meteor.user()._id
}

Template.user_message.messageBelongsToUser = function(user) {
    return Meteor.user() && user !== null && user !== undefined && user === Meteor.user()._id
}

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

var displayName = function (user) {                                                                                          // 30                                                                                          // 31
    if (!user)                                                                                                         // 32
        return '';                                                                                                       // 33
    // 34
    if (user.profile && user.profile.name)                                                                             // 35
        return user.profile.name;                                                                                        // 36
    if (user.username)                                                                                                 // 37
        return user.username;                                                                                            // 38
    if (user.emails && user.emails[0] && user.emails[0].address)                                                       // 39
        return user.emails[0].address;                                                                                   // 40
    // 41
    return '';                                                                                                         // 42
};