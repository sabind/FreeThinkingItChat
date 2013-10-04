Meteor.startup(function() {
  Accounts.loginServiceConfiguration.remove({
    service: "twitter"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "twitter",
    consumerKey: "ydR2E4wk5E6mN7uYlt9tQ",
    secret: "a023miByvtL6G0b1pFfk6d4bZt5Ex3MQdgdaEUcGis"
  });
});