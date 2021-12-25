
document.addEventListener('DOMContentLoaded', () => {

    //get the logged in username, or a blank if not logged in
    const username = JSON.parse(document.getElementById('user_username').textContent);
    const userid = JSON.parse(document.getElementById('user_id').textContent);
    //Change back to cont
    let useremail = JSON.parse(document.getElementById('user_email').textContent);
    const userbio = JSON.parse(document.getElementById('user_bio').textContent);
    console.log(username, userid, useremail, userbio);

    //Let's create some layout elements

    //create profile info view
    const profile_container = document.createElement('div');
    profile_container.setAttribute("id", "profile-container");
   
    const profile_div_left = document.createElement('div');
    profile_div_left.setAttribute("id", "profile-div-left");
    profile_div_left.style.marginLeft = "20px";
    profile_div_left.style.marginTop = "20px";

    const profile_div_right = document.createElement('div');
    profile_div_right.setAttribute("id", "profile-div-right");

    //create image div
    const image_div = document.createElement('div');
    image_div.setAttribute("id", "image-div");
    
    //create username div
    const username_div = document.createElement('div');
    username_div.setAttribute("id", "username-div");
    username_div.setAttribute("style","font-weight: bold");
    username_div.innerHTML = username;

    //create bio div
    const bio_div = document.createElement('div');
    bio_div.setAttribute("id", "bio-div");
    bio_div.innerHTML = userbio;


    //insert gravatar image
    const grav_image_element = document.createElement('img');
    grav_image_element.src = get_gravatar_image_url(useremail, 60);
    grav_image_element.setAttribute("style","border-radius: 50%");
    image_div.appendChild(grav_image_element);


    //add items to profile container
    profile_div_right.appendChild(username_div);
    profile_div_right.appendChild(bio_div);
    profile_div_left.appendChild(image_div);
    profile_container.appendChild(profile_div_left);
    profile_container.appendChild(profile_div_right);
    const body_div = document.getElementById("body-div");
    body_div.prepend(profile_container);
    

    //create display_div
    const display_div = document.createElement('div');
    display_div.setAttribute("id", "display-div");
    //display_div.setAttribute("class", "overflow-x auto");
    

    //create insert weight button
    const insert_weight_btn = document.createElement('p');
    insert_weight_btn.setAttribute("data-toggle", "modal");
    insert_weight_btn.setAttribute("data-target", "#myModal");
    insert_weight_btn.classList.add("p-3");
    insert_weight_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0275d8" class="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg>';
    insert_weight_btn.setAttribute("style","cursor: pointer");
    

    //create insert_div
    const insert_div = document.createElement('div');
    insert_div.setAttribute("id", "insert_div");
    insert_div.classList.add("d-flex", "justify-content-center");
    insert_div.appendChild(insert_weight_btn);



    //EDIT BIO BUTTON

    //create EDIT BIO BUTTON
    const bio_btn = document.createElement('p');
    bio_btn.setAttribute("id", "bio_btn");
    //bio_btn.classList.add("p-3");
    bio_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0275d8" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    bio_btn.setAttribute("style","cursor: pointer;");

    //create SAVE BIO BUTTON
    const save_bio_btn = document.createElement('p');
    save_bio_btn.setAttribute("id", "save_bio_btn");
    //save_bio_btn.classList.add("p-3");
    save_bio_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0275d8" class="bi bi-check-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>';
    save_bio_btn.setAttribute("style","cursor: pointer;");
    save_bio_btn.setAttribute("style","display: none;");

    //create bio_btn_div
    const bio_btn_div = document.createElement('div');
    bio_btn_div.setAttribute("id", "bio_btn_div");
    bio_btn_div.classList.add("d-flex", "justify-content-right");
    bio_btn_div.appendChild(bio_btn);
    bio_btn_div.appendChild(save_bio_btn);
    profile_container.appendChild(bio_btn_div);

    
    //create edit_bio_div
    const edit_bio_div = document.createElement('div');
    edit_bio_div.setAttribute("id", "edit_bio_div");
    //edit_bio_div.classList.add("d-flex", "justify-content-right");
    edit_bio_div.setAttribute("style","display: none;");
    profile_div_right.appendChild(edit_bio_div);
    



    // --------- make canvas div  --------
    const canvas_container = document.createElement('canvas-container');
    canvas_container.setAttribute("id", "canvas-container");
    canvas_container.setAttribute("style","display: block; position: relative; width: auto; height: 60vh");
    const canvas_div = document.createElement('canvas');
    canvas_div.setAttribute("id", "canvas");
    

    // ----------  Make TABLE div ----------------
    /*
    const table_div = document.createElement('div');
    table_div.setAttribute("id", "table_div");
    let table = document.createElement('table');
    table.setAttribute("id", "table");
    table_div.appendChild(table);
    */
    // ----------  Make MODAL content ----------------

    // ---------- Input Weight -------------------
    const modal_in1_div = document.createElement('div');
    modal_in1_div.setAttribute("class", "input-group");
    modal_in1_div.setAttribute("id", "input-group-w");
    const modal_body = document.getElementById("modal-body");
    const modal_in1_h4 = document.createElement('h4');
    const modal_in1_W_response = document.createElement('h6');
    modal_in1_h4.innerHTML = "Add Weight (insert first)";
    modal_body.appendChild(modal_in1_h4);
    modal_body.appendChild(modal_in1_div);
    
    // --- create input field
    const modal_in1 = document.createElement('input');
    modal_in1.setAttribute("class", "form-control");
    modal_in1.setAttribute("id", "add-weight");
    modal_in1.setAttribute("type", "number");
    modal_in1.setAttribute("min", "1");
    modal_in1.setAttribute("max", "400");
    modal_in1.setAttribute("required", "");
    modal_in1_div.appendChild(modal_in1);

    // --- create span for button
    const modal_in1_span = document.createElement('span');
    modal_in1_span.setAttribute("class", "input-group-btn");
    modal_in1_div.appendChild(modal_in1_span);

    // --- create button
    const modal_in1_btn = document.createElement('button');
    modal_in1_btn.classList.add("btn", "btn-primary");
    modal_in1_btn.setAttribute("id", "add-weight-btn");
    modal_in1_btn.setAttribute("type", "button");
    modal_in1_btn.innerHTML = "Insert weight";
    modal_in1_btn.setAttribute("style","cursor: pointer");
    modal_in1_span.appendChild(modal_in1_btn);

    // ---------- Input Calories -------------------
    const modal_cal_div1 = document.createElement('div');
    modal_cal_div1.classList.add("input-group");
    modal_cal_div1.setAttribute("id", "input-group-get");
    const modal_body2 = document.getElementById("modal-body2");
    const modal_cal_h4 = document.createElement('h4');
    const modal_in1_C_response = document.createElement('h6');
    modal_cal_h4.innerHTML = "Add Calories";
    modal_body2.appendChild(modal_cal_h4);
    modal_body2.appendChild(modal_cal_div1);

    // --- create input for --- find-calories
    const modal_in_f_cal = document.createElement('input');
    modal_in_f_cal.setAttribute("class", "form-control");
    modal_in_f_cal.setAttribute("id", "find-calories");
    modal_in_f_cal.placeholder = "Insert food items or dishes..";
    modal_cal_div1.appendChild(modal_in_f_cal);

    // --- create span for button --- Get calories
    const modal_in_get_calories_span = document.createElement('span');
    modal_in_get_calories_span.setAttribute("class", "input-group-btn");
    modal_cal_div1.appendChild(modal_in_get_calories_span);

    // --- create button --- Get calories
    const modal_in_get_calories_btn = document.createElement('button');
    modal_in_get_calories_btn.classList.add("btn", "btn-primary");
    modal_in_get_calories_btn.setAttribute("id", "get-calories-btn");
    modal_in_get_calories_btn.setAttribute("type", "button");
    modal_in_get_calories_btn.innerHTML = "Get calories";
    modal_in_get_calories_btn.setAttribute("style","cursor: pointer");
    modal_in_get_calories_span.appendChild(modal_in_get_calories_btn);

    //--- create empty div to display food items
    const modal_cal_div_display = document.createElement('ul');
    modal_cal_div_display.classList.add("p-3");
    modal_cal_div_display.setAttribute("id", "display-calories");
    modal_body2.appendChild(modal_cal_div_display);

    //--- CREATE DIV FOR INSERT CALORIES
    const modal_cal_div2 = document.createElement('div');
    modal_cal_div2.classList.add("input-group");
    modal_cal_div2.setAttribute("id", "input-group-insert");
    modal_body2.appendChild(modal_cal_div2);

    // --- create input for --- add-calories
    const modal_in_i_cal = document.createElement('input');
    modal_in_i_cal.setAttribute("class", "form-control");
    modal_in_i_cal.setAttribute("id", "add-calories");
    //modal_in_i_cal.setAttribute("type", "number");
    modal_cal_div2.appendChild(modal_in_i_cal);


    // --- create span for button Insert calories
    const modal_in_insert_calories_span = document.createElement('span');
    modal_in_insert_calories_span.setAttribute("class", "input-group-btn");
    modal_cal_div2.appendChild(modal_in_insert_calories_span);

    // --- create button Insert calories
    const modal_in_insert_calories_btn = document.createElement('button');
    modal_in_insert_calories_btn.classList.add("btn", "btn-primary");
    modal_in_insert_calories_btn.setAttribute("id", "add-calories-btn");
    modal_in_insert_calories_btn.setAttribute("type", "button");
    modal_in_insert_calories_btn.innerHTML = "Insert calories";
    modal_in_insert_calories_btn.setAttribute("style","cursor: pointer");
    modal_in_insert_calories_span.appendChild(modal_in_insert_calories_btn);

    

    //add divs to DOM
    
    bigbox.appendChild(display_div);
    display_div.appendChild(canvas_container);
    canvas_container.appendChild(canvas_div);
    bigbox.appendChild(insert_div);
    //bigbox.appendChild(table_div);


    
    


    //Event LISTENERS


    //Listen to adit bio btn
    document.querySelector('#bio_btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('edit bio pressed');
        
        //get value of bio-div
        let bio_data = document.getElementById("bio-div").textContent;

        //create texarea for editing
        const bio_textarea = document.createElement('textarea');
        bio_textarea.setAttribute("id", "bio_textarea");


        //insert data into texarea for editing
        bio_textarea.innerHTML = bio_data;
        //insert texarea into document
        edit_bio_div.appendChild(bio_textarea);

        //make sure the texarea size matches previous text size
        let element = document.getElementById('bio-div');
        let positionInfo = element.getBoundingClientRect();
        let txt_height = positionInfo.height + 40;
        let txt_width = positionInfo.width + 0;
        bio_textarea.style.height = txt_height;
        bio_textarea.style.width = txt_width;

        // INSTEAD OF THIS CRAP ABOVE USE <div contenteditable>Try typing and returning.</div>
        // AND somehow reload the new BIO without refresh!!

        //hide bio-div
        document.getElementById("bio-div").setAttribute("style","display: none;");
        //hide edit bio btn and bio btn div
        document.getElementById("bio_btn").setAttribute("style","display: none;");
        document.getElementById("bio_btn_div").setAttribute("style","display: none;");
        
        //show edit textarea and save btn
        document.getElementById("edit_bio_div").setAttribute("style","display: block;");
        document.getElementById("save_bio_btn").setAttribute("style","display: block;");

        });



    document.querySelector('#save_bio_btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('save bio pressed');
    
        data2 = document.getElementById("bio_textarea").value;
        console.log("New bio wil be:" + data2);

        //set bio div to new value
        document.getElementById("bio-div").innerHTML = data2;

        //hide bio-div
        document.getElementById("bio-div").setAttribute("style","display: block;");
        //hide edit bio btn and bio btn div
        document.getElementById("bio_btn").setAttribute("style","display: block;");
        document.getElementById("bio_btn_div").setAttribute("style","display: block;");
        
        //show edit textarea and save btn
        document.getElementById("edit_bio_div").setAttribute("style","display: none;");
        document.getElementById("save_bio_btn").setAttribute("style","display: none;");

        document.getElementById("edit_bio_div").removeChild(document.getElementById("bio_textarea"));

        writeDataBio(data2);
        
        });



    document.querySelector('#add-weight-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('add-weight pressed');
        var data = document.getElementById("add-weight").value;
        console.log(data);
        if (data === '' || data == 0){
            console.log('Nothing inserted');
        } else {
            writeDataW();
        };
        });

    document.querySelector('#get-calories-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('add-calories pressed');
        var data = document.getElementById("find-calories").value;
        console.log(data);
        if (data === '' || data == 0){
            console.log('Nothing inserted');
        } else {
            foodInfo();
        };

        });

    document.querySelector('#add-calories-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('add-calories pressed');
        var data = document.getElementById("add-calories").value;
        console.log(data);
        if (data === '' || data == 0){
            console.log('Nothing inserted');
        } else {
            writeDataC();
        };
        });

    document.querySelector('#close-modal-btn').addEventListener("click", (response) =>{
        //prevent refresh
        response.preventDefault();
        //info
        console.log('close modal pressed');
        clearModal();
        });


    function clearModal() {
        modal_in_i_cal.value = '';
        modal_cal_div_display.innerHTML = '';
        total_calories = [];
    };




    // Get Gravatar image by email

    email = useremail;
    console.log('new email: '+ email)

    function get_gravatar_image_url (email, size, default_image, allowed_rating, force_default) {
        email = typeof email !== 'undefined' ? email : 'john.doe@example.com';
        size = (size >= 1 && size <= 2048) ? size : 80;
        default_image = typeof default_image !== 'undefined' ? default_image : 'mm';
        allowed_rating = typeof allowed_rating !== 'undefined' ? allowed_rating : 'g';
        force_default = force_default === true ? 'y' : 'n';
        
        return ("https://secure.gravatar.com/avatar/" + md5(email.toLowerCase().trim()) + "?size=" + size + "&default=" + encodeURIComponent(default_image) + "&rating=" + allowed_rating + (force_default === 'y' ? "&forcedefault=" + force_default : ''));
    }


    // find a way to avoid global mutable variables
    let x_labels = [];
    let w_data = [];
    let c_data = [];
    let total_calories = [];
    let today = '';
    let weight_today = '';
    let calories_today = '';

    // write BIO data to DB
    async function writeDataBio(data2) {
        console.log('Edit bio function');
        //Check URLS.py for api endpoint
        await fetch('/profile/bio', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                bio: data2
            })
        })
            .then(response => response.json())
                .then(result => {
                    console.log(result);
                    console.log('returned from write bio data');
                    return result;
                })
                    //read data from DB again
                    //getData();
                    
        }


    

    // write WEIGHT data to DB
    async function writeDataW() {
        console.log('Add weight function');
        //Check URLS.py for api endpoint
        await fetch('/profile/weight', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                weight: document.querySelector('#add-weight').value
            })
        })
            .then(response => response.json())
                .then(result => {
                    console.log(result);
                    console.log('returned from write weight data');
                    return result;
                })
                    //read data from DB again
                    getData();
                    clearModal();
        }
    



    // write CALORIES data to DB

    async function writeDataC() {
        console.log('Add calories function');
        //sum new and old calories data
        if (calories_today == '') {
            calories_today = 0;
        };

        const new_calories = document.querySelector('#add-calories').value;
        const calories_sum = parseInt(new_calories) + parseInt(calories_today);

        console.log('new_calories ' + new_calories)
        console.log('calories_today ' + calories_today)
        console.log('calories_sum ' + calories_sum)

        await fetch('/profile/calories', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                calories: calories_sum
            })
        })
            .then(response => response.json())
                .then(result => {
                    console.log(result);
                    console.log('returned from write calories data');
                    return result;
                })
                    //read data from DB again
                    getData();
                    clearModal();
        }



    //USE this to find calories from food items
    async function foodInfo() {
        console.log('Find calories function');
        //Check URLS.py for api endpoint
        await fetch('/profile/food', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                food_item: document.querySelector('#find-calories').value
            })
        })
            .then(response => response.json())
                .then(data => {

                    //console.log(data);
                    obj = JSON.parse(data);

                    obj.items.forEach(items => {
                        let key = items.name;
                        let value = parseInt(items.calories);
                        let pair = key + ": " + value + " kcal"; 

                        //add value to total calories for summing
                        total_calories.push(value);

                        //get fod items coun in list
                        var item_count = document.getElementById("display-calories").childElementCount;

                        //make a li for the food item row
                        const cal_item_li = document.createElement('li');
                        cal_item_li.style.listStyle = "none";
                        cal_item_li.setAttribute("id", "item " + item_count);
                        
                        //add a btn to make the line removable
                        const cal_close_btn = document.createElement('button');
                        cal_close_btn.style.marginRight = "20px";

                        cal_close_btn.classList.add("btn", "btn-outline-danger", "btn-sm");
                        cal_close_btn.setAttribute("type", "button");
                        cal_close_btn.innerHTML = '\u00D7';


                        cal_item_li.appendChild(cal_close_btn);


                        // IN ADDITION to adding a button, add an event listener to WINDOW object?

                        cal_close_btn.addEventListener("click", () => {

                            // get item value and remove it from sum
                            
                            //substract = value;
                            const index = total_calories.indexOf(value);
                            if (index > -1) {
                            total_calories.splice(index, 1);
                            }

                            //remove childNode, selecting by id + item count
                            let current_item = document.getElementById("item " + item_count);
                            console.log("current_item: " + current_item.nodeName);
                            // remove li
                            current_item.parentNode.removeChild(current_item);


                            console.log("X clicked");

                            //Go to substract value
                            calculate(total_calories);

                        });

                        //display a row with item:calories kcal
                        const cal_p = document.createElement('span');
                        cal_p.classList.add("item-value");
                        cal_p.innerHTML = pair;
                        cal_item_li.appendChild(cal_p);
                        //add all to food items list div
                        modal_cal_div_display.appendChild(cal_item_li);
                        
                        
                        //Display total calories for item
                        console.log(total_calories);
 
                        function calculate(total_calories) {
                            //sum the calories of items
                            let sum = 0;
                            for (let calorie of Object.values(total_calories)) {
                                sum += calorie;

                                //sum = sum + calorie - substract;
                                console.log("total_calories: " + total_calories);
                                console.log("Sum: " + sum);

                            }

                            //Display sum of calories
                            modal_in_i_cal.value = sum + " kcal";
                        };

                        calculate(total_calories);

                    });

                    console.log('returned from write calories data');
                    
                    return data;
                })
                //read data from DB again   
                document.getElementById("find-calories").value = '';    
        }



    // READ FROM DB


    async function getData() {
        console.log('getData function');
        //fetch from api
        await fetch('/profile/info')
            .then(response => response.json())
                .then(data => {
                    //transfer info from one var to another
                    json = data.body;
                    //remove unwanted info
                    for (var i = 0; i < json.length; i++) {
                        delete json[i].id
                        delete json[i].app_user
                    }
                    //empty variables
                    x_labels = [];
                    w_data = [];
                    c_data = [];
                    today = '';
                    weight_today = '';
                    calories_today = '';
                    //populate variables for table
                    data.body.forEach(body => {
                        w_data.push(body.weight);
                        c_data.push(body.calories);
                        x_labels.push(body.timestamp);
                    });
                    //populate date for model
                    today = data.today;

                    //check if weight and calories have any content
                    if (data.data_today[0] == null || data.data_today[0].weight == 0) {
                        //disable add calories button if the weight has not been entered
                        modal_in_insert_calories_btn.setAttribute("disabled", "");
                    } else {
                        //Add Weight
                        weight_today = data.data_today[0].weight;
                        document.getElementById('input-group-w').style.display = "none";
                        modal_in1_W_response.innerHTML = "You have added " + weight_today + " kg for " + today + ".";
                        modal_in1_W_response.style.color = "green";
                        modal_body.appendChild(modal_in1_W_response);
                        //enable add calories button if the weight has been entered
                        modal_in_insert_calories_btn.removeAttribute("disabled", "");
                    }; 

                    if (data.data_today[0] == null || data.data_today[0].calories == 0) {
                        //do something
                    } else {
                        //Add calories
                        calories_today = data.data_today[0].calories;
                        modal_in1_C_response.innerHTML = "You have added " + calories_today + " Kcal for " + today + " already. Feel free to add more!";
                        modal_in1_C_response.style.color = "green";
                        modal_cal_h4.after(modal_in1_C_response);
                    };
                    
                    
                    console.log(today);
                    console.log(weight_today);
                    console.log(calories_today);

                    //do chart 
                    chartIt();
                    //do table
                    //json2Table(json);
                });  
             
    }

    



    //  chart.js open source CHART
    function chartIt() {
        const ctx = document.getElementById('canvas');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: x_labels,
            datasets: [{
                label: "Weight (kg)",
                yAxisID: "A",
                data: w_data,
                borderColor: "#3e95cd",
                fill: false,
                spanGaps: true
                }, { 
                label: "Calories consumed (kcal)",
                yAxisID: "B",
                data: c_data,
                borderColor: "#8e5ea2",
                fill: false,
                spanGaps: true
                }
            ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        fontColor: '#3e95cd',
                    }
                    }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        fontColor: '#8e5ea2',
                    }
                    }]
                },

                title: {
                    display: true,
                    text: 'Calories consumed vs Bodyweight change'
                }

                // This chart will not respond to any event like ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']
                //events: []
            }
        });
    };




    //Get data from db
    getData();


    //Cookie

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




});