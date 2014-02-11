$(document).ready(function(){
	//========== Bootstrap Options ==================
	$('.alert').alert();

	//========== Global functions / variables ==================
	var getQuestionTree = function(){
		if (answerList[0].response === "Audio") {
			return audioQuestions;
		}
		if (answerList[0].response === "Video") {
			return videoQuestions;
		}
		if (answerList[0].response === "Audio-visual") {
			return audioVisualQuestions;
		}
	};

	var calcTotalPoints = function(){
		var pointsArray = [];
		for (var i = 0; i < answerList.length; i++) {
			pointsArray.push(answerList[i].points);
		}
		var total = pointsArray.reduce(function(a, b){
			return a + b;
		});
		return total;
	};

	var renderNewQuestion = function(){
		var questionTree = getQuestionTree();
		var newQ = questionTemplate(questionTree[questionCounter]);
		$('#question-display').fadeOut('slow', function(){
			$('#question-display').html(newQ);
			$('#question-display').fadeIn();
		});
		questionCounter++;	
	};

	var updateScore = function(){
		score.totalPoints = calcTotalPoints();
		var scoreBoard = scoreTemplate(score);
		$('#score-display').html(scoreBoard);
	};

	var answerList = [];
	var questionCounter = 0;
	

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
				points: selectedChoice.points || 0}	);			
		console.dir(answerList);
	};

	var score = {
		totalPoints: 0,
		percentage: 0
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

	var originalType = new Question(
		"original_type",
		2,
		"Nature of copyrighted work",
		"Was the original copyrighted work creative in nature (song, movie, TV show, videogame, etc.) or factual in nature (news report, historical event, recorded speech, etc.)?",
		[	{label: "Creative", points: 50},
			{label: "Factual", points: 100}	]
	);

	var originalPublished = new Question(
		"original_published",
		3,
		"Nature of copyrighted work",
		"Was the original copyrighted work published or unpublished?",
		[	{label: "Published", points: 100},
			{label: "Unpublished", points: 50}	]
	);

	var commercial = new Question(
		"commercial",
		4,
		"Purpose and charcter of use",
		"Are you directly making money from your video (e.g. ad revenue), or is the video intended for any other commercial purpose (business advertisement, etc.)?",
		[	{label: "Yes", points: 50},
			{label: "No", points: 100}	]
	);

	

	//=============== Click handlers ============================
	$('#start').click(function(){
		if ($('#agree-terms').prop("checked")) {
			$('#intro').slideToggle("slow", function(){
				$('#intro').remove();
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
		renderNewQuestion();
		updateScore();
	});


	//=========== Actions on document ready ==================

	var questionList = [typeOfClaim, originalType, originalPublished, commercial];
	var audioQuestions = [originalType, originalPublished, commercial];
	var videoQuestions = [originalType, originalPublished, commercial];
	var audioVisualQuestions = [originalType, originalPublished, commercial];

	//Template compilers
	var questionSource = $('#quest-temp').html();
	var questionTemplate = Handlebars.compile(questionSource);
	$('#question-display').html(questionTemplate(typeOfClaim));

	var scoreSource = $('#score-temp').html();
	var scoreTemplate = Handlebars.compile(scoreSource);
	$('#score-display').html(scoreTemplate(score));

	// var progSource = $('#prog-temp').html();
	// var progTemplate = Handlebars.compile(progSource);



}); //End document ready