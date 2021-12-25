import os
import csv
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


engine = create_engine("postgres://jbzqdcmkqlzbxd:b8790a9750bff99429c258ca9498539b43a0fed90bfcac953cd07aac1fb4d7af@ec2-54-75-231-215.eu-west-1.compute.amazonaws.com:UCANTSEEME")
UCANTSEEME '5432/d6j68k4teo7mjr'

#engine = create_engine(os.getenv("DATABASE_URL")) # database engine object from SQLAlchemy that manages connections to the database
                                                    # DATABASE_URL is an environment variable that indicates where the database lives
db = scoped_session(sessionmaker(bind=engine))    # create a 'scoped session' that ensures different users' interactions with the
                                                    # database are kept separate


#create books table first, can't reference to it otherwise
db.execute("CREATE TABLE IF NOT EXISTS books (id SERIAL PRIMARY KEY, isbn VARCHAR NOT NULL, title VARCHAR NOT NULL, author VARCHAR NOT NULL, year VARCHAR NOT NULL)")
db.execute("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, email VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL)")
db.execute("CREATE TABLE IF NOT EXISTS reviews (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, review VARCHAR NOT NULL, book_id INTEGER NOT NULL REFERENCES books1, rating NUMERIC NOT NULL, isbn VARCHAR NOT NULL)")
print("Tables ready")


def main():
    f = open("CSV_import/books.csv")
    reader = csv.reader(f)
    next(reader, None) #Skip the first line
    for isbn, title, author, year in reader: # loop gives each column a name
        db.execute("INSERT INTO books1 (isbn, title, author, year) VALUES (:isbn, :title, :author, :year)",{"isbn": isbn, "title": title, "author": author, "year": year}) # substitute values from CSV line into SQL command, as per this dict
        print(f"Added: {isbn}")
    db.commit()


if __name__ == "__main__":
    main()
