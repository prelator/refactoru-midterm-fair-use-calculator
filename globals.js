//============= Global Objects / Arrays ====================
  
  //Answerlist array instantiation
  var answerList = [];

  //Question counter variable
  var questionCounter = 0;

  //Dispute statements object instantiation
  var longStatements = {
    purpose: "",
    nature: "",
    amount: "",
    market: ""
  };

  //User info object instantiation
  var user = {
    name: "",
    email: "",
    address: "",
    phone: "",
    url: "",
    rationale: {}
  };

  //Webform notice text object instantiation
  var webformNotice = {
    text: ""
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


	//Calculates current percentage of questions completed
	var calcProgress = function(){
		var tree = getQuestionTree();
		var answered = answerList.length;
		var total = tree.length + 1;
		return Math.round(answered / total * 100);
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