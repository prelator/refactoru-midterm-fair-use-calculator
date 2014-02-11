$(document).ready(function(){

	//========== Global methods =====================
	Array.prototype.findByName = function(name){
		for (var i = 0; i < this.length; i++) {
			if (this[i].name === name) {
				return this[i];
			}
		}
	};

	//============= Constructors ====================
	var Question = function(name, number, category, text, choices){
		this.name = name;
		this.number = number;
		this.category = category;
		this.text = text;
		this.choices = choices;
	};		

	Question.prototype.findByResponse = function(resp){
		for (var i = 0; i < this.choices.length; i++) {
			if (this.choices[i].label === resp) {
				return this.choices[i];
			}
		}
	};

	Question.prototype.saveResponse = function(resp){
		var selectedChoice = this.findByResponse(resp);
		answerList.push(
			{	question: this.name, 
				response: resp, 
				points: selectedChoice.points}	);			
		console.dir(answerList);
	};


	//================ Question instances ==================
	var typeOfClaim = new Question(
		"type_of_claim",
		1, 
		"Preliminary",
		"What kind of copyrighted material was claimed in your video: audio, video, or audio-visual (audio & video)?", 
		[	{label: "Audio", points: 0}, 
			{label: "Video", points: 0},
			{label: "Audio-visual", points: 0}	]
	);



	//=============== Click handlers ============================
	$('#start').click(function(){
		if ($('#agree-terms').prop("checked")) {
			$('#intro').slideToggle("slow", function(){
				$('#intro').remove();
				var q1 = questionTemplate(typeOfClaim);
				$('#question-display').html(q1);
				$('#questionnaire').slideToggle("slow");		
			});			
		} else {
			$('#terms-warning').show();
		}
	});

	$(document).on('click', '.choice', function() {
		var userResponse = $(this).attr('id');
		var qName = $(this).closest('.question').attr('id'); 
		var myQuestion = questionList.findByName(qName);
		myQuestion.saveResponse(userResponse);
	});

	//=========== Actions on document ready ==================

	//Template compilers
	var questionSource = $('#quest-temp').html();
	var questionTemplate = Handlebars.compile(questionSource);

	// var scoreSource = $('#score-temp').html();
	// var scoreTemplate = Handlebars.compile(scoreSource);

	// var progSource = $('#prog-temp').html();
	// var progTemplate = Handlebars.compile(progSource);

	var answerList = [];
	var questionList = [typeOfClaim];

}); //End document ready