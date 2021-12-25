# Project 1

Web Programming with Python and JavaScript

Project1 - Lauri Lauter - April 2020

- CSV import was performed with import.py located in the CSV_import folder.

- Passwords are hashed with Werkzeug

- werkzeug.contrib was too new for the provided app to run, had to install earlier verion (1.15) to be able to run.

- set DATABASE_URL=postgres://jbzqdcmkqlzbxd:b8790a9750bff99429c258ca9498539b43a0fed90bfcac953cd07aac1fb4d7af@ec2-54-75-231-215.eu-west-1.compute.amazonaws.com:5432/d6j68k4teo7mjr

- /api/<isbn> returns data from my database and not from Goodreads. In my database review_count and average_score are quite often 0. The requirements don't mention Goodreads here.
    However, this is probably doable. After receiving an API request I would send a request to Goodreads and serv the results as part of my own API to my customer.

- Thanks
