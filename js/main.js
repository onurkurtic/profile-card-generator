var db = [
  {
    name: "James Barrows",
    email: "james@gmail.com",
    age: 15
  },
  {
    name: "Mark Robinson",
    email: "mark@gmail.com",
    age: 34
  },
  {
    name: "Lara Barbosa",
    email: "lara@gmail.com",
    age: 25
  }
];

// =================================
// IIFE to generate dummy data
// =================================

(function Avatars(db){
    this.init = function(){
        this.generateList();
        this.enterUser();
    };

    this.generateList = function(){
        var avatarContainer = document.getElementById("parent_avatars");
        avatarContainer.innerHTML = "";

        db.forEach(function(avatar, i){  
            avatarContainer.insertAdjacentHTML('afterbegin', '<div class="col-sm-4">' + 
                            '<div class="card">' +
                                '<div class="card-delete" data-card="' + i + '">x</div>' +
                                '<div class="card-block">' +
                                    '<h3 class="card-title">' + avatar.name + '</h3>' +
                                    '<p class="card-text"><strong>Email:</strong> ' + avatar.email +
                                    '<p class="card-text"><strong>Age:</strong> ' + avatar.age + '</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
        });
        deleteCard();
    };

// =================================
// Handle new card entry
// =================================

    this.enterUser = function(){
        var form = document.getElementById("myForm");

        form.addEventListener("submit", function(e) {
        e.preventDefault();
        grabUser();
        });

        function grabUser() {
            var name = document.getElementById("user_name").value;
            var email = document.getElementById("user_email").value;
            var age = document.getElementById("user_age").value;

            var userInputs = [name, email, age];

            // Validate the form
            if(validateUser(userInputs)){
                form.reset();
                var newEntry = {
                    name: name,
                    email: email,
                    age: age
                };
                db.push(newEntry);
                generateList();
            } else {
                // Show the error message
                document.getElementById("error").style.display = "block";               
                //Hide the error after 2 seconds
                setTimeout(function(){
                    document.getElementById("error").style.display = "none";
                }, 2000)
            }
        }
    };

// =================================
// Form validator
// =================================
    this.validateUser = function(inputs){
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i] == ""){
                return false;
            } else {
                return true;
            }
        };
    }

// =================================
// Delete a user
// =================================

    this.deleteCard = function(){
        var buttons = document.querySelectorAll(".card-delete");

        function deleteThis(e){
            var dataNum = parseInt(e.getAttribute("data-card"));
            db.splice(dataNum, 1);
            generateList();
        };

        buttons.forEach(function(button){
            button.addEventListener("click", function(e){
                deleteThis(this);
            });
        }); 
    };

    this.init();
})(db);



