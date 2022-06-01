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

// populate the tweets to the homepage

window.addEventListener("DOMContentLoaded", (event) => {
  // init firestore
  const db = firebase.firestore();
  db.collection("tweets")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = [doc.data()];
        // console.log(data);
        Object.keys(data).forEach((key) => {
          var value = data[key];
          // handle data of element, like 'desc'
           document.getElementById("twiMiddle").innerHTML = `

     <div class="page-content">
            <h3>
              ${data.userId} .<span style="margin-left: 10px"
                ><a href="">see more</a></span
              >
            </h3>

            <div class="content">
              <div class="content-top">
                <div class="heading">
                  <img src="../images/LOGO-TWI.jpg" alt="" srcset="" />
                  <h3>Troll Football @TrollFootball. <span>17h</span></h3>
                </div>

                <div class="desc">
                  <p>
                    ${data.userTweet}
                  </p>
                </div>
                <!-- <img src="../images/FT4GcTTUcAwcKbA.jpg" alt="" srcset="" /> -->
              </div>
            </div>
          </div>
`;
        });
       
      });
    });
});
