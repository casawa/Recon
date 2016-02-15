/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
const https = require('https');
const exec = require('child_process').exec;
console.log("exec here" + exec);

exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        console.log(e);
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("LaunchIntent" === intentName) {
        getLaunchResponse(callback)
    } /*else if ("MyColorIsIntent" === intentName) {
        setColorInSession(intent, session, callback);
    } else if ("WhatsMyColorIntent" === intentName) {
        getColorFromSession(intent, session, callback);
    }*/
    else if ("LandIntent" === intentName) {
        landDrone(callback)
    } else if ("ForwardIntent" === intentName) {
        forwardDrone(callback)
    } else if ("BackwardIntent" === intentName) {
        backwardDrone(callback)
    } else if ("FlipIntent" === intentName) {
        flipDrone(callback)
    } else if ("RightIntent" === intentName) {
        rightDrone(callback)
    } else if ("LeftIntent" === intentName) {
        leftDrone(callback)
    } else if ("ImpressIntent" === intentName) {
        impressDrone(callback)
    } else if ("ImagineIntent" === intentName) {
        imagineDrone(intent, callback)
    } else if ("DeliverIntent" === intentName) {
        impressDrone(callback)
    } else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        endResponse(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getLaunchResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Launch";
    var speechOutput = "Recon is about to launch. " +
        "Give directions";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please give directions";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'launch'
    });


    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
      /*headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }*/
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);

}

function landDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Landing";
    var speechOutput = "Recon is about to land. "
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "";
    var shouldEndSession = true;

    var postData = JSON.stringify({
      'command' : 'land'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
      /*headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }*/
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
}

function flipDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Flip";
    var speechOutput = "Recon is about to flip. ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'flip'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';imp
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}

function impressDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Impress";
    var speechOutput = "Here goes nothing... ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'flip'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}

function forwardDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Forward";
    var speechOutput = "Recon is about to go forward. ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'forward'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}

function backwardDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Backwards";
    var speechOutput = "Recon is about to go backwards. ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'backward'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}

function leftDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Left";
    var speechOutput = "Recon is about to go left. ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'left'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}

function rightDrone(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Right";
    var speechOutput = "Recon is about to go right. ";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "What's next?";
    var shouldEndSession = false;

    var postData = JSON.stringify({
      'command' : 'right'
    });

    var options = {
      hostname: 'torrid-inferno-7005.firebaseio.com',
      port: 443,
      path: '/.json',
      method: 'PATCH',
    };

    body = '';
    var req = https.request(options, function(res) {
        res.on('data', function (chunk) {
            body += chunk;
            callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

        });
//        context.succeed('Blah');
    });

    req.on('error', function(e) {
      console.log('problem with request:' + e.message);
    });

    // write data to request body*/
    req.write(postData);
    req.end();
    console.log("sdf: " + body);
}


function imagineDrone(intent, callback) {
    var cardTitle = intent.name;
    console.log(intent);
    var cvObj = intent.slots.Object;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (cvObj) {
        var obj = cvObj.value;
        var postData = JSON.stringify({
          'trainee' : obj
        });

        var options = {
          hostname: 'torrid-inferno-7005.firebaseio.com',
          port: 443,
          path: '/.json',
          method: 'PATCH',
          /*headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
          }*/
        };

        body = '';
        speechOutput = "Imagining " + obj;
        shouldEndSession = true;

        var req = https.request(options, function(res) {
            res.on('data', function (chunk) {
                body += chunk;
                speechOutput = "Imagining " + obj;
                shouldEndSession = true;

                callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

            });
        //        context.succeed('Blah');
        });

        req.on('error', function(e) {
          console.log('problem with request:' + e.message);
        });

        // write data to request body*/
        req.write(postData);
        req.end();
    } else {
        speechOutput = "I'm not sure what you'd like me to imagine. Please try again";
        repromptText = "I'm not sure what you'd like me to imagine.";

        callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));

    }

}

function endResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Goodbye";
    var speechOutput = "Goodbye";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "";
    var shouldEndSession = true;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to recon. " +
        "Let the recon know you want it to launch by saying recon launch";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Let the recon know you want it to launch by saying recon launch";
    var shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}/*

/**
 * Sets the color in the session and prepares the speech to reply to the user.

function setColorInSession(intent, session, callback) {
    var cardTitle = intent.name;
    var favoriteColorSlot = intent.slots.Color;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (favoriteColorSlot) {
        var favoriteColor = favoriteColorSlot.value;
        sessionAttributes = createFavoriteColorAttributes(favoriteColor);
        speechOutput = "I now know your favorite color is " + favoriteColor + ". You can ask me " +
            "your favorite color by saying, what's my favorite color?";
        repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
    } else {
        speechOutput = "I'm not sure what your favorite color is. Please try again";
        repromptText = "I'm not sure what your favorite color is. You can tell me your " +
            "favorite color by saying, my favorite color is red";
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor: favoriteColor
    };
}

function getColorFromSession(intent, session, callback) {
    var favoriteColor;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }

    if (favoriteColor) {
        speechOutput = "Your favorite color is " + favoriteColor + ". Goodbye.";
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
            " is red";
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}*/

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
