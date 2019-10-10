$(document).ready(() => { 
  populateUI()
  $(".myalert").hide() 
    //open modal on clicking upload
      $("#uploadTrigger").click(() => {
        $("#uploadModal").modal("show")
    })
    
  $("form#uploadForm").submit(() => {
    event.preventDefault();
    $("#insubmitButtonput").prop("disabled", true);
    handleFileUpload();
   });

  $("form#contactForm").submit(() => {
    event.preventDefault();
    alert("We have received your message")
 
  });

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
     $("#companyName").val(" ");
     $("#companyCategory").val(" ");
   $("#companyLocation").val(" ");
     $("#companyPhone").val(" ");
  $("#companyWorks").val("");
  $(".myalert").show()  

 
}

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
  
 
  }

function populateUI() {
  const ref = db.collection("listings")
  ref.get().then(function (querySnapshot) { 
    querySnapshot.docs.forEach(function (doc) {
      var listingFromDb = new Listing(doc.data()["name"], doc.data()["category"], doc.data()["location"], doc.data()["works"], doc.data()["phone"])
      console.log(doc.data());
      $("#listing-row").append(`
         <div class="card text-center mt-2" style="width:22rem">
                <img src="${listingFromDb.works}"
                    class="card-img-top" height="250rem">
                <div class="card-body">
                    <img src="./images/folder.png" id="folder-icon" alt="Folder Icon">
                    <p id="category">${listingFromDb.category}</p>
                    <br>
                    <hr>
                    <div class="card-text d-flex flex-column">
                        <div>
                            <i class="fa fa-location-arrow text-muted mt-1 myicons" aria-hidden="true"></i>
                            <span class="text-muted location">${listingFromDb.location}</span>
                        </div>
                        <div class="mt-2">
                            <i class="fa fa-phone text-muted myicons" aria-hidden="true"></i>
                            <small class="text-muted phone">${listingFromDb.phone}</small>
                        </div>
                        <div class="card-img-overlay text-white ml-auto">
                            <p class="text-bold">${listingFromDb.name}</p>
                        </div>
                    </div>
                </div>
            </div>

      `);
    })
  })
}