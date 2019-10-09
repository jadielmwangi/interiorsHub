// Sending Contact Message Function

$(document).ready(() => { 
  $(".myalert").hide() 
    //open modal on clicking upload
      $("#uploadTrigger").click(() => {
        $("#uploadModal").modal("show")
    })
    // $("form").submit(function(event){
    //     eventPreventDefault();
    //     var name = $("#name").val();
    //       alert("Hello "  + name + ",Thanks for reaching to us. We have received your message.");
    // });
  
  $("form").submit(() => {
    event.preventDefault()
    $("#insubmitButtonput").prop('disabled', true);
    handleFileUpload();   
   
  })

});

function Listing(name, category, location, works,phone) {
  this.name = name;
  this.category = category;
  this.location = location;
  this.works = works;
  this.phone = phone;
}

function uploadToFirebase(listing) { 
  var db = firebase.firestore()
  db.collection("listings").add({
    name: listing.name,
    category: listing.category,
    location: listing.location,
    works: listing.works,
    phone:listing.phone
  })
    .then(function (docRef) { 
 console.log("Document written with ID:",docRef.id);
    })
    .catch(function (error) { 
      console.error("Error adding document:",error)
    })
  $("#uploadModal").modal("hide")
  $(".myalert").show()            
 
}
// var selectedFile;
// function handleFileUploadChange() {
//   // selectedFile = $("#companyWorks")[0].files[0];
//   handleFileUpload(selectedFile)
// }

function handleFileUpload() {
  var companyName = $("#companyName").val()
  var companyCategory = $("#companyCategory").val()
  var location = $("#companyLocation").val()
 
  var phone = $("#companyPhone").val();

  var selectedFile = $("#companyWorks")[0].files[0];
  var url;
  console.log(selectedFile)
   var uploadTask =
     storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
    uploadTask.on('state_changed', function(snapshot){
    console.log("Uploaded a blob or");
    console.log(snapshot.task);   
        
  }, (error) => {
    console.log(error);
      }, function () {
     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
       console.log('File available at', downloadURL);
       var listing = new Listing(companyName, companyCategory, location, downloadURL, phone);
       console.log(listing);   
      uploadToFirebase(listing) 
       
     }).then((url) => {     
     
       
      })
       
      })
  
 
  // uploadToFirebase(listing)
}