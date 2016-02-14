'use strict';

var Firebase = require('firebase');
var db = new Firebase("https://torrid-inferno-7005.firebaseio.com/");

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
//var rollingSpider = new RollingSpider(uuid='RS_W165914');
//var rollingSpider = new RollingSpider(process.env.UUID);
var rollingSpider = new RollingSpider();

var i = 0
var prev = null
console.log("starting to connect");
temporal.clear();
rollingSpider.connect(function () {
  console.log("connected");
  console.log("setting up");
  rollingSpider.setup(function () {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();
    console.log("set up completely");
    db.on('value', function(dataSnapshot) {
      if (i == 0) {
        i += 1;
      } else {
        var data = dataSnapshot.val()
        var command = data["command"]
        console.log("received command")
        if (command == "launch") {
          console.log("launching");
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.flatTrim();
                rollingSpider.takeOff();
              }
            }
          ]);
          console.log("launched")
        } else if (command == "land") {
          console.log("landing")
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.land();
              }
            }
          ]);
          console.log("landed");
        } else if (command == "forward") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.forward();
              }
            }
          ]);
        } else if (command == "left") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.left();
              }
            }
          ]);
        } else if (command == "right") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.right();
              }
            }
          ]);
        } else if (command == "flip") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.backFlip();
              }
            }
          ]);
        } else if (command == "backward") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.backward();
              }
            }
          ]);
        } else if (command == "hover") {
          temporal.queue([
            {
              delay: 5000,
              task: function() {
                rollingSpider.hover();
              }
            }
          ]);
        }
      }

    });
  });
    /*
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();
    console.log("starting to fly");

    temporal.queue([
      {
        delay: 5000,
        task: function () {
          rollingSpider.takeOff();
          // rollingSpider.flatTrim();
        }
      },
      {
        delay: 3000,
        task: function () {
          rollingSpider.forward();
        }
      },
      {
        delay: 3000,
        task: function () {
          rollingSpider.left();
        }
      },
      {
        delay: 3000,
        task: function () {
          rollingSpider.backward();
        }
      },
      {
        delay: 3000,
        task: function () {
          rollingSpider.right();
        }
      },
      {
        delay: 3000,
        task: function () {
          rollingSpider.backFlip();
        }
      },
      {
        delay: 5000,
        task: function () {
          rollingSpider.land();
        }
      },
      {
        delay: 5000,
        task: function () {
        temporal.clear();
        process.exit(0);
        }
      }
    ]);
  });*/
});
