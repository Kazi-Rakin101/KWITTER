  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDpiQosk80TGGHdqasGIV61WVqITSvdGFo",
    authDomain: "kwitter-7b39c.firebaseapp.com",
    databaseURL: "https://kwitter-7b39c-default-rtdb.firebaseio.com",
    projectId: "kwitter-7b39c",
    storageBucket: "kwitter-7b39c.appspot.com",
    messagingSenderId: "554819466565",
    appId: "1:554819466565:web:ebdad5b84d02fea3bffa2c",
    measurementId: "G-CH5Q73284Q"
  };
  user_name=localStorage.getItem("room_name");
  user_name=localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML="Welcome"+user_name+"!";

  function send()
{
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}	


  function addRoom()
  {
        room_name=document.getElementById("room_name").value;
        firebase.database().ref("/").child(room_name).update({
              purpose: "adding room name"
        });
        localStorage.setItem("room_name",room_name);
        window.location="kwitter_room.html";
  }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       room_names = childKey;
      console.log("room_name-"+room_name);
      row="<div class='room_name' id="+room_name+"onclick='redirectToRoomName(this.id)'>#"+room_name+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      });});}

getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";

}
function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="kwitter.html";
}

function updateLike(message_id)
{
      console.log("click on like button"+ message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like:update_likes
      });
}
