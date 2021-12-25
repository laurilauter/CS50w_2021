import os, json, psycopg2
import requests
import random

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, session, render_template, request, redirect, url_for, flash, jsonify
from flask_session import Session



# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")


app = Flask(__name__)

#config
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"
app.config["JSON_SORT_KEYS"] = False
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))

#index page
@app.route('/')
def index():
    return render_template('index.html', title="Seach for Books", description="Find books that are of interest to you and let people know what you think.")


#login page
@app.route('/login', methods=['POST', 'GET'])
def login():
    #when request is POST
    if request.method == 'POST':
        #take info from form fields
        email = request.form.get('email')
        password = request.form.get('password')
        message = ''
        #select user record from db according to email
        user = db.execute("SELECT * FROM users WHERE email = :email", {"email": email}).fetchone()
        if not email:
            message = 'Insert email'
            flash(message)
            return redirect(url_for('login'))
        elif not password:
            message = 'Insert password'
            flash(message)
            return redirect(url_for('login'))
        #make sure db didn't return None as user
        elif not user:
            print('No such user')
            message = 'No such user'
            flash(message)
            #send unknown user to registration
            return redirect(url_for('register'))
        #password check
        elif not check_password_hash(user[3], password) == True:
            message = 'Wrong password inserted'
            flash(message)
            return redirect(url_for('login'))
        else:
            #log in the user and send to index
            session["username"] = user[1]
            session["user_id"] = user[0]
            session['logged_in'] = True
            message = (f'Hello {user[1]}, you are logged in!')
            flash(message)
            return redirect(url_for('index'))
    else: #if GET request
        return render_template('login.html', title="Login", description="Sign into your account.")


# registration page, if method GET
@app.route('/register')
def register():
    return render_template('register.html', title="Sign up", description="Register your account.")

# method POST
@app.route('/register', methods=['POST'])
def register_post():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    #check if name inserted
    if not name:
        flash('You must have a name')
        return redirect(url_for('register'))
    #check if email inserted
    elif not email:
        flash('You need an email address')
        return redirect(url_for('register'))
    #check if password inserted
    elif not password:
        flash('Password is not optional')
        return redirect(url_for('register'))
    #check for @ and . in email
    elif '@' not in email and '.' not in email:
        flash("Doesn't look like an email address")
        return redirect(url_for('register'))
    #check if email already in db
    elif db.execute("SELECT email FROM users WHERE email = :email", {"email": email}).fetchone():
        flash(f"Well, {email} is already registered, log in instead.")
        return redirect(url_for('login'))
    else:
        #hash the password
        hpassword =  generate_password_hash(password, "sha256")
        #insert registration data
        db.execute("INSERT INTO users (name, email, password) VALUES (:name, :email, :hpassword)",
                   {"name": name, "email": email, "hpassword": hpassword})
        db.commit()
        flash(f"Success, {email} has been registered.")
    #If registration sucessfull, send to login
    return render_template('login.html', title="Login", description="You registered your account. Proceed with login.")

#search page
@app.route('/books', methods=['POST', 'GET'])
def books():
    #check if logged in
    if session.get('logged_in'):

        if request.method == 'POST': #if POST
            #harvest form fields
            whatcol = request.form.get('whatcol')
            search = request.form.get('search')
            searchfor = request.form.get('search')
        
            #looking for title
            if whatcol == 'title':
                search = search.title()
                booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE title LIKE :title ORDER BY title ASC LIMIT 50", {"title": search}).fetchall()
                db.commit()
                if booksfound == []:#couldn't find a match, check partial now
                    search = "%" + request.form.get('search') + "%"
                    booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE title LIKE :title ORDER BY title ASC LIMIT 50", {"title": search}).fetchall()
                    db.commit()
                    description = (f'You were looking for the: {whatcol} - {searchfor}')
                    return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)
                else:
                    description = (f'You were looking for the: {whatcol} - {searchfor}')
                    return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)
            #looking for author
            elif whatcol == 'author':
                booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE author LIKE :author ORDER BY author ASC LIMIT 50", {"author": search}).fetchall()
                db.commit()
                if booksfound == []:#couldn't find a match, check partial now
                    search = "%" + request.form.get('search') + "%"
                    booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE author LIKE :author ORDER BY author ASC LIMIT 50", {"author": search}).fetchall()
                    db.commit()
                    description = (f'You were looking for the: {whatcol} - {searchfor}')
                    return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)
                else:
                    description = (f'You were looking for the: {whatcol} - {searchfor}')
                    return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)

            elif whatcol == 'year':
                search = "%" + request.form.get('search') + "%"
                booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE year LIKE :year ORDER BY year ASC LIMIT 50", {"year": search}).fetchall()
                db.commit()
                description = (f'You were looking for the: {whatcol} - {searchfor}')
                return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)

            else:
                search = "%" + request.form.get('search') + "%"
                booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE isbn LIKE :isbn ORDER BY isbn ASC LIMIT 50", {"isbn": search}).fetchall()
                db.commit()
                description = (f'You were looking for the: {whatcol} - {searchfor}')
                return render_template('books.html', titlep="Seach for Books", description = description, booksfound = booksfound)

        else: #if method GET
            search = str(random.randint(1599, 2016))
            booksfound = db.execute("SELECT id, title, author, year, isbn FROM books WHERE year > :year ORDER BY year ASC LIMIT 50", {"year": search}).fetchall()
            db.commit()
            return render_template('books.html', titlep="Seach for Books", description="Please insert some full or partial keyword to start looking for books.", booksfound = booksfound)
    #cn't search if not logged in
    else:
        flash("Please log in to view this page.")
    return redirect(url_for('login'))


#book info page
@app.route('/book/<int:book_id>', methods=['POST', 'GET'])
def book(book_id):

    if request.method == 'GET': #if request is GET

        #get book info from db
        book_query = db.execute("SELECT * FROM books WHERE id = :id",
                 {"id": book_id}).fetchone()
        db.commit()
        if book_query is None:
            return redirect(url_for('error'))
        booklist = list(book_query)
        
        #get reviews from db
        reviews = db.execute("SELECT name, review, rating FROM reviews WHERE book_id = :book_id",
                     {"book_id": book_id}).fetchall()
        db.commit()
        if reviews is None:
            return redirect(url_for('error'))

        #Lets import stuff from Goodreads now
        binf_query = requests.get("https://www.goodreads.com/book/review_counts.json", params={"key": "oNRNDNXgMGCsgraq74l4zA", "isbns": book_query[1]})
        if binf_query.status_code != 200:
            raise Exception("ERROR: API request unsuccessful.")

        res =  binf_query.json()
        #clean the json, make anice dictionary
        res = res['books'][0]
        #extract avg rating and review count
        avr = (res['average_rating'])
        rwc = (res['reviews_count'])
        #add rating and review count to booklist
        booklist.append(avr)
        booklist.append(rwc)

        return render_template("book.html", titlep="Book details and reviews", description="Here you find book detail and reviews.", booklist=booklist, reviews=reviews)
    


    else: #its a POST request
        name = session.get('username')
        rating = request.form.get('rating')
        review = request.form.get('review')
        print(f'{name} {rating} {review}')
        #Check if there is a review with current book_id for this user
        rev_done = db.execute("SELECT book_id FROM reviews WHERE name = :name AND book_id = :book_id",
                     {"name": name, "book_id": book_id}).fetchone()
        db.commit()


        if rev_done is None:  #No reviews yet, let it pass
            isbn_q = db.execute("SELECT isbn FROM books WHERE id = :book_id",
                     {"book_id": book_id}).fetchone()
            isbn = isbn_q[0]
            db.execute("INSERT INTO reviews (name, rating, review, book_id, isbn) VALUES (:name, :rating, :review, :book_id, :isbn)",
                {"name": name, "rating": rating, "review": review, "book_id": book_id, "isbn": isbn})
            db.commit()
            return redirect(url_for('book' ,book_id=book_id))


        else: #already reviwed this book
            flash(f"Sorry, {name} you already reviewed this book.")
            return redirect(url_for('book' ,book_id=book_id))


#error page
@app.route('/error')
def error():
    errormsg = 'There are no books with this ID.'   
    return render_template("error.html", titlep="Error page", description="Something went wrong here.", errormsg=errormsg)


#logout
@app.route('/logout')
def logout():
    if not session.get('logged_in'):
        print('nobody logged in')
        return redirect(url_for('login'))
    else:
    #clear session
        session['logged_in'] = False
        session.clear()
        message = "You are logged out."
        flash(message)

    return render_template('index.html', title="Seach for on Books", description="Search for books and let people know what you think. Please log in to proceed.", login="Login", login_guide="Log into your account.")



#api route
@app.route("/api/<book_isbn>", methods=['GET'])
def book_api(book_isbn):


    # get book info
    book_query = db.execute("SELECT title, author, year, isbn FROM books WHERE isbn = :isbn",
             {"isbn": book_isbn}).fetchone()
    db.commit()
    if book_query is None:
        return jsonify({"error": "Invalid book ISBN"}), 422
    print(book_query)
    bookinf = list(book_query)
    print(bookinf)


    # Get review info, if none, then make it 0
    rev_count = db.execute("SELECT COUNT(review) FROM reviews WHERE isbn = :isbn",
            {"isbn": book_isbn}).fetchone()
    rate_avg = db.execute("SELECT AVG(rating) FROM reviews WHERE isbn = :isbn",
            {"isbn": book_isbn}).fetchone()
    db.commit()

    #remove the tuple
    rev_count = rev_count[0]

    # set None to 0
    if rev_count is None:
        rev_count = 0
    # set None to 0
    if rate_avg[0] is None:
        rate_avg = (0.0,)
    #conv for json
    rate_avg = float('%.2f'%(rate_avg[0]))

    return jsonify({
                "title": bookinf[0],
                "author": bookinf[1],
                "year": bookinf[2],
                "isbn": bookinf[3],
                "review_count": rev_count,
                "average_score": rate_avg,
                })



if __name__ == '__main__':
    app.run()
