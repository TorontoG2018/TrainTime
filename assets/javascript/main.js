


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDy56k1ygh_uiqTZvbd0T7KRK7lxo9F6ts",
  authDomain: "traintime-d4cae.firebaseapp.com",
  databaseURL: "https://traintime-d4cae.firebaseio.com",
  projectId: "traintime-d4cae",
  storageBucket: "traintime-d4cae.appspot.com",
  messagingSenderId: "749979706691"
};
firebase.initializeApp(config);



// Create a variable to reference the database
var database = firebase.database();


// Capture Button Click
$("#add-train").on("click", function (event) {
  // Don't refresh the page!
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  var tName = $("#name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tFirsttime = $("#firstTime-input").val().trim();
  var tFrequency = $("#Frequency-input").val().trim();


  // Initial Values

  var newT = {
    name: tName,
    destination: tDestination,
    firsttime: tFirsttime,
    frequency: tFrequency
  };



  database.ref().push(newT);

  // Logs everything to console
  console.log(newT.name);
  console.log(newT.destination);
  console.log(newT.firsttime);
  console.log(newT.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#Frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFirsttime = childSnapshot.val().firsttime;
  var tFrequency = childSnapshot.val().frequency;

  var firstTimeConverted = moment(tFirsttime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);
  var tMinutesTillTrain = tFrequency - tRemainder;
  var next = moment().add(tMinutesTillTrain, "minutes");
  var away = next-moment(currentTime).format("hh:mm");

  // Log everything that's coming out of snapshot

  console.log(tName);
  console.log(tDestination);
  console.log(tFirsttime);
  console.log(tFrequency);



 
  

  console.log(away);


  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(next),
    $("<td>").text(away)
  );

  $("#train-table").append(newRow);
});



   
  










