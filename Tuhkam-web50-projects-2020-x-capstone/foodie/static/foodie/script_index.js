document.addEventListener('DOMContentLoaded', () => {

    //get the logged in username, or a blank if not logged in
    const username = JSON.parse(document.getElementById('user_username').textContent);
    const userid = JSON.parse(document.getElementById('user_id').textContent);
    //Change back to cont
    let useremail = JSON.parse(document.getElementById('user_email').textContent);
    const userbio = JSON.parse(document.getElementById('user_bio').textContent);
    console.log(username, userid, useremail, userbio);

    //Let's create some layout elements

    if (username.length == 0) {
        console.log('Nobody logged in yet')
      } else {
        // Get a list of users
        async function getUsers() {
            console.log('fetch Users function');
            //fetch from api
            await fetch('/users')
                .then(response => response.json())
                    .then(data => {

                        data.user_data.forEach(user_data => {

                            //create profile info view
                            const profile_container = document.createElement('div');
                            profile_container.setAttribute("class", "profile-container");
                            
                            const profile_div_left = document.createElement('div');
                            profile_div_left.setAttribute("class", "profile-div-left");
                            
                            const profile_div_right = document.createElement('div');
                            profile_div_right.setAttribute("class", "profile-div-right");
                            

                            //create image div
                            const image_div = document.createElement('div');
                            image_div.setAttribute("class", "image-div");
                            
                            //create username div
                            const username_div = document.createElement('div');
                            username_div.setAttribute("class", "username-div");
                            username_div.setAttribute("style","font-weight: bold");
                            username_div.innerHTML = user_data.user;

                            //create bio div
                            
                            const bio_div = document.createElement('div');
                            bio_div.setAttribute("class", "bio-div");
                            bio_div.innerHTML = user_data.bio;
                            

                            //insert gravatar image
                            const grav_image_element = document.createElement('img');
                            grav_image_element.src = get_gravatar_image_url(user_data.email, 60);
                            grav_image_element.setAttribute("style","border-radius: 50%");
                            image_div.appendChild(grav_image_element);


                            //add items to profile container
                            profile_div_right.appendChild(username_div);
                            profile_div_right.appendChild(bio_div);
                            profile_div_left.appendChild(image_div);
                            profile_container.appendChild(profile_div_left);
                            profile_container.appendChild(profile_div_right);
                            const body_div = document.getElementById("body-div");
                            body_div.appendChild(profile_container);


                            email = user_data.email; //make it user_data.email

                            function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default) {
                                email = typeof email !== 'undefined' ? email : 'john.doe@example.com';
                                size = (size >= 1 && size <= 2048) ? size : 80;
                                default_image = typeof default_image !== 'undefined' ? default_image : 'mm';
                                allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g';
                                force_default = force_default === true ? 'y' : 'n';
                                
                                return ("https://secure.gravatar.com/avatar/" + md5(email.toLowerCase().trim()) + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''));
                            }

                        });

                    }); 
                    
            console.log('returned from getUsers function'); 
                
        }

        getUsers();

      }
    

    


});