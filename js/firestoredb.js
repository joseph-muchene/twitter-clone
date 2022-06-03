// get the user data if registered
firebase.auth().onAuthStateChanged((user) => {
  document.getElementById("sendTweet").onclick = function () {
    const tweet = document.getElementById("tweet").value;
    // console.log(tweet);

    // if (tweet == "") {
    //   return;
    // }

    // send a tweet
    if (user) {
      // Initialize Cloud Firestore and get a reference to the service
      firebase
        .firestore()
        .collection("tweets")
        .add({
          userTweet: tweet,
          userId: user.uid,
          timeStamp: new Date(),
          docId: sendTweet.id,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
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
      let items = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        // console.log(data);
        items.push({ ...data, id: doc.id });
      });
      document.getElementById("twiMiddle").innerHTML = items
        .map(
          (data) =>
            `         
        <div class="page-content"  id="pageContent">
              <span> ${data.timeStamp.toDate().toDateString()}</span>
                <h3>
             ${data.userId}
                   .<span style="margin-left: 10px">
                   <a href="">see more</a></span>
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
          <hr>
`
        )
        .join(" ");
    });
});

// get the user

function retrieval(id) {
  let items = [];
  firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        return items.push(doc.data());
      });
      let x = items.filter((data) => data.userId == id)[0].userName;
      return x;
    })

    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
