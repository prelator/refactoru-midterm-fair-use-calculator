$(document).ready(function(){
	//========== Bootstrap Options ==================
	$('.alert').alert();

	//========== Global methods =====================
	Array.prototype.findByName = function(name){
		for (var i = 0; i < this.length; i++) {
			if (this[i].name === name) {
				return this[i];
			}
		}
	};

	//========== Global functions / variables ==================
	var answerList = [];
	var questionCounter = 0;

	var getQuestionTree = function(){
		if (answerList[0].response === "audio") {
			return audioQuestions;
		}
		if (answerList[0].response === "video") {
			return videoQuestions;
		}
	};

	var renderNewQuestion = function(){
		var questionTree = getQuestionTree();
		questionTree[questionCounter].number = answerList.length+1;
		var newQ = questionTemplate(questionTree[questionCounter]);
		$('#question-display').fadeOut('slow', function(){
			$('#question-display').html(newQ);
			$('#question-display').fadeIn();
		});
		questionCounter++;	
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

	var getCategoryPoints = function(category){
		var categoryPoints = [];
		for (var i = 0; i < answerList.length; i++) {
			if (answerList[i].category === category) {
				categoryPoints.push(answerList[i].points);
			}
		}
		if (categoryPoints.length > 0){
			var total = categoryPoints.reduce(function(a, b){
				return a + b;
			});
			return total;
		}
	};

	var updateCategoryTotals = function(){
		score.purposePoints = getCategoryPoints("purpose") || 0;
		score.naturePoints = getCategoryPoints("nature") || 0;
		score.amountPoints = getCategoryPoints("amount") || 0;
		score.marketPoints = getCategoryPoints("market") || 0;
	};

	var updateScore = function(){
		score.totalPoints = calcTotalPoints();
		updateCategoryTotals();
		var scoreBoard = scoreTemplate(score);
		$('#score-display').html(scoreBoard);
	};

	var calcProgress = function(){
		var tree = getQuestionTree();
		var answered = answerList.length;
		var total = tree.length + 1;
		return Math.round(answered / total * 100);
	};

	var updateProgress = function(){
		var currentPercent = calcProgress();
		progress.percentage = currentPercent;
		$('#prog-info').html(progTemplate(progress));
	};

	//============= Objects / Constructors ====================
	var Question = function(name, category, catLabel, text, choices){
		this.name = name;
		this.number = 1;
		this.category = category;
		this.catLabel = catLabel;
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
				category: this.catLabel,
				response: resp, 
				points: selectedChoice.points || 0}	);			
	};

	var Choice = function(label, text, points){
		this.label = label;
		this.text = text;
		this.points = points;
	};

	var score = {
		percentage: 0,
		totalPoints: 0,
		purposePoints: 0,
		naturePoints: 0,
		amountPoints: 0,
		marketPoints: 0
	};

	var progress = {percentage: 0};

	//================ Question instances ==================
	var typeOfClaim = new Question(
		"type_of_claim",
		"Preliminary",
		"prelim",
		"What kind of copyrighted material was claimed in your video: audio or video?", 
		[	new Choice("audio", "Audio", 0),
			new Choice("video", "Video", 0),
		]
	);

	var originalType = new Question(
		"original_type",
		"Nature of copyrighted work",
		"nature",
		"Was the original copyrighted work creative in nature (song, movie, TV show, videogame, etc.) or factual in nature (news report, historical event, recorded speech, etc.)?",
		[	new Choice("creative", "Creative", 50),
			new Choice("factual", "Factual", 100)
		]
	);

	var originalPublished = new Question(
		"original_published",
		"Nature of copyrighted work",
		"nature",
		"Was the original copyrighted work published or unpublished?",
		[	new Choice("published", "Published", 100),
			new Choice("unpublished", "Unpublished", 50)
		]
	);

	var amount = new Question(
		"amount",
		"Amount and substantiality",
		"amount",
		"How much of the original copyrighted work did you incorporate into your video?",
		[	new Choice("ten", "10% or less", 100),
			new Choice("twenty", "10% - 25%", 75),
			new Choice("fifty", "25% - 50%", 50),
			new Choice("seventy", "50% - 75%", 25),
			new Choice("hundred", "75% - 100%", 0)
		]
	);

	var commercial = new Question(
		"commercial",
		"Purpose and charcter of use",
		"purpose",
		"Are you directly making money from your video (e.g. ad revenue), or is the video intended for any other commercial purpose (business advertisement, etc.)?",
		[	new Choice("yes", "Yes", 50),
			new Choice("no", "No", 100)
		]
	);

	var commentary = new Question(
		"commentary",
		"Purpose and character of use",
		"purpose",
		"Does your video include your own direct commentary or criticism on the copyrighted work?",
		[	new Choice("yes", "Yes", 100),
			new Choice("no", "No", 0)
		]
	);

	var parody = new Question(
		"parody",
		"Purpose and character of use",
		"purpose",
		"Is your video a parody (mocking the original copyrighted work), satire (using the copyrighted work for social commentary on an unrelated subject), or neither?",
		[	new Choice("parody", "Parody", 100),
			new Choice("satire", "Satire", 0),
			new Choice("neither", "Neither", 0)
		]
	);	

	var purpose = new Question(
		"purpose",
		"Purpose and character of use",
		"purpose",
		"Does your purpose in using the copyrighted material in your video fall under one of these other categories (choose one)?",
		[	new Choice("news", "News reporting", 100),
			new Choice("teaching", "Teaching", 100),
			new Choice("scholarship", "Scholarship or research", 100),
			new Choice("none", "None", 0)
		]
	);

	var alter = new Question(
		"alter",
		"Purpose and character of use",
		"purpose",
		"Did you edit, alter, remix, or change the original copyrighted work in any way?",
		[	new Choice("significantly", "Yes, significiantly", 100),
			new Choice("somewhat", "Yes, somewhat", 50),
			new Choice("little", "Yes, a little", 25),
			new Choice("no", "No", 0)
		]
	);

	var compete = new Question(
		"compete",
		"Market impact",
		"market",
		"Does your video compete with the original copyrighted work, such that people could watch your video rather than paying for the original or viewing it from authorized sources, and receive the exact same experience? (If your video includes an entire copyrighted song, the answer should probably be yes.)",
		[	new Choice("yes", "Yes", 0),
			new Choice("no", "No", 100)
		]
	);

	var marketHarm = new Question(
		"market_harm",
		"Market impact",
		"market",
		"If people did watch your video instead of paying for the original copyrighted work, would it be likely to significantly harm the value of the original work or substantially reduce the copyright holder's income from the work? (In the case of most YouTube videos, the answer is likely no. If the work is not sold to the general public, the answer would also be no.)",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 100)
		]
	);

	var licensing = new Question(
		"licensing",
		"Market impact",
		"market",
		"Is there a mechanism available for you to secure a license to use the copyrighted material, such that by failing to acquire a license, you are depriving the copyright owner of licensing fees they could otherwise expect to receive? (In the case of material owned by major media companies, likely no.)",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 100)
		]
	);

	//Audio tree
	var audioCentrality = new Question(
		"centrality",
		"Purpose and character of use",
		"purpose",
		"If the copyright claim was for music, does the copyrighted music in your video merely serve to provide general ambient atmosphere to the video (like a movie soundtrack), or is it central to the character of the video, with the video shaped around the music?",
		[	new Choice("atmosphere", "General atmosphere", 0),
			new Choice("central", "Central to video", 100),
			new Choice("NA", "Not-applicable", 0)
		]
	);

	var audioContext = new Question(
		"context",
		"Purpose and character of use",
		"purpose",
		"Does your video add a new context, meaning, or message to the audio, with the video track providing a visual interpretation of the copyrighted audio (e.g. music video, interpretive dance)?",
		[	new Choice("yes", "Yes", 100),
			new Choice("no", "No", 0)
		]
	);

	var audioIncidental = new Question(
		"incidental",
		"Purpose and character of use",
		"purpose",
		"Did you include the copyrighted audio intentionally, or was it accidentally captured in the background (e.g. videogame music present in a playthrough, music from a stereo captured in a home video)?",
		[	new Choice("intentional", "Intentionally included", 0),
			new Choice("unintentional", "Accidental", 100)
		]
	);

	var audioRecording = new Question(
		"recording",
		"Purpose and character of use",
		"purpose",
		"Is the copyrighted audio in your video your own recording of a copyrighted song (i.e. a cover recording), the original sound-recording, or a mixture of both?",
		[	new Choice("cover", "Cover recording", 100),
			new Choice("original", "Original recording", 0),
			new Choice("mixture", "Mixture", 50),
			new Choice("NA", "Not-applicable", 0) 
		]
	);

	var lyricVid = new Question(
		"lyric_vid",
		"Purpose and character of use",
		"purpose",
		"Does your video track consist solely of text displaying the lyrics of the orignal copyrighted sound-recording in the audio track, and/or a photo slideshow?",
		[	new Choice("yes", "Yes", -100),
			new Choice("no", "No", 0)
		]
	);

	//Video Tree
	var videoSoundtrack = new Question(
		"soundtrack",
		"Purpose and character of use",
		"purpose",
		"Does your video use the original soundtrack from the copyrighted video source, or have you replaced the soundtrack (e.g. music video, bad lipreading video, literal trailer, etc.)?",
		[	new Choice("original", "Original soundtrack", 0),
			new Choice("new", "New soundtrack", 100),
			new Choice ("NA", "Not-applicable", 0)
		]
	);

	var videoDuration = new Question(
		"duration",
		"Nature of copyrighted work",
		"nature",
		"Was the copyrighted source video a short clip (less than 1 minute) or a longer video?",
		[	new Choice("clip", "Short clip", 100),
			new Choice("longer", "Longer video", 0),
			new Choice("NA", "Not-applicable", 0)
		]
	);

	var videoIncidental = new Question(
		"incidental",
		"Purpose and character of use",
		"purpose",
		"Did you include the copyrighted visual material intentionally, or was it accidentally captured in the background (i.e. TV playing in home video)?",
		[	new Choice("intentional", "Intentionally", 0),
			new Choice("unintentional", "Accidentally", 100)
		]
	);

	var videoContext = new Question(
		"context",
		"Purpose and character of use",
		"purpose",
		"Does your video add new context or meaning to the copyrighted video by placing it in a compilation alongside similar or contrasting clips?",
		[	new Choice("yes", "Yes", 100),
			new Choice("no", "No", 0)
		]
	);

	var videoInteractive = new Question(
		"interactive",
		"Purpose and character of use",
		"purpose",
		"Is the copyright claim against video footage that was created in the process of your interaction with a piece of interactive software (e.g. a videogame playthrough or software tutorial)?",
		[	new Choice("yes", "Yes", 100),
			new Choice("no", "No", 0)
		]
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
		updateScore();
		updateProgress();
		if (calcProgress() !== 100){
			renderNewQuestion();
		} else {
			$('#question-display').toggle('slide');
		}
	});


	//=========== Actions on document ready ==================

	//Master question list
	var questionList = [typeOfClaim, originalType, originalPublished, videoDuration, amount, commercial, commentary, parody, purpose, alter, audioCentrality, audioContext, audioIncidental, audioRecording, lyricVid, videoSoundtrack, videoIncidental, videoContext, videoInteractive, compete, marketHarm, licensing];

	//Question tree arrays
	var audioQuestions = [originalType, originalPublished, amount, commercial, commentary, parody, purpose, alter, audioCentrality, audioContext, audioIncidental, audioRecording, lyricVid, compete, marketHarm, licensing];
	
	var videoQuestions = [originalType, originalPublished, videoDuration, amount, commercial, commentary, parody, purpose, alter, videoSoundtrack, videoIncidental, videoContext, videoInteractive, compete, marketHarm, licensing];


	//Template compilers
	var questionSource = $('#quest-temp').html();
	var questionTemplate = Handlebars.compile(questionSource);
	$('#question-display').html(questionTemplate(typeOfClaim));

	var scoreSource = $('#score-temp').html();
	var scoreTemplate = Handlebars.compile(scoreSource);
	$('#score-display').html(scoreTemplate(score));

	var progSource = $('#prog-temp').html();
	var progTemplate = Handlebars.compile(progSource);
	$('#prog-info').html(progTemplate(progress));


}); //End document ready