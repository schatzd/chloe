var Student = require('../models/student.js');
var respond = require('../utils/respond');
var sendMessage = require('../utils/sendMessage');
var advanceConversation = require('../utils/advanceConversation');

var dayKey = {
	'sunday': 0,
	'monday': 1,
	'tuesday': 2,
	'wednesday': 3,
	'thursday': 4,
	'friday': 5,
	'saturday': 6
};

var today = new Date();

var todaysDay = today.getDay();

var studentsToNotify = [];

var checkStudents = function(){
	var qry;
	for (var day in dayKey){
		if(dayKey[day] === todaysDay){
			qry = 'schedule.' + day;
		}
	}
	var query = JSON.parse('{"'+qry+'":true}');
	Student.find(query, 'name reminderTime phone_number convoState', function (err, students) {
		if (err) return handleError(err);
		students.forEach(function(student){
			if (student.reminderTime == today.getHours()){
				var msg = "Hey " + student.name + ", were you able to practice yoga today?"
				sendMessage(msg, student.phone_number);
				advanceConversation(student, "log0");
			}	
		})
		
	})
}

module.exports = checkStudents;