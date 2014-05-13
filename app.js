$(document).ready(function(){
//========== Bootstrap Options ==================
  $('.alert').alert();  

//=============== Main app click handlers =====================
  
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

  //Toggle form button
  $("#show-form").click(function(){
    toggleForm();
  });

 }); //End document ready