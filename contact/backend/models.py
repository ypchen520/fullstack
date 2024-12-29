# import the db instance
from config import db

# create Contact as a database model, represented as a Python class
# a model is a database table
class Contact(db.Model):
    # Class attributes
    # A field is a column in the database table
    # We always need an ID for all of our database instances (primary_key=True means that the ID is unique)
    # First name, last name, email
    # Need to specify the data type of the field
    # String(max_length) is a string field with a maximum length
    # nullable=False means that the field cannot be empty
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        """
        convert the fields to a Python dictionary, 
        so that we can convert it to JSON, 
        which we can pass to the frontend through our API.
        We send and receive data in JSON format.

        JSON: camelCase
        Python: snake_case
        """
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email
        }
