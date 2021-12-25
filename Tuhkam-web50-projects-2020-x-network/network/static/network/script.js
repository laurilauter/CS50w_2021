
document.addEventListener('DOMContentLoaded', () => {

    //get the logged in username, or a blank if not logged in
    const username = JSON.parse(document.getElementById('user_username').textContent);
    const userid = JSON.parse(document.getElementById('user_id').textContent);
    const user_id = userid;
    var profile_id;
    var location;
    var current_page;
    var clicked_page;

    var objJson;
    console.log(`current_page set to: ${current_page}`);

   
    console.log(username);
    console.log(userid);
    


    //create top box div
    const top_box_div = document.createElement('div');
    top_box_div.setAttribute("id", "top-box-div");

    //create read post div
    const br = document.createElement('br');
    const read_post_div = document.createElement('div');
    read_post_div.setAttribute("id", "read-post-div");
    read_post_div.style.display = 'none'; 


    //create listing div
    const listingDiv = document.createElement('div');
    listingDiv.setAttribute("id", "listingDiv");

    //-------------------------------------------------

    //        PAGINATION ELEMENTS here

    //-------------------------------------------------

    


    //make listings table
    const listingTable = document.createElement('div');
    listingTable.setAttribute('id', 'listingTable');
    
    
    
    //make prev
    const btn_prev = document.createElement('a');
    btn_prev.setAttribute('id', 'btn_prev');
    btn_prev.innerHTML = ' Prev ';
    

    //make span for no
    const page = document.createElement('span');
    page.setAttribute('id', 'page');
    page.innerHTML = 'Page no here';
    

    //make next
    const btn_next = document.createElement('a');
    btn_next.setAttribute('id', 'btn_next');
    btn_next.innerHTML = ' Next ';

    



    //------------------------------------------------------


    //add top box div    
    top_box_div.appendChild(br);
    body_div.appendChild(top_box_div);

    

    //info
    console.log('loaded DOM');

    //location set to read posts
    

    //check if anybody logged in
    if (username === '') {

        console.log('nobody logged in');
        //no login needed to read posts

        //if not logged in, no need to post anything
        current_page = 1;
        console.log(`current_page set to: ${current_page}`);
        read_posts();

        
    } else {

        console.log('somebody logged in');

        //ADD EVENT LISTENERS TO MENU ITEMS

        //add listener to profile btn
        document.querySelector('#profile-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //clear old divs
        clear(top_box_div);
        clear(read_post_div);
        
        current_page = 1;
        console.log(`current_page set to: ${current_page}`);
        //direct profile function
        profile(userid);
        //info
        console.log('profile-btn pressed');
        });


        //add listener to following btn
        document.querySelector('#following-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //clear old divs
        clear(top_box_div);
        clear(read_post_div);
        
        current_page = 1;
        console.log(`current_page set to: ${current_page}`);
        //direct to following function
        following(userid);
        //info
        console.log('following-btn pressed');
        });


        //add listener to allposts btn
        document.querySelector('#allposts-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //clear old divs
        clear(top_box_div);
        clear(read_post_div);
        //info
        console.log('allposts-btn pressed');

        current_page = 1;
        console.log(`current_page set to: ${current_page}`);
        //direct following function
        read_posts();
        //info
        console.log('directing to read post');
        
        });

        

        }


        //Display posts
        current_page = 1;
        console.log(`current_page set to: ${current_page}`);
        read_posts();

    




    //create addpost
    function create_addpost() {

        // create add post div
        const add_post_div = document.createElement('div');
        add_post_div.setAttribute("id", "add-post-div");
        
        // Create a form
        const form = document.createElement("form");
        form.setAttribute("id", "post-form");
        form.setAttribute("method", "post"); 

        //create post-content div
        const d1 = document.createElement('div');
        d1.classList.add('form-group');

        // Create a texarea for post
        const pc = document.createElement("textarea");
        pc.setAttribute("id", "post-content");
        pc.classList.add('form-control');
        pc.setAttribute("placeholder", "Post something ..");
        pc.setAttribute("required", "");

        //append pc to d1
        d1.appendChild(pc); 

        //mk div for button
        const d2 = document.createElement('div');
        d2.classList.add('form-group');

        // create a submit button 
        const s = document.createElement("input"); 
        s.setAttribute("type", "submit"); 
        s.setAttribute("value", "Post");
        s.setAttribute("id", "post-submit-btn");
        s.classList.add("btn", "btn-sm", "btn-primary");
        
        //append s to d2
        d2.appendChild(s); 


        // d1 and d2 to form
        form.appendChild(d1);
        form.appendChild(d2);  
            
        // Append form to add_post div
        add_post_div.appendChild(form);   

        //append the whole thing to body div
        top_box_div.appendChild(add_post_div); 

        
        
            //add event listener to post submit button
            document.querySelector('#post-submit-btn').addEventListener("click", (response) =>{
                //prevent refresh
                response.preventDefault();
                //direct to add post function

                //clear page
                clear(read_post_div);

                //direct to add new post
                add_post();
                console.log('post area drawn');
            });


    }
        



    //------------following section-------------

    function following(userid) {

        console.log(`objectJson BEFORE following ${objJson.length}`);
        

        //make a following div
        const following_div = document.createElement('div');
        following_div.setAttribute("id", "following-div");
        following_div.classList.add('border', 'border-secondary', 'rounded', 'mb-2', 'p-2');

        //add guts to following_div
        const following_p = document.createElement('p');
        following_p.classList.add('following_p', 'ml-2');

        following_p.innerHTML = (`These are posts from people <b>${username}</b> is following.`); //add some meaning here
        following_div.append(following_p);

        


        //add following_div to body div
        top_box_div.appendChild(following_div);
        console.log('following area drawn');

        //display posts
        fetch(`/following/${userid}`)
        .then(response => response.json())
            .then(data => {


                data.following_users.forEach(following_users => {
                    //the subject is following these users
                    const following_span = document.createElement('h6');
                    following_span.setAttribute("id", following_users.id);
                    following_span.classList.add('following_span', 'text-primary', 'p-2', 'pointer');
                    following_span.innerHTML = following_users.username;
                    following_div.append(following_span);

                    //add event listener to profile name
                    following_span.addEventListener("click", (response) =>{
                        //prevent refresh
                        response.preventDefault();
                        //direct to add post function
    
                        //clear page
                        clear(top_box_div);
                        clear(read_post_div);
                        clear(listingTable);
    
                        //direct to profile
                        const userid = following_span.getAttribute('id');
                        profile(userid);
                        console.log(`${userid}author profile clicked`);
                        
                        
                    });

                });

                //direct to show posts
                console.log(`Location at Following: ${location}`);
                /*
                if (location != 'following') {
                    //current_page = 1;
                    console.log(`current_page set to: ${current_page}`);
                } else {
                    //current_page = clicked_page;
                    console.log(`current_page set to: ${current_page}`);
                }
                */
                location = ('following');
                console.log(`location: ${location}`);

                console.log(`objectJson AFTER following, before show_posts(data) -  ${objJson.length}`);
                show_posts(data);


            });


    }





    //------------profile section-------------

    function profile(userid) {


    
        profile_id = userid;
        //make a profile div
        const profile_div = document.createElement('div');
        profile_div.setAttribute("id", "profile-div");
        profile_div.classList.add('d-flex','justify-content-around' , 'border', 'border-secondary', 'rounded', 'mb-2', 'p-2');
        
        //add left div to profile div
        const l_profile_div = document.createElement('div');
        const l_profile_p = document.createElement('p');
        const l_profile_h6 = document.createElement('h6');

        l_profile_p.innerHTML = ('Followers');
        l_profile_h6.innerHTML = ('');

        l_profile_div.append(l_profile_p);
        l_profile_div.append(l_profile_h6);
        profile_div.append(l_profile_div);



        //add mid div to profile div
        const m_profile_div = document.createElement('div');
        m_profile_div.classList.add("d-inline-flex", "flex-column", "justify-content-center", "align-items-center");
        
        //add name
        const m_profile_h6 = document.createElement('h4');
        m_profile_h6.innerHTML = "The User";
        m_profile_h6.classList.add("p-2");

        //add image
        const img = document.createElement('img');
        img.setAttribute("src", "static/network/img/profile_pic.jpg");
        img.style.borderRadius = "50%";
        img.style.width = "80%";
        img.classList.add("p-2");
    

        // create a follow button
        const f_btn = document.createElement("input"); 
        f_btn.setAttribute("type", "submit");
        const f_btn_label = ("f_btn")
        f_btn.setAttribute("value", f_btn_label);
        f_btn.setAttribute("id", "f-btn");
        f_btn.classList.add("btn", "btn-sm", "btn-primary", "ml-auto", "p-2");
        


        //append to m div
        m_profile_div.append(m_profile_h6);
        m_profile_div.append(img);

        //check if to use follow or unfollow button

        m_profile_div.append(f_btn);

        profile_div.append(m_profile_div);

        //add right div to profile div
        const r_profile_div = document.createElement('div');
    
        const r_profile_p = document.createElement('p');
        const r_profile_h6 = document.createElement('h6');

        r_profile_p.innerHTML = ('Following');
        r_profile_h6.innerHTML = ('');
        //append stuff
        r_profile_div.append(r_profile_p);
        r_profile_div.append(r_profile_h6);
        profile_div.append(r_profile_div);


        //add listener to f_btn
        f_btn.addEventListener("click", (response) =>{
            //prevent refresh
            response.preventDefault();
            //direct to follow
            follow(userid);
            console.log(`You clicked to toggle Follow (userid) ${userid}`);
            return;

        });




        //add div to top box div
        top_box_div.appendChild(profile_div);
        console.log('profile area drawn');

        //go display followers

        //display posts
        fetch(`/profile/${userid}`)
        .then(response => response.json())
            .then(data => {
                console.log(data);

                l_profile_h6.innerHTML = data.followed_by;
                m_profile_h6.innerHTML = data.subject;
                r_profile_h6.innerHTML = data.following;

                if (userid == user_id) {

                    document.querySelector('#f-btn').style.display = 'none';
                    console.log('oh, this is you, no FOLLOW or UNFOLLOW button then')
                
                } else {

                    const f_btn_label = (data.label)
                    f_btn.setAttribute("value", f_btn_label);

                    console.log("its not the logged in users profile");
                }

                //direct to show posts
                if (location != 'profile') {
                    //current_page = 1;
                    console.log(`current_page set to: ${current_page}`);
                } else {
                    //current_page = clicked_page;
                    console.log(`current_page set to: ${current_page}`);
                }



                location = ('profile');
                console.log(`location: ${location}`);
                
                show_posts(data);

                //flw_btn (data);
                

    });


    }



    //---------   FOLLOW / UNFOLLOW -------------
    
    async function follow(userid) {
        //objJson = '';

        await fetch(`/follow/${userid}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                victim: userid,
                follower: user_id
                })
                
        })

            .then(response => response.json())
                .then(result => {
                    console.log(result.message);
                    return result;
                })
               
                    //clear top box
                    clear(top_box_div);
                    //clear post div
                    clear(read_post_div);
                    //read posts again
                    console.log('follow toggled, returning to Profile')
                    profile(userid);
                    
                    
        }


   

    //like funktion
    async function like(postid) {
        objJson = '';
        console.log(`current page at LIKE: ${current_page}`);
        console.log(`clicked page at LIKE: ${clicked_page}`);

        await fetch(`/like/${postid}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                postid: postid,
                
            })
            
            .then(response => response.json())
            
                .then(result => {
                    console.log(result);
                    return result;
                })
                
                //clear divs
                clear(top_box_div);
                clear(read_post_div);
                

                // direct to read posts again
                console.log(`${postid} returning from fetch`);

                console.log(`location: ${location}`);

                //Make an if statement to direct the view back to where it came form
                if (location =='profile') {
                    //SOMEHOW GET THE USER ID THAT IS BEING LOOKED AT!!!!
                    //userid = profile_id;
                    //current_page = clicked_page;
                    //clear(top_box_div);
                    profile(profile_id);

                } else if (location =='following') {
                    //current_page = clicked_page;
                    //clear(top_box_div);
                    following(userid);

                } else {
                    //current_page = clicked_page;
                    read_posts();
                }

    }
    




    //-------------------------------------------
  

    //           ADD NEW POST


    //-------------------------------------------


    async function add_post() {

        if (document.querySelector('#post-content').value == '') {
            console.log('aa, its empty');
        } else {

        //set flag to added post
        //window.flag = 'newpost';

        console.log('add_new_post');

        await fetch('/add_post', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                author: userid,
                content: document.querySelector('#post-content').value
                })
        })

            .then(response => response.json())
                .then(result => {
                    console.log(result);
                    return result;
                })
                
                    //clear top box
                    clear(top_box_div);
                    
                    //read posts again
                    read_posts();
        }
    }



    //    EDIT POST

    async function edit_post(postid, new_content) {
        console.log(`${postid} sent to  fetch`);
        
        if (new_content == '') {
            alert('The field was empty. Please Edit again.')
            console.log('new_content Was Empty');
            //read_posts();
            return;
        } else {
        
        console.log(`New content fetch STARTED for post no: ${postid} new_content: ${new_content}`);
        


        await fetch(`/edit_post/${postid}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                author: userid,
                content: new_content
                })
        })

            .then(response => response.json())
                .then(result => {
                    console.log(result);
                    return result;
                })

                console.log(`New content fetch COMPLETE for post no: ${postid} new_content: ${new_content}`);
                
                //clear stuff
                clear(top_box_div);
                clear(read_post_div);
                clear(listingDiv);


                //read posts again
                //current_page = clicked_page;
                read_posts();
        }
    }



    //fetch posts function
    async function read_posts() {
        //objJson = '';

        console.log('read_posts function');

        //clear(top_box_div);
        //clear(read_post_div);

        //display posts
        await fetch('/read_post')
            .then(response => response.json())
                .then(data => {

                    //send to show function
                    console.log('read_posts fetch returned');
                    /*
                    if (location != 'read') {
                        current_page = 1;
                    } else {
                        current_page = clicked_page;
                    }
                    */
                    

                    location = ('read');
                    console.log(`location: ${location}`);
                    show_posts(data);                 
                
                });
            
        
            if (username === '') {
                //no add posts ability needed for visitors
                //clear old divs
                clear(top_box_div);
                console.log(`read_posts for username: ${username}`);

            //there is someone logged in
                } else {
                // add post ability enabled
                clear(top_box_div);
                create_addpost();
                console.log(`read_posts for username: ${username}`);
                }
            
    }







    //display posts
    function show_posts(data) {

        //console.log(`objectJson BEFORE show_posts ${objJson.length}`);

        

        

        data.posts.forEach(posts => {

            //add container for posts
            const post_row = document.createElement('div');
            post_row.classList.add('post-row', 'border', 'border-secondary', 'rounded', 'mb-2', 'p-2');
            
            //add container for posts top row
            const post_top_row = document.createElement('div');
            post_top_row.classList.add('post-top-row', 'd-flex');

            //Add author
            const author = document.createElement('h6');
            author.classList.add('author', 'text-primary', 'p-2', 'pointer');
            //give it a pointer
            author.innerHTML = posts.author;
            //store author id inside h6 tag as id
            author.setAttribute("id", posts.author_id);
            post_top_row.append(author);

            //Add time
            const time = document.createElement('span');
            time.classList.add('time', 'font-weight-light', 'small', 'text-secondary', 'ml-auto', 'p-2');
            time.innerHTML = posts.timestamp;
            post_top_row.append(time);

            //append top row
            post_row.append(post_top_row);


            //Add content div
            const content_div = document.createElement('div');
            post_row.append(content_div);
            author.classList.add('content_div');
            //Add content
            const content = document.createElement('p');
            content.classList.add('content', 'ml-2', posts.id);
            content.innerHTML = posts.content;
            content_div.append(content);


            //Add edit content area
            const edit_txt = document.createElement("textarea");
            edit_txt.classList.add('form-control', 'edit-content', posts.id);
            edit_txt.setAttribute("id", posts.id);
            edit_txt.setAttribute("required", "");
            edit_txt.innerHTML = posts.content;

            content_div.append(edit_txt);

            content.style.display = "block";
            edit_txt.style.display = "none";




            //Add likes btn
            const likeme = document.createElement('span');
            likeme.classList.add('ml-2', 'likeme', 'badge', 'badge-light', 'pointer');
            likeme.setAttribute("id", posts.id);


            //console.log(`username at like/dislike ${username}`);


            if (posts.author.includes(username)) {
                likeme.innerHTML = '';
            } else if (posts.liker.includes(username)) {
                likeme.innerHTML = '<i class="material-icons">favorite</i>';
            } else {
                likeme.innerHTML = '<i class="material-icons">favorite_border</i>';
            }

            //this adds a label to the like button
            
            post_row.append(likeme);




            //Add likes #
            const likes = document.createElement('span');
            likes.classList.add('likes', 'ml-2');
            likes.innerHTML = `Likes: ${posts.likes}`;
            post_row.append(likes);

            //Add edit btn #
            const edit = document.createElement('span');
            edit.classList.add('edit', 'ml-2', 'float-right', 'text-primary', 'pointer', posts.id);
            //edit.setAttribute("id", posts.id);
            edit.innerHTML = ('Edit');

            //Add save btn #
            const save = document.createElement('span');
            save.classList.add('save', 'ml-2', 'float-right', 'text-primary', 'pointer', posts.id);
            //save.setAttribute("id", posts.id);
            save.innerHTML = ('Save');

            edit.style.display = "block";
            save.style.display = "none";


            //if the post is from logged in user, display edit btn
            if (userid === posts.author_id) {

                post_row.append(edit);
                post_row.append(save);

            //there is someone logged in
                } else {
                   // console.log('no edit')
                // add post ability anable
                }
            

            //add post_row to read_post_div
            read_post_div.appendChild(post_row);
            

            //add read post div and a br to it        
            read_post_div.appendChild(br);

            //Add the whole thing to the body_div
            
            body_div.appendChild(read_post_div);

 

        });



        //-----------------  START PAGINATION COLLECTION ------------

        // add the div to body div
        
        listingDiv.appendChild(listingTable);
        listingDiv.appendChild(btn_prev);
        listingDiv.appendChild(page);
        listingDiv.appendChild(btn_next);
        body_div.appendChild(listingDiv);
        console.log(`pagination controls drawn`);
        


        //add listeners for pev and next
        

        //---------------PAGINATION START----------------------------

        //current_page = 1;
        var records_per_page = 10;


        //---------Collecting a list for pagination -----------------

        
        objJson = Array.from(document.getElementById('read-post-div').children);
        /*
        for(var i = 0; i < objJson.length ; i++){
            console.log(`objJson guts at collection > ${objJson[i].outerHTML}`)
        }
        */
        var len = objJson.length - 1;
        console.log(`len ${len}`)

        //console.log(`objJson.length at collection > ${objJson.length}`)

        //console.log(`posts collected from elements`);


        read_post_div.innerHTML = '';
        //console.log(`original posts cleared`);


        changePage(current_page);
        

        //console.log('changePage(current_page) ' + current_page);

       


        function prevPage() {
            if (current_page > 1) {
                //console.log(`prevPage current_page was: ${current_page}`);
                current_page--;
                //console.log(`prevPage current_page set to: ${current_page}`);
                changePage(current_page);
            }
        }

        function nextPage() {
            if (current_page < numPages()) {
                //console.log(`nextPage current_page was: ${current_page}`);
                current_page++;
                //console.log(`nextPage current_page set to: ${current_page}`);
                changePage(current_page);
            }
        }
            
        function changePage(page) {
            
            const btn_next = document.getElementById("btn_next");
            btn_next.addEventListener("click", (response) =>{
                //prevent refresh
                response.preventDefault();
                nextPage();
                //console.log(`next addEventListener clicked`);
                return;
            });
            

            const btn_prev = document.getElementById("btn_prev");
            
            btn_prev.addEventListener("click", (response) =>{
                //prevent refresh
                response.preventDefault();
                prevPage();
                //console.log(`prev addEventListener clicked`);
                return;
            });

            const listing_table = document.getElementById("listingTable");
            const page_span = document.getElementById("page");

            

            // Validate page
            //console.log(`page was ${page}`);
            if (page < 1) page = 1;
            //console.log(`page set to ${page}`);
            if (page > numPages()) page = numPages();

            document.getElementById("listingTable").innerHTML = "";
            //console.log(`listing_table.innerHTML cleared`);



            //this loop draws the posts
            for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < (objJson.length - 1); i++) {
               
                listing_table.innerHTML += objJson[i].outerHTML + "<br>";
            }
            //console.log(`objectJson after DRAW - 1 ${objJson.length  - 1}`);





            //creates an array of elements with class author
            var authorGroup = document.getElementsByClassName("author");
            //console.log(`${authorGroup} authorGroup event listener`);

                //adds an event listener to each of the element in author group
                for (var i = 0; i < authorGroup.length; i++) {
                    authorGroup[i].addEventListener('click', (response) =>{
                
                    response.preventDefault();
                    //direct to add post function

                    //clear page
                    clear(top_box_div);
                    clear(read_post_div);

                    //direct to profile

                    //get id of what was clicked on, use it to show user profile
                    var userId = (window.event.target.id);
                    profile(userId);
                    console.log(window.event.target.id)
                    console.log(`${userId} author profile clicked`);
                    
                    return;
                    
                    });

                }

            //creates an array of elements with class edit
            var editGroup = document.getElementsByClassName("edit");
            //console.log(`${editGroup} editGroup event listener`);

                //adds an event listener to each of the element in author group
                for (var i = 0; i < editGroup.length; i++) {
                    editGroup[i].addEventListener('click', (response) =>{

                    //prevent refresh
                    response.preventDefault();
    
                    //hide content, display texarea
                    var edIt = window.event.target;
                    //console.log(edIt);
                    vennapoeg = edIt.parentElement;

                    //console.log(vennapoeg);
                    //console.log(vennapoeg.childNodes[1].firstChild);

                    var conTent = edIt.parentElement.childNodes[1].firstChild;
                    //console.log(`conTent ${conTent.innerHTML}`);
                    
                    var editContent = edIt.parentElement.childNodes[1].childNodes[1];


                    //hide content, show edit content
                    conTent.style.display = "none";
                    editContent.style.display = "block";
                    
    
                    //hide edit btn, show save btn
                    var saVe = edIt.nextSibling;

                    edIt.style.display = "none";
                    saVe.style.display = "block";
                    
                    return;
    
                });
            
            }

            //creates an array of elements with class author
            var saveGroup = document.getElementsByClassName("save");
            //console.log(`${saveGroup} saveGroup event listener`);

                //adds an event listener to each of the element in author group
                for (var i = 0; i < saveGroup.length; i++) {
                        saveGroup[i].addEventListener('click', (response) =>{

                            //prevent refresh
                            response.preventDefault();

                            var saVe = window.event.target;
            
                            var postid = saVe.parentElement.childNodes[1].childNodes[1].id;
                            
                            var new_content = saVe.parentElement.childNodes[1].childNodes[1].value;
                            console.log(`${postid} save post id clicked`);
            
                            console.log(`${new_content} this is new_content at save`);

                            var conTent = saVe.parentElement.childNodes[1].firstChild;
                            var editContent = saVe.parentElement.childNodes[1].childNodes[1];

                            var edIt = saVe.previousSibling;
            
                            
                            //hide content, display texarea
                            conTent.style.display = "block";
                            editContent.style.display = "none";
            
                            //hide edit btn, show save btn
                            edIt.style.display = "block";
                            saVe.style.display = "none";

                            //clicked_page = current_page;
                            console.log(clicked_page + '>' + current_page);

                            //objJson = '';
                        
                            edit_post(postid, new_content)
                            
                            return;
            
                        });

                }
    
            

            //creates an array of elements with class author
            var likemeGroup = document.getElementsByClassName("likeme");
            //console.log(`${likemeGroup} likemeGroup event listener`);

                //adds an event listener to each of the element in author group
                for (var i = 0; i < likemeGroup.length; i++) {
                    likemeGroup[i].addEventListener('click', (response) =>{
    
                    //prevent refresh
                    response.preventDefault();
    
                    //clear page
                    var likemeBtn = window.event.target;
    
                    var postid = likemeBtn.parentElement.parentElement.childNodes[1].childNodes[1].id;
                    console.log(`${postid} post liked`);

                    

                    //diect to like
                    

                    console.log(`page like before${page}`);
                    clicked_page = page;
                    current_page = page;
                   
                    console.log(`len at liked ${objJson.length - 1}`);

                    //objJson = '';
                    
                    
                    like(postid);


                    
                    
                    return;
                });

            }
            
    


            //console.log("posts written and event handlers attached")

            page_span.innerHTML = page + "/" + numPages();

            if (page == 1) {
                btn_prev.style.visibility = "hidden";
            } else {
                btn_prev.style.visibility = "visible";
            }

            if (page == numPages()) {
                btn_next.style.visibility = "hidden";
            } else {
                btn_next.style.visibility = "visible";
            }


        }


        function numPages() {
            //objJson = Array.from(document.getElementById('read-post-div').children);

            //console.log(`Math.ceil x /  ${Math.ceil(len / records_per_page)}`)

            return Math.ceil(len / records_per_page);
        }
        
    }
    
    










    
    
    // get cookies for CSRF token
    function getCookie(name) {
        console.log('cookie');
        // no cookie
        if (!document.cookie) {
            return null;
        }

        const token = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));

        // no cookie
        if (token.length === 0) {
            return null;
        }

        return decodeURIComponent(token[0].split('=')[1]);
    }





    //clear old data 
    function clear(element) {
        //for information
        //console.log(`${element} clear`);

        while (element.hasChildNodes()) {  
            element.removeChild(element.firstChild);
          }
    }





});
