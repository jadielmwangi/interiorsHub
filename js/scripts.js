// Sending Contact Message Function
$(document).ready(() => { 
    //open modal on clicking upload
      $("#uploadTrigger").click(() => {
        $("#uploadModal").modal("show")
    })
    $("form").submit(function(event){
        event.preventDefault();
        var name = $("#name").val();
          alert("Hello "  + name + ",We have Received you message,Thanks for reaching to you.We will get back to you shortly..");
    });

});