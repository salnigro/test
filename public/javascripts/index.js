function onSignIn(googleUser) {
  var authResponse = googleUser.getAuthResponse();
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('idtoken = ', authResponse.id_token);
  captureUser(authResponse.id_token);
  getTodoList(authResponse.id_token);
  registerClickHandler(authResponse.id_token);

}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function () {
      console.log('User signed out.');
      document.getElementById('list-todo').innerHTML = '';
    });
}

function captureUser(idtoken) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/idtoken');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Bearer ' + idtoken);
  xhr.onload = function() {
    console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send('idtoken=' + idtoken);
}

function getTodoList(idtoken) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/todo');
  xhr.setRequestHeader('Authorization', 'Bearer ' + idtoken);
  xhr.onload = function() {
      if(xhr.status === 200) {
          console.log('got');
          var query = JSON.parse(xhr.responseText);
          console.log(query.results);
          
          for(var i = 0; i < query.results.length; i++) {
              var todo = query.results[i].todo;
              var stamp = query.results[i].stamp;  
              var todoList = document.getElementById('list-todo');
              var listItem = document.createElement('li');
              var listText = document.createTextNode(stamp + ': ' + todo);
              listItem.appendChild(listText);
              todoList.appendChild(listItem);
          }
      }
  }
  xhr.send();
}

function registerClickHandler(idtoken) {

  document.getElementById('btn-todo-submit').onclick = function() {

    console.log(gapi.auth2.getAuthInstance());

    var todo = document.getElementById('txt-todo').value;

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/idtoken');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.setRequestHeader('Authorization', 'Bearer ' + idtoken);

    xhr.onload = function() {

        if(xhr.status === 200) {

            var todoList = document.getElementById('list-todo');

            var listItem = document.createElement('li');

            var listText = document.createTextNode(todo);

            listItem.appendChild(listText);

            todoList.appendChild(listItem);

        }

    };

    xhr.send('todo=' + todo);

  }

}