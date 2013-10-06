Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {when: 1}});
});