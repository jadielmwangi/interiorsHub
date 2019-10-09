// Sending Contact Message Function

$(document).ready(() => { 
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
    var companyName = $("#companyName").val()
    var companyCategory = $("#companyCategory").val()
    var location = $("#companyLocation").val()
    var works;
    var phone = $("#companyPhone").val();

    var listing = new Listing(companyName, companyCategory, location, phone);
    console.log(listing);
     handleFileUploadChange(event);
    

    uploadToFirebase(listing);
    
  })

});

function Listing(name, category, location, phone) {
  this.name = name;
  this.category = category;
  this.location = location;
  this.phone = phone;
}

function uploadToFirebase(listing) { 
  var db = firebase.firestore()
  db.collection("listings").add({
    name: listing.name,
    category: listing.category,
    location: listing.location,
    phone:listing.phone
  })
    .then(function (docRef) { 
 console.log("Document written with ID:",docRef.id);
    })
    .catch(function (error) { 
      console.error("Error adding document:",error)
    })
 
}
var selectedFile;
function handleFileUploadChange(event) {
  selectedFile = event.target.files[0];
  handleFileUpload(selectedFile)
}

function handleFileUpload(selectedFile) {
  const uploadTask =
    storageRef.child(`images/${selectedFile}`).put(selectedFile);
  uploadTask.on('state_changed', (snapshot) => {
    
  }), (error) => {
    console.log(error);
    }, () => {
      console.log(success);
  }
}