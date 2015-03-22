var Transmitter = require("pulsar-transmitter");
var GitHub = require("github");

var t = new Transmitter();

var github = new GitHub({
  // required
  version: "3.0.0",
  // optional
  debug: true,
  protocol: "https",
  timeout: 5000,
  headers: {
    "user-agent": "pulsar-announcer-github" // GitHub is happy with a unique user agent
  }
});
github.events.get({}, function(err, res) {
  console.log("Response from GitHub had " + res.length + " events");

  var pulse = {
    Name: "GitHubAvatar",
    Users: []
  };


  // var pulse = {
  //   Name: "GitHubAvatar",
  //   User: res[0].actor.login,
  //   AvatarUrl: res[0].actor.avatar_url
  // }

  for (var i = 0; i < res.length; i++) {
    if (res[i].type === "PushEvent") {
      pulse.Users.push({
        User: res[i].actor.login,
        AvatarUrl: res[i].actor.avatar_url,
      });
    }
  };

  t.transmit(pulse);

  
  console.log("Transmitted: ");
  console.log(pulse);

  console.log("There were " + pulse.Users.length + " push events");
});