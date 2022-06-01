// get the user data if registered
firebase.auth().onAuthStateChanged((user) => {
  document.getElementById("sendTweet").onclick = function () {
    console.log("hello");
    const tweet = document.getElementById("tweet").value;

    if (tweet == "") {
      return;
    }

    // send a tweet
    if (user) {
      // Initialize Cloud Firestore and get a reference to the service
      console.log(user);
      const sendTweet = firebase.firestore().collection("tweets").doc();
      sendTweet
        .set({
          userTweet: tweet,
          userId: user.uid,
          timeStamp: new Date(),
          docId: sendTweet.id,
        })
        .then(() => {
          window.location.reload();
        });
    }
  };
});
