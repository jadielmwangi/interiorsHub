// Sending Contact Message Function
$(document).ready(() => { 
    //open modal on clicking upload
    alert(1)
    $("#uploadTrigger").click(() => {
        $("#uploadModal").modal("show")
    })
    $("form").submit(function(event){
        eventPreventDefault();
        var name = $("#name").val();
          alert("Hello "  + name + ",Thanks for reaching to us. We have received your message.");
    });

});