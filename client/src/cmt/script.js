document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var comment = document.getElementById("comment").value;

  // Envoyer les données du formulaire via AJAX
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "save_comment.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          loadComments(); // Recharger les commentaires après l'ajout
      }
  };
  xhr.send("name=" + encodeURIComponent(name) + "&comment=" + encodeURIComponent(comment));

  // Réinitialiser le formulaire
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
});

// Charger les commentaires au chargement de la page
window.onload = loadComments;

function loadComments() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "get_comments.php", true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var comments = JSON.parse(xhr.responseText);
          var commentsList = document.getElementById("comments-list");
          commentsList.innerHTML = "";

          for (var i = 0; i < comments.length; i++) {
              var comment = comments[i];
              var li = document.createElement("li");
              li.innerHTML = "<span class='comment-author'>" + comment.name + "</span>"
                           + "<span class='comment-date'>" + comment.date + "</span>"
                           + "<p>" + comment.comment + "</p>";
              commentsList.appendChild(li);
          }
      }
  };
  xhr.send();
}