// Sending Contact Message Function


$(document).ready(function(){
    $("form").submit(function(event){
        eventPreventDefault();
        var name = $("#name").val();
          alert("Hello "  + name + ",Thanks for reaching to us. We have received your message.");
    });

});