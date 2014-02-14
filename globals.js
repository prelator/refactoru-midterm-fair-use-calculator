//========== Global methods =====================
	Array.prototype.findByName = function(name){
		for (var i = 0; i < this.length; i++) {
			if (this[i].name === name) {
				return this[i];
			}
		}
	};

//========== Global functions ==================
	
	//Determine audio or video question tree
	var getQuestionTree = function(){
		if (answerList[0].response === "audio") {
			return audioQuestions;
		}
		if (answerList[0].response === "video") {
			return videoQuestions;
		}
	};

	//Move to the next question
	var renderNewQuestion = function(){
		var questionTree = getQuestionTree();
		questionTree[questionCounter].number = answerList.length+1;
		var newQ = questionTemplate(questionTree[questionCounter]);
		$('#question-display').fadeOut('slow', function(){
			$('#question-display').html(newQ);
			$('#question-display').fadeIn('slow');
			$('#back').show();	
		});
		questionCounter++;
	};

	//Add up all the points in each category from the answerList
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

	//Update the category point totals in the score object
	var updateCategoryTotals = function(){
		score.purposePoints = getCategoryPoints("purpose") || 0;
		score.naturePoints = getCategoryPoints("nature") || 0;
		score.amountPoints = getCategoryPoints("amount") || 0;
		score.marketPoints = getCategoryPoints("market") * 2 || 0;
	};

	//Calculate the total raw score by adding all the category points in the score object
	var calcTotalPoints = function(){
		var pointsArray = [score.purposePoints, score.naturePoints, score.amountPoints, score.marketPoints];		
		var total = pointsArray.reduce(function(a, b){
			return a + b;
		});
		return total;
	};		

	//Updates all points in the score object then re-renders the score display on the DOM
	var updateScore = function(){
		updateCategoryTotals();
		score.totalPoints = calcTotalPoints();
		score.percentage = Math.round(score.totalPoints / 2000 * 100);	
		var scoreBoard = scoreTemplate(score);
		$('#score-display').html(scoreBoard);
	};

	//Calculates current percentage of questions completed
	var calcProgress = function(){
		var tree = getQuestionTree();
		var answered = answerList.length;
		var total = tree.length + 1;
		return Math.round(answered / total * 100);
	};

	//Updates progress object then renders progress display on DOM
	var updateProgress = function(){
		var currentPercent = calcProgress();
		progress.percentage = currentPercent;
		$('#prog-info').html(progTemplate(progress));
	};

	//Go back to previous question and reverse previous question actions
	var goBack = function(){
		if (answerList.length === 1){
			answerList = [];
			questionCounter = 0;
			progress = {percentage: 0};
			$('#prog-info').html(progTemplate(progress));
			var newQ = questionTemplate(questionList[0]);
			$('#question-display').fadeOut('slow', function(){
				$('#question-display').html(newQ);
				$('#question-display').fadeIn('slow');
			});					
		}
		if (answerList.length > 1) {
			var lastIndex = answerList.length-1;
			answerList.splice(lastIndex, 1);
			updateScore();
			updateProgress();
			questionCounter = answerList.length-1;
			renderNewQuestion();
		}		
	};

	//Set the values for the score alert displayed upon completion of the questionnaire
	var setScoreAlert = function(){
		if (score.percentage > 50) {
			scoreAlert.type = "alert-success";
			scoreAlert.greeting = "Congratulations!";
			scoreAlert.message = "Your video probably qualifies as fair use. Disputing the copyright claim against your video is likely justified.";
		} else {
			scoreAlert.type = "alert-danger";
			scoreAlert.greeting = "I'm sorry!";
			scoreAlert.message = "Your video probably does not qualify as fair use. Disputing the copyright claim against your video is not recommended.";
		}
		
		if (score.percentage > 50 && score.percentage < 60) {
			scoreAlert.strength = "Based on your score, your fair use claim is relatively weak.";
		}

		if (score.percentage >= 60 && score.percentage < 70) {
			scoreAlert.strength = "Based on your score, your fair use claim is moderately strong.";
		}

		if (score.percentage >= 70) {
			scoreAlert.strength = "Based on your score, your fair use claim is relatively strong.";
		}
	};
	

//=========== Questionnaire Completion ===================

	//Completion trigger function
	var triggerCompletion = function(){
		setScoreAlert();
		$('#score-alert-module').html(scoreAlertTemplate(scoreAlert));
		$('#question-display').toggle('slide', function(){
			$('#score-alert-module').slideToggle('slow');
		});
		if(score.percentage > 50){
				fairUseSuccess();
			} else {
				fairUseFail();
			}						
	};

	//Actions to be performed if fair use sucessful
	var fairUseSuccess = function(){
		$('#score-display').removeClass('bg-info');
		$('#score-display').addClass('bg-success');
		$('#open-dispute').show();
		setLongStatements();
		setWebformNotice();
		renderAppeal();
		renderDispute();
		renderWebform();
	};

	//Actions to be completed if fair use fails
	var fairUseFail = function(){
		$('#score-display').removeClass('bg-info');
		$('#score-display').addClass('bg-danger');		
	};

//============ Dispute text generation ====================
	
	//Retrieve statements from answerList
	var getLongStatements = function(category){
		var statementList = [];
		for (var i = 0; i < answerList.length; i++) {
			if (answerList[i].category === category && answerList[i].longStatement) {
				statementList.push(answerList[i].longStatement);
			}
		}
		return statementList.join(" ");
	};

	//Set dispute statement strings
	var setLongStatements = function(){
		longStatements.purpose = getLongStatements("purpose");
		longStatements.nature = getLongStatements("nature");
		longStatements.amount = getLongStatements("amount");
		longStatements.market = getLongStatements("market");
	};

	//Save user info from form
	var storeUserInfo = function(){
		user.name = $('#legalName').val();
		user.email = $('#emailAddress').val();
		user.address = $('#address').val();
		user.phone = $('#phone').val();
		user.url = $('#videoURL').val();
		user.rationale = longStatements;
	};

	//Toggle counter-notice form
	var toggleForm = function(){
		$("#counter-notice-form").slideToggle();
		if ( $("#show-form").text()==="Show form" ) {
			$("#show-form").text("Hide form");
		} else {$("#show-form").text("Show form");
			}
	}; 

	//Set text for webform counter-notice
	var setWebformNotice = function(){
		if (answerList[4].response === "no") {
			webformNotice.text = "This video is fair use because it is non-commercial and transformative in nature, uses no more of the original than necessary for its purpose, and does not harm the market for the original work.";
		} else {
			webformNotice.text = "This video is fair use because it is transformative in nature, uses no more of the original than necessary for its purpose, adds new meaning, and does not harm the market for the original work.";
		}
	};

	//Dispute render functions
	var renderAppeal = function(){
		$('#appeal-text').html(appealTemplate(longStatements));
	};

	var renderDispute = function(){
		$('#dispute-text').html(disputeTemplate(longStatements));
	};

	var renderEmailNotice = function(){
		$('#email-notice-display').html(emailNoticeTemplate(user));
	};

	var renderWebform = function(){
		$('#webform-notice-display').html(webformNoticeTemplate(webformNotice));
	};

//============= Template compilers =========================
	//Question module
	var questionSource = $('#quest-temp').html();
	var questionTemplate = Handlebars.compile(questionSource);

	//Scoreboard module
	var scoreSource = $('#score-temp').html();
	var scoreTemplate = Handlebars.compile(scoreSource);

	//Progress bar module
	var progSource = $('#prog-temp').html();
	var progTemplate = Handlebars.compile(progSource);

	//Final score alert
	var scoreAlertSource = $('#score-alert-temp').html();
	var scoreAlertTemplate = Handlebars.compile(scoreAlertSource);

	//Appeal text
	var appealSource = $('#appeal-temp').html();
	var appealTemplate = Handlebars.compile(appealSource);

	//Dispute text
	var disputeSource = $('#dispute-temp').html();
	var disputeTemplate = Handlebars.compile(disputeSource);

	//Email counter-notice text
	var emailNoticeSource = $('#email-notice-temp').html();
	var emailNoticeTemplate = Handlebars.compile(emailNoticeSource);

	//Webform counter-notice text
	var webformNoticeSource = $('#webform-notice-temp').html();
	var webformNoticeTemplate = Handlebars.compile(webformNoticeSource);