//============= JQUERY DOCUMENT READY =================
$(document).ready(function(){

  //Activate Bootstrap alert feature
  $('.alert').alert();  
  
}); //End document ready

//=================== BEGIN ANGULAR APP =========================

//Angular app declaration
var fairuseApp = angular.module('fairuseApp', []);

//Main app controller
fairuseApp.controller('appCtrl', ['$scope', 'questionSvc', 'scoreSvc', function ($scope, questionSvc, scoreSvc) {

//================ $SCOPE OBJECT INITIALIZATIONS =========================  
  
  //Initialize progress bar
  $scope.progress = scoreSvc.getCurrentProgress();

  //Initialize score
  $scope.score = scoreSvc.getCurrentScore();

  //Initialize scoreAlert
  $scope.scoreAlert = scoreSvc.getScoreAlert();

  //Initialize question display
  $scope.question = questionSvc.getCurrentQuestion();

  //Initialize long statements
  $scope.longStatements = questionSvc.getCurrentLongStatements();

  //Initialize webform notice
  $scope.webformNotice = questionSvc.getCurrentWebformNotice();

  //Initialize user info
  $scope.user = {
    name: "",
    email: "",
    address: "",
    phone: "",
    url: "",
    rationale: {}
  };

//============== EVENT HANDLERS AND FUNCTIONS ================================

  //Click handler for start questionnaire button
  $scope.startQuestions = function(){
    if ($('#agree-terms').prop("checked")) {
      $('#intro').slideToggle("slow", function(){
        $('#intro').remove();
        $('#questionnaire').slideToggle("slow");    
      });     
    } else {
      $('#terms-warning').show();
    }
  };

//=========== Question display module ==================

  //Click handler for question answer buttons
  $scope.answerClick = function(choice, qName) {
    questionSvc.saveAnswer(qName, choice);
    $scope.score = scoreSvc.updateScore();
    $scope.progress = scoreSvc.updateProgress();
    if (scoreSvc.calcProgress() !== 100){
      $scope.question = questionSvc.updateQuestion();
      backButtonVisibility(); 
    } else {
      triggerCompletion();
    }
  };

  //Go back to previous question and reverse previous question actions
  $scope.goBack = function(){
    var answerList = questionSvc.getAnswerList();
    if (answerList.length === 1){
      questionSvc.resetDefault();
      scoreSvc.resetDefault();
      $scope.question = questionSvc.getCurrentQuestion();
      $scope.progress = scoreSvc.getCurrentProgress();
      $scope.score = scoreSvc.getCurrentScore();    
      backButtonVisibility();      
    }
    if (answerList.length > 1) {
      questionSvc.goBackOne();      
      $scope.score = scoreSvc.updateScore();
      $scope.progress = scoreSvc.updateProgress();
      $scope.question = questionSvc.updateQuestion();
      backButtonVisibility(); 
    }   
  };

  //Set back button visibility on question display
  var backButtonVisibility = function() {
    var answerList = questionSvc.getAnswerList();
    if (answerList.length > 0) {
      $('#back').show(); 
    } else {
      $('#back').hide();
    }
  };

//=========== Questionnaire Completion ===================

  //Completion trigger function
  var triggerCompletion = function(){
    $scope.scoreAlert = scoreSvc.setScoreAlert();
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
    $scope.longStatements = questionSvc.setLongStatements();
    $scope.webformNotice = questionSvc.setWebformNotice();
    $('#score-display').removeClass('bg-info');
    $('#score-display').addClass('bg-success');
    $('#open-dispute').show();    
  };

  //Actions to be completed if fair use fails
  var fairUseFail = function(){
    $('#score-display').removeClass('bg-info');
    $('#score-display').addClass('bg-danger');    
  };

//============ Counter-notice Generation Module ===================

  //Content ID dispute tab
  $('#dispute a').click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

  //Appeal tab
  $('#appeal a').click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

  //Webform counter-notice tab
  $('#web-notice a').click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

  //Email counter-notice tab
  $('#email-notice a').click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

  //Toggle counter-notice form
  $scope.toggleForm = function(){
    $("#counter-notice-form").slideToggle();
    if ( $("#show-form").text()==="Show form" ) {
      $("#show-form").text("Hide form");
    } else {
      $("#show-form").text("Show form");
    }
  };  

  //User form submission handler
  $scope.noticeFormSubmit = function() {
    if ($scope.userForm !== undefined){
      $scope.user.name = $scope.userForm.legalName;
      $scope.user.email = $scope.userForm.emailAddress;
      $scope.user.address = $scope.userForm.address;
      $scope.user.phone = $scope.userForm.phone;
      $scope.user.url = $scope.userForm.videoURL;
    }
    $scope.toggleForm();
    $('#email-notice-display').fadeIn('slow');
  };

}]); //=================== END ANGULAR APP===========================
