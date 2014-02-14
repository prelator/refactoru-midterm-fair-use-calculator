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
	});

	//Questionnaire back button
	$(document).on('click', '.back-question', function() {
		goBack();
	});

//========= Dispute generator tab click handlers ==============
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

	//Email counter-notice form submit
	$('#submit-form').click(function(e){
		e.preventDefault();		
		storeUserInfo();
		renderEmailNotice();
		toggleForm();
		$('#email-notice-display').fadeIn('slow');
	});

	//Toggle form button
	$("#show-form").click(function(){
		toggleForm();
	});

	//=========== Actions on document ready ==================	

	//Render initial template values
	$('#question-display').html(questionTemplate(typeOfClaim));

	$('#score-display').html(scoreTemplate(score));

	$('#prog-info').html(progTemplate(progress));

}); //End document ready