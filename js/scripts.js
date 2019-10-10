// Sending Contact Message Function


$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        var name = $("#name").val();
          alert("Hello "  + name + ",We have Received you message,Thanks for reaching to you.We will get back to you shortly..");
    });

});