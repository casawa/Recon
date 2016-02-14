var exec = require('child_process').exec;
var Firebase = require('firebase');
var db = new Firebase("https://torrid-inferno-7005.firebaseio.com/");

i = 0;
db.on('value', function(dataSnapshot) {
	if(i != 0) {
		var data = dataSnapshot.val()
		var trainee = data["trainee"]
		var searchQuery = trainee.replace(/' '/g, '+'); 
		exec("python classifier_from_search.py " + searchQuery);
	} else {
		i += 1;
	}
});
