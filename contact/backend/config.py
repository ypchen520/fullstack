## Import the required libraries
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

## Initialize the Flask app and enable cross-origin resource sharing (CORS)
app = Flask(__name__)
CORS(app)

## Initialize database things
## Specify the location of the local SQLite database
## Essentially, we're storing a file
## For now, we're not going to track modifications to the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

## Create a database instance
db = SQLAlchemy(app)