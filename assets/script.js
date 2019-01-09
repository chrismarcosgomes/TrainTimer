var config = {
  apiKey: "AIzaSyAv6wrCQLbMWkigRY1OUErqQQz7a-kCJp4",
  authDomain: "trainhw-5f3d1.firebaseapp.com",
  databaseURL: "https://trainhw-5f3d1.firebaseio.com",
  projectId: "trainhw-5f3d1",
  storageBucket: "",
  messagingSenderId: "865446684184"
};
firebase.initializeApp(config);

var database = firebase.database();
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var name = $("#train-name-input").val().trim();
  var location = $("#destination-input").val().trim();
  var militaryTime = $("#trainTime-input").val().trim();
  var frequency = $("#minutes-input").val().trim();


  var hold = {
    train: name,
    destination: location,
    time: militaryTime,
    minutes: frequency,

  };
  database.ref().push(hold)
  $("#train-name-input").val("");
  $("#desination-input").val("");
  $("#trainTime-input").val("");
  $("#minutes-input").val("");
});

database.ref().on("child_added", function (childSnap) {
  var name = childSnap.val().train;
  var location = childSnap.val().destination;
  var militaryTime = childSnap.val().time;
  var frequency = childSnap.val().minutes;
  var tTimeArr = militaryTime.split(":")
  var trainTime = moment().hours(tTimeArr[0]).minutes(tTimeArr[1]);
  var diffTime = moment().diff(trainTime, "minutes");
  //console.log(diffTime)
  var tRemainer = diffTime % frequency;
  // console.log(tRemainer)
  var tMinutes = frequency - tRemainer;
  console.log(tMinutes)
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  console.log(tArrival)


  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(location),
      $("<td>").text(frequency),

    //$("<td>").text(militaryTime),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes),


  )
  $("#train-table").append(newRow)

})