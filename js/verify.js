//   check if user is signed
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "/";
  }
});
