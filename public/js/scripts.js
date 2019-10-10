// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRwfPcjp7_E1d4CRyjJ5FaO79NHH2v3TM",
  authDomain: "chat-165ca.firebaseapp.com",
  databaseURL: "https://chat-165ca.firebaseio.com",
  projectId: "chat-165ca",
  storageBucket: "chat-165ca.appspot.com",
  messagingSenderId: "396002922263",
  appId: "1:396002922263:web:c6889fd02506e7abcff152",
  measurementId: "G-ERM4YTXBLP"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageService = firebase.storage();
const storageRef = storageService.ref();

$(document).ready(() => {
  //call function to pull data from server and fill the cards
  populateUI();

  //hide success alert
  $(".myalert").hide();

  //open modal on clicking upload menu option
  $("#uploadTrigger").click(() => {
    $("#uploadModal").modal("show");
  });

  //attach listener when upload form is submitted
  $("form#uploadForm").submit(() => {
    event.preventDefault();
    handleFileUpload();
  });

  //attach listener when contact form is submitted
  $("form#contactForm").submit(() => {
    event.preventDefault();
    alert("We have received your message");
  });
});

//listings constructor
function Listing(name, category, location, works, phone) {
  this.name = name;
  this.category = category;
  this.location = location;
  this.works = works;
  this.phone = phone;
}

//upload Listing object
function uploadToFirebase(listing) {
  var db = firebase.firestore();
  db.collection("listings")
    .add({
      name: listing.name,
      category: listing.category,
      location: listing.location,
      works: listing.works,
      phone: listing.phone
    })
    .then(function(docRef) {
      console.log("Document written with ID:", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document:", error);
    });

  //reset input fields after uploading
  $("#uploadModal").modal("hide");
  $("#companyName").val(" ");
  $("#companyCategory").val(" ");
  $("#companyLocation").val(" ");
  $("#companyPhone").val(" ");
  $("#companyWorks").val("");
  $(".myalert").show();
}

//obtain data from form and create a Listing object from it
function handleFileUpload() {
  var companyName = $("#companyName").val();
  var companyCategory = $("#companyCategory").val();
  var location = $("#companyLocation").val();
  var phone = $("#companyPhone").val();
  var selectedFile = $("#companyWorks")[0].files[0];

  //upload image and obtai downloadURL to be stored in firestore
  var uploadTask = storageRef
    .child(`images/${selectedFile.name}`)
    .put(selectedFile);
  uploadTask.on(
    "state_changed",
    function(snapshot) {},
    error => {
      console.log(error);
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        var listing = new Listing(
          companyName,
          companyCategory,
          location,
          downloadURL,
          phone
        );
        uploadToFirebase(listing);
      });
    }
  );
}

//function to obtain server data and populate cards
function populateUI() {
  const ref = db.collection("listings");
  ref.get().then(function(querySnapshot) {
    querySnapshot.docs.forEach(function(doc) {
      var listingFromDb = new Listing(
        doc.data()["name"],
        doc.data()["category"],
        doc.data()["location"],
        doc.data()["works"],
        doc.data()["phone"]
      );
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
    });
  });
}
