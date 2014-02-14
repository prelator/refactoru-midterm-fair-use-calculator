$(document).ready(function(){
	//========== Bootstrap Options ==================
	$('.alert').alert();	

	//=============== Click handlers =====================
	
	//Start questionnaire button
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

	//Question choice buttons
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
			triggerCompletion();
		}
		console.dir(answerList);
	});

	//Questionnaire back button
	$(document).on('click', '.back-question', function() {
		goBack();
	});

	//Dispute generator tab click handlers
	$('#dispute a').click(function(e){
		e.preventDefault();
		$(this).tab('show');
	});

	$('#appeal a').click(function(e){
		e.preventDefault();
		$(this).tab('show');
	});

	$('#web-notice a').click(function(e){
		e.preventDefault();
		$(this).tab('show');
	});

	$('#email-notice a').click(function(e){
		e.preventDefault();
		$(this).tab('show');
	});


	//Email counter-notice click hanlders
	$('#submit-form').click(function(e){
		e.preventDefault();		
		storeUserInfo();
		renderEmailNotice();
		toggleForm();
		$('#email-notice-display').slideToggle();
	});

	$("#show-form").click(function(){
		toggleForm();
	});

	//=========== Actions on document ready ==================	

	//Render initial template values
	$('#question-display').html(questionTemplate(typeOfClaim));

	$('#score-display').html(scoreTemplate(score));

	$('#prog-info').html(progTemplate(progress));


}); //End document ready