# Figure out what are the different endpoint/routes I want for my API to access different data resources, to create resources, etc.
# CRUD: Create, Read, Update, Delete

# Create
# localhost:5000/create_contact
# [copilot] localhost:5000/api/contacts (POST)
# - first name
# - last name
# - email

# import request and jsonify from flask
# jsonify: convert a Python dictionary to a JSON object, allowing us to return a JSON response
from flask import request, jsonify 

# import the app and the db from config
# from models import the Contact model
from config import app, db
from models import Contact

# GET medthod
# use a decorator to create a new route
# specify the route and the methods (a list of methods, e.g., GET, POST, etc.) that are allowed
# then define a function that will be executed
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # get all of the contacts from the database using the query attribute of the Contact model (inherited from db.Model)
    # the type of the query attribute is a query object (sqlalchemy.orm.query.Query)
    # the .all() method returns all of the contacts in the database
    # these contacts are Python objects
    # we need to convert these Python objects to JSON objects
    # use map(function, list): apply a function to all of the elements in a list and return a map object (so we need to convert it to a list)
    contacts = Contact.query.all() # a list of Contact objects (Python objects)
    json_contacts = list(map(lambda contact: contact.to_json(), contacts))
    return jsonify({"contacts": json_contacts}), 200

# POST method: creating a new contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    # We need to get the data associated with the contact we want to create
    # By using the request object, we can get the data that was sent to the server
    # The data is submitted as a JSON object via the request body
    # request.json is a dictionary that contains the data that was sent to the server
    payload = request.json

    # request.json.get("key") is a way to get the value associated with a key in a dictionary
    # Always use the .get() method to avoid KeyError exceptions.
    # If the key does not exist, the .get() method will return None.
    first_name = payload.get("firstName")
    last_name = payload.get("lastName")
    email = payload.get("email")
    
    # If one of the fields is missing, return an error message and a status code of 400 (Bad Request)
    # "You must include a first name, last name, and email."
    if not first_name or not last_name or not email:
        return jsonify({"message": "You must include a first name, last name, and email."}), 400

    # Otherwise, create a new contact object
    # id will be automatically generated by the database
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

    # Then, add the new contact object to the database using db.session.add()
    # We use db.session for tracking changes, managing transactions, etc.
    # Here, we're adding a Python object to the database
    # Once it's added, it's in the staging area, and we need to commit the changes to the database using db.session.commit()
    # Put this in a try/except block to catch any exceptions that might occur
    # If an exception occurs, we respond with an error message (str(e)) and a status code of 500 (Internal Server Error)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    # If we successfully create the contact, we return a success message and a status code of 201 (Created)
    # "User created successfully!"
    return jsonify({"message": "User created successfully!"}), 201

# When we're updating a contact, we need to know which contact we're updating
# We need to specify the ID of the contact we want to update
# We can get the ID from the URL: /update_contact/<int:user_id>
# We can use the <int:user_id> syntax to specify that the user_id is an integer
# The variable name for the function parameter should match the variable name for the path parameter in the URL
@app.route("/update_contact/<int:user_id>", methods=["PATCH"]) # PUT?
def update_contact(user_id: int):
    # get the contact from the database using the user_id
    # using Contact.query.get(user_id)
    contact = Contact.query.get(user_id)

    # if the contact does not exist, return an error message and a status code of 404 (Not Found)
    # "User not found"
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    # get the new data for the contact from the request body (request.json)
    payload = request.json

    # update the contact object with the new data using .get(field, default_value)
    # if the field is not present in the request, keep the original value
    contact.first_name = payload.get("firstName", contact.first_name)
    contact.last_name = payload.get("lastName", contact.last_name)
    contact.email = payload.get("email", contact.email)
    
    # commit the changes to the database (since the contact already exits, it's already in the session)
    db.session.commit()

    # if we successfully update the contact, return a success message and a status code of 200 (OK)
    # "User updated successfully!"
    return jsonify({"message": "User updated successfully!"}), 200

# When we're deleting a contact, we need to know which contact we're deleting
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id: int):
    # get the contact from the database using the user_id
    contact = Contact.query.get(user_id)

    # if the contact does not exist, return an error message and a status code of 404 (Not Found)
    # "User not found"
    if not contact:
        return jsonify({"message": "User not found"}), 404

    # delete the row/contact from the session and commit the change
    db.session.delete(contact)
    db.session.commit()

    # "User deleted successfully!", 200
    return jsonify({"message": "User deleted successfully!"}), 200

if __name__ == "__main__":
    # check if we're running this script directly
    # this avoids running the app when we're importing this script

    # when we about to start the application
    # we're going to get the context of our application [TODO: context manager]
    with app.app_context():
        # instantiate our database
        # create all of the models (tables) in the database
        db.create_all()

    # run the app with debug mode enabled
    # this will run all of our different endpoints and our API
    app.run(debug=True)
