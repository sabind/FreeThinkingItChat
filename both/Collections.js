Messages = new Meteor.Collection("messages");


Messages.allow({
    insert: function (userId, party) {
        return false; // no cowboy inserts -- use createParty method
    },
    update: function (userId, party, fields, modifier) {
        return false; // use the methods
    },
    remove: function (userId, message) {
        return message.user === userId;
    }
});

var NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length !== 0;
});

Meteor.methods({
    // options should include: title, description, x, y, public
    createMessage: function (message) {
        check(message, {
            chat: NonEmptyString,
            chat_ts: NonEmptyString
        });

        if (message.chat.length > 1000)
            throw new Meteor.Error(413, "Message too long");
        if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in");

        return Messages.insert({
            chat: message.chat,
            user: this.userId,
            chat_ts: message.chat_ts,
            when: new Date()
        });
    }
});