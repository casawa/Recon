'use strict';

var Firebase = require('firebase');
var db = new Firebase("https://torrid-inferno-7005.firebaseio.com/");

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
//var rollingSpider = new RollingSpider(uuid='RS_W165914');
//var rollingSpider = new RollingSpider(process.env.UUID);
var rollingSpider = new RollingSpider();

console.log("starting to connect");
rollingSpider.connect(function () {
  console.log("connected");
  console.log("setting up");
  rollingSpider.setup(function () {
    console.log("set up completely");
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
  });
});
