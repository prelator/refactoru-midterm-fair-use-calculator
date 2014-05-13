//============= Global Objects / Arrays ====================
  
  //Answerlist array instantiation
  var answerList = [];

  //Question counter variable
  var questionCounter = 0;


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

  //Toggle counter-notice form
  var toggleForm = function(){
    $("#counter-notice-form").slideToggle();
    if ( $("#show-form").text()==="Show form" ) {
      $("#show-form").text("Hide form");
    } else {$("#show-form").text("Show form");
      }
    };  

  //Show email counter-notice
  var showEmailNotice = function() {
    $('#email-notice-display').fadeIn('slow');
  };
