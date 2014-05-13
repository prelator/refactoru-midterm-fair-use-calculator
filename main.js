var fairuseApp = angular.module('fairuseApp', []);

fairuseApp.controller('questionCtrl', ['$scope', function ($scope) {
  

//================= Question module ==================
  $scope.question = typeOfClaim;

  $scope.answerClick = function(choice, qName) {
    var myQuestion = questionList.findByName(qName);
    myQuestion.saveResponse(choice);
    updateScore();
    updateProgress();
    if (calcProgress() !== 100){
      renderNewQuestion();
    } else {
      triggerCompletion();
    }
  };

  var renderNewQuestion = function(){
    var questionTree = getQuestionTree();
    questionTree[questionCounter].number = answerList.length+1;
    var newQ = questionTree[questionCounter];
    $scope.question = newQ;
    $('#back').show();  
    questionCounter++;
  };

  //Go back to previous question and reverse previous question actions
  $scope.goBack = function(){
    if (answerList.length === 1){
      answerList = [];
      questionCounter = 0;
      $scope.progress = 0;    
      $scope.question = typeOfClaim;
      $('#back').hide();        
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

//=============== Progress Module ===========================

  //Initialize progress bar
  $scope.progress = 0;

  //Updates progress object then renders progress display on DOM
  var updateProgress = function(){
    $scope.progress = calcProgress();
  };

//================ Scoreboard Module =========================

  //Initialize score
  $scope.score = {
    percentage: 0,
    totalPoints: 0,
    purposePoints: 0,
    naturePoints: 0,
    amountPoints: 0,
    marketPoints: 0
  };

  //Calculate the total raw score by adding all the category points in the score object
  var calcTotalPoints = function(){
    var pointsArray = [$scope.score.purposePoints, $scope.score.naturePoints, $scope.score.amountPoints, $scope.score.marketPoints];    
    var total = pointsArray.reduce(function(a, b){
      return a + b;
    });
    return total;
  };    

  //Updates all points in the score object then re-renders the score display on the DOM
  var updateScore = function(){
    $scope.score.purposePoints = getCategoryPoints("purpose") || 0;
    $scope.score.naturePoints = getCategoryPoints("nature") || 0;
    $scope.score.amountPoints = getCategoryPoints("amount") || 0;
    $scope.score.marketPoints = getCategoryPoints("market") * 2 || 0;
    $scope.score.totalPoints = calcTotalPoints();
    $scope.score.percentage = Math.round($scope.score.totalPoints / 2000 * 100);  
  };


//=============== Score Alert Module ====================

  //Default final score alert instantiation
  $scope.scoreAlert = {
    type: "",
    greeting: "",
    message: "",
    strength: ""
  };

  //Set the values for the score alert displayed upon completion of the questionnaire
  var setScoreAlert = function(){
    if ($scope.score.percentage > 50) {
      $scope.scoreAlert.type = "alert-success";
      $scope.scoreAlert.greeting = "Congratulations!";
      $scope.scoreAlert.message = "Your video probably qualifies as fair use. Disputing the copyright claim against your video is likely justified.";
    } else {
      $scope.scoreAlert.type = "alert-danger";
      $scope.scoreAlert.greeting = "I'm sorry!";
      $scope.scoreAlert.message = "Your video probably does not qualify as fair use. Disputing the copyright claim against your video is not recommended.";
    }
    
    if ($scope.score.percentage > 50 && $scope.score.percentage < 60) {
      $scope.scoreAlert.strength = "Based on your score, your fair use claim is relatively weak.";
    }

    if ($scope.score.percentage >= 60 && $scope.score.percentage < 70) {
      $scope.scoreAlert.strength = "Based on your score, your fair use claim is moderately strong.";
    }

    if ($scope.score.percentage >= 70) {
      $scope.scoreAlert.strength = "Based on your score, your fair use claim is relatively strong.";
    }
  };
  
  //=========== Questionnaire Completion ===================

  //Completion trigger function
  var triggerCompletion = function(){
    setScoreAlert();
    $('#question-display').toggle('slide', function(){
      $('#score-alert-module').slideToggle('slow');
    });
    if($scope.score.percentage > 50){
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



}]);