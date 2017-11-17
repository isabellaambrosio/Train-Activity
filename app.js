$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBBBXVnOGQTcbTgg9UqUX9Y2JMkTIY71Sc",
        authDomain: "train-activity-9001d.firebaseapp.com",
        databaseURL: "https://train-activity-9001d.firebaseio.com",
        projectId: "train-activity-9001d",
        storageBucket: "train-activity-9001d.appspot.com",
        messagingSenderId: "229260730017"
    };
    firebase.initializeApp(config);


    var db = firebase.database();


    //   variables
    // ================================================================================

    var trainName;
    var destination;
    var frequency;
    var nextArrival;
    var minutesAwayd;

    var firstTrain;




    // =============================================================================

    // Submit button function

    $("#submitButton").on("click", function(event) {
        event.preventDefault();


        // get new inputs
        trainName = $("#inputTrainName").val().trim();
        destination = $("#inputDestination").val().trim();
        firstTrain = parseInt($("#inputFirstTrain").val().trim());
        frequency = parseInt($("#inputFrequency").val().trim());


        //   Push information into Firebase
        db.ref().push({

            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,

            dateAdded: firebase.database.ServerValue.TIMESTAMP

        }); // end of push information


        //   console log results
        console.log("Push train name: " + trainName);
        console.log("Push train destination: " + destination);
        console.log("Push first train: " + firstTrain);
        console.log("Push frequency: " + frequency);





        // Clears all of the text-boxes
        $("#inputTrainName").val("");
        $("#inputDestination").val("");
        $("#inputFirstTrain").val("");
        $("#inputFrequency").val("");

    }); // end of on click function


    // ============================================================================
    // Getting changes from firebase

    db.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());


        // Console.log each change from firebase
        var trainName = childSnapshot.val().trainName;
        console.log("train name: " + trainName);

        var destination = childSnapshot.val().destination;
        console.log("Destination: " + destination);

        var firstTrain = childSnapshot.val().firstTrain;
        console.log("First Train: " + firstTrain);

        var frequency = childSnapshot.val().frequency;
        console.log("Frequency: " + frequency);

        console.log("______________________");


        //Calculations

        // formating firstTrain time with moment
        var firstTrainFormat = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log("First train Formatated: " + firstTrainFormat);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTrainFormat), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Next Train!!!!!!!!!
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train!!!!!!
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        // Write new information to html


        // New row to insert new input
        var newRow = $('<tr class="newRowClass">');

        // appending into new row and creating new columns for each input
        newRow.append($('<td>').text(trainName));
        newRow.append($('<td>').text(destination));

        // newRow.append($('<td>').text(firstTrain));
        newRow.append($('<td>').text(frequency));


        // Write new information to html


        newRow.append($('<td>').text(moment(nextTrain).format("HH:mm")));


        newRow.append($('<td>').text(tMinutesTillTrain));

        // append new row into html
        $(".table").append(newRow);





        // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        // console.log(firstTimeConverted);





        // console.log("train name: " + trainName);
        // console.log("train destination: " + destination);
        // console.log("first train: " + firstTrain);
        // console.log("frequency: " + frequency);

        // change html

        // $(".table").text(snapshot.val());

        // $(".newRowClass").append(snapshot.val().trainName + snapshot.val().destination + snapshot.val().frequency);

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });







}); //end of document ready
