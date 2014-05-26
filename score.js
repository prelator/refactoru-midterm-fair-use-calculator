fairuseApp.factory('scoreSvc', ['questionSvc', function (questionSvc) {
  

//============= MAIN VARIABLES =========================
  
  //Default progress
  var currentProgress = 0;

  //Default score
  var currentScore = {
    percentage: 0,
    totalPoints: 0,
    purposePoints: 0,
    naturePoints: 0,
    amountPoints: 0,
    marketPoints: 0
  };

  //Default final score alert
  var scoreAlert = {
    type: "",
    greeting: "",
    message: "",
    strength: ""
  };

//====================== Main Functions ============================

  //Getters

  var getCurrentProgress = function() {
    return currentProgress;
  };

  var getCurrentScore = function() {
    return currentScore;
  };

  var getScoreAlert = function(){
    return scoreAlert;
  };

  //Add up all the points in each category from the answerList
  var getCategoryPoints = function(category){
    var categoryPoints = [];
    var answerList = questionSvc.getAnswerList();
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
    var tree = questionSvc.getQuestionTree();
    var answerList = questionSvc.getAnswerList();
    var answered = answerList.length;
    var total = tree.length + 1;
    return Math.round(answered / total * 100);
  };

  //Calculate the total raw score by adding all the category points in the score object
  var calcTotalPoints = function(){
    var pointsArray = [currentScore.purposePoints, currentScore.naturePoints, currentScore.amountPoints, currentScore.marketPoints];    
    var total = pointsArray.reduce(function(a, b){
      return a + b;
    });
    return total;
  };    

  //Updates all points in the currentScore object then re-renders the score display on the DOM
  var updateScore = function(){
    currentScore.purposePoints = getCategoryPoints("purpose") || 0;
    currentScore.naturePoints = getCategoryPoints("nature") || 0;
    currentScore.amountPoints = getCategoryPoints("amount") || 0;
    currentScore.marketPoints = getCategoryPoints("market") * 2 || 0;
    currentScore.totalPoints = calcTotalPoints() || 0;
    currentScore.percentage = Math.round(currentScore.totalPoints / 2000 * 100) || 0;
    return currentScore;
  };

  //Recalculates, updates, and returns value of currentProgress variable 
  var updateProgress = function() {
    currentProgress = calcProgress();
    return currentProgress;
  };

  //Resets currentProgress and currentScore variables to defaults
  var resetDefault = function() {
    currentProgress = 0;
    currentScore = {
      percentage: 0,
      totalPoints: 0,
      purposePoints: 0,
      naturePoints: 0,
      amountPoints: 0,
      marketPoints: 0
    };
  };

  //Set the values for the score alert displayed upon completion of the questionnaire
  var setScoreAlert = function(){
    if (currentScore.percentage > 50) {
      scoreAlert.type = "alert-success";
      scoreAlert.greeting = "Congratulations!";
      scoreAlert.message = "Your video probably qualifies as fair use. Disputing the copyright claim against your video is likely justified.";
    } else {
      scoreAlert.type = "alert-danger";
      scoreAlert.greeting = "I'm sorry!";
      scoreAlert.message = "Your video probably does not qualify as fair use. Disputing the copyright claim against your video is not recommended.";
    }
    
    if (currentScore.percentage > 50 && currentScore.percentage < 60) {
      scoreAlert.strength = "Based on your score, your fair use claim is relatively weak.";
    }

    if (currentScore.percentage >= 60 && currentScore.percentage < 70) {
      scoreAlert.strength = "Based on your score, your fair use claim is moderately strong.";
    }

    if (currentScore.percentage >= 70) {
      scoreAlert.strength = "Based on your score, your fair use claim is relatively strong.";
    }
    return scoreAlert;
  };

  //========== SERVICE EXPORTS OBJECT ==========================
  return {

    //Getters
    getCurrentProgress: getCurrentProgress,
    getCurrentScore: getCurrentScore,
    getCategoryPoints: getCategoryPoints,
    getScoreAlert: getScoreAlert,

    //Setters
    calcProgress: calcProgress,
    calcTotalPoints: calcTotalPoints,
    updateScore: updateScore,
    updateProgress: updateProgress,
    resetDefault: resetDefault,
    setScoreAlert: setScoreAlert

  };

}]);