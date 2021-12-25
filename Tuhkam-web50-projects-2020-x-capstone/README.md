# CS50W Capstone project - Foodie
#### by Lauri Lauter

### Overview
Foodie is a web app that lets the user insert their weight and calories. It will help the user to understand the relationship between their calorie intake and weight variation. The main idea is to make the user aware of the relationship between daily calorie intake and the resulting body weight trend.

### Distinctiveness and Complexity
* I searched on youtube for CS50W projects that would be similar to this, but couldn't find any.
* The project uses Django (with two models) on the back-end and Javascript on the front-end. The app is mobile responsive. I wanted to use a JavaScript charting library and make it mobile responsive. Using the Nutrition Facts API adds a level of complexity to the app. 


### Technical details

* The app uses Django on the back-end. One of the main roles of Django here is to provide an API for the Javascript front-end, and to handle database operations using models.
* The front-end is built using Javascript and a minimal amount of Jinja.
* The design and mobile-responsiveness is implemented using Bootstrap and a bit of custom CSS.

### Files created
* The folder **capstone/** is the main project folder.

* The folder **foodie/** contains the following folders and files that are essential for the app to work.

    * **static/foodie/** contains static files for the app
        * **images** folder
        This folder contains all the static images for the app
            * **favicon.ico** tab icon file
            * **foodscale_bw.png** image file for the cover page
        * **script.js** this is the main javascript file that is used for the front-end of the user profile page. It generates most of the HTML code used on the page and it's also responsible for fetching data from the back-end and displaying it on the page.
        * **script_index.js** this javascript file handles the overview page of the app, displaying all users in a list.
        * **style.css** this CSS file contains a small amount of styling data. A big portion of styling is done with javascript directly.

    * **templates/foodie/**
    This folder contains HTML templates for the page
        * **index.html** this is the body part of the opening page
        * **layout.html** this is the so-called frame of the page. All other templates are nested inside this. layout.html also contains the head tag and all the links to the scripts. The template also contains the navbar code.
        * **login.html** page for the login form.
        * **profile.html** page for the user's profile page.
        * **register.html** page for the registration form.

    * **admin. py** I registered the models for the app.
    * **apps. py** needed for application configuration.
    * **models. py** contains two models for the app.
    * **tests. py** tests for the app. This app has no meaningful tests there.
    * **urls. py** mapping between URL path expressions to app's views.
    * **views. py** contains all views, as well as all back-end logic.
    
    
* **db.sqlite3** is the database file for the app.
* **requirements.txt** contains all the required packages for the project.
* **README. md** is the file at hand, describing the project.

### How to use it

* The user has to sign up and log in first.
* Then they will be directed to an overview screen that lists all the users.
* In the top right corner (or in the mobile menu) there is a link to the user's profile page.
    *  Once on the profile page the user can see their data on a chart (using Chart.js).
    *  To enter data press the blue "+" sign below the chart, this will open a modal window.
        *  In the modal window the user should first insert the weight for that day. A good idea would be to do it in the morning. After inserting the weight it's possible to insert calories.
        *  Calories can be inserted in two ways as many times as the user needs.
            * If the user knows the calories it's possible to insert them directly in the bottom of the modal window.
            * If the amount of calories is unknown, the user can insert food items and amounts. The app will return the amount of calories. This part of the app uses calorieninjas.com Nutrition Facts API. This API is very liberal regarding the input. It reads easily any food item in any unit or term of measure, even common meals are no problem.
            * The data returned by the API is listed and the rows can be discarded one by one, if something is off.
            * If "Add Calories" is pressed the data is inserted into the database. The user can add more calories or close the window.
    * On top of the profile page the user can add some info visible to other users. This could be an introduction or info related to goals.
* The profile images of users are fetched from gravatar.com using the email address the user  provided at when signing up.


### Additional information
The project was quite challenging and took a lot longer than I anticipated. I think I learned a lot during the process. Planning the app is as important as coding it, if not more so.
