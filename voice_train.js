var exec = require('child_process').exec;
var Firebase = require('firebase');
var db = new Firebase(API_KEY);

i = 0;
db.on('value', function(dataSnapshot) {
	if(i != 0) {
		var data = dataSnapshot.val()
		var trainee = data["trainee"]
		var searchQuery = trainee.replace(/' '/g, '+'); 
		console.log("Searching " + searchQuery + "...");
		exec("python classifier_from_search.py " + searchQuery);
	} else {
		i += 1;
	}
});
