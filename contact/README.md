# Contact List

Welcome to my repository of notes on practicing a full stack application built from [Tech With Tim](https://www.youtube.com/@TechWithTim)'s tutorial!

The idea here is simple: the comments in the code are your guide to a quiz-like challenge. You can strip the code down to its bare bones, rely on the comments to piece it back together, and recreate the app from scratch. It's a hands-on way to test your skills—no AI autocomplete spoon-feeding you the answers!

Personally, I find this method way more effective (and fun!) than passively practicing. Hopefully, you’ll find it just as helpful. Dive in and happy coding! (Refined by ChatGPT-4o)

- Source: [Python + JavaScript - Full Stack App Tutorial](https://www.youtube.com/watch?v=PppslXOR7TA) by [Tech With Tim](https://www.youtube.com/@TechWithTim) 
- Create a `backend` folder
- Build the API/backend first
  - The structure of the application
  - The available operations

## Backend

CRUD: Create, Read, Update, Delete

Endpoints (routes)
- Can be called by any frontend (doesn't have to be React app)

Files
- `main.py`
  - Main endpoints
- `models.py`
  - Database models
    - How we interact with the database
    - A Python class represents an entry/a row in the database
- `config.py`

Packages
- Flask
- Flask-SQLAlchemy
  - ORM (Object Relational Mapping)
    - Map the entries in SQL into objects in Python so we can operate on the objects
  - An ORM tool is a library that provides a layer of abstraction between your Python application and the database. It allows you to interact with the database using Python objects and syntax, rather than writing raw SQL queries.
  - By using SQLAlchemy, you can write database-agnostic code that can work with multiple databases, without having to worry about the underlying SQL syntax.
- flask-cors
  - Enables cross-origin resource sharing (CORS) in your Flask app to allow resources to be accessed from different origins.

Start with `config.py`:
- Know the different pieces of data we're going to be working with
- So start with basic configuration

Next, we work with `models.py`, so we know: 
- What fields we need
- How we are adding them and deleting them
- Different keys we might want to check

Start with data, and then create views that allow us to create/modify that data

### `config.py`

`__name__`:
- A special Python variable that holds the name of the current module (the script being executed).
- When a script is run directly, `__name__` is set to `"__main__"`.
- Flask uses this to determine:
  - The root path of the application (for locating resources like templates and static files).
  - Whether the script is being executed directly or imported as a module.

`app = Flask(__name__)`:
- Creates an instance of the `Flask` class, naming the application based on the current module.
- This instance (`app`) is used to define routes, handle requests, and configure the application.

### `models.py`

In SQLAlchemy, setting `primary_key=True` on a column means:
- Primary Key: The column is designated as a primary key for the table.
- Uniqueness: The column's values must be unique across all rows in the table.
- Not Null: The column cannot contain NULL values (SQLAlchemy enforces this implicitly).
- Indexing: The database automatically creates an index for faster lookups based on this column.
- Row Identification: The column uniquely identifies each row in the table.

For SQLAlchemy models:
- Use class attributes to define the structure and constraints of the database table.
- Use instance attributes for storing data in individual objects representing rows in the table.

```Python
# Defining the table schema (class attributes)
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Creating an instance of Contact (instance attributes)
contact = Contact(first_name="John", last_name="Doe", email="john.doe@example.com")
```

What's Happening Behind the Scenes
- Class Attributes Define the Schema: When you define class attributes like `id`, `first_name`, etc., SQLAlchemy uses these definitions to:
  - Create a mapping between the class and a database table.
  - Specify the table's columns and their properties (like type, constraints, etc.).
- Instance Attributes Are Created When You Initialize an Object: When you create an instance of the `Contact` class, SQLAlchemy automatically initializes the instance attributes (`self.id`, `self.first_name`, etc.) using the class attribute definitions. These attributes are tied to the corresponding columns in the database.

To avoid accidentally changing class attributes: Always access attributes using instance variables (`new_contact.email`) instead of class variables (`Contact.email`).

### `main.py`

When we create an API, what we typically have is a server that's running the API. And the server has some kind of an address: the domain or the server's URL.

The endpoint is anything that comes after the domain

`localhost:5000/home`: the endpoint is `home`

1. Spin up the database
2. GET method
3. POST method (create)
4. PATCH method (update)
5. DELETE method

Usually we want to test our API before starting working on the frontend
- Postman
- cURL
- Thunder Client (VS Code Extension)
- Insomnia

#### Context manager, `with app.app_context():`

#### Decorator

### Request and Response

Request: anything we send to some kind of server
- type:
  - GET: access some type of resource
  - POST: create something new
  - PUT/PATCH: when you want to update something
  - DELETE
- json:
  - information comes alongside the request that can be used when we're handling the request
  - e.g., what contact to delete, data needed to create a contact

Response:
- status
  - 200: Success
  - 404: Not found
  - 400: Bad request
  - 403: Unauthorized
- json:
  - e.g., when we want to get a contact, this contains what the contact is

### `jsonify()`

When you call `jsonify()` and pass in a Python object, such as a dictionary or a list, it:
1. Converts the object into a JSON string.
2. Sets the `Content-Type` header of the response to application/json.
3. Returns a `Response` object that can be sent back to the client.

### `request.json.get("key")`

1. KeyError exceptions
If the key doesn't exist in the request data, using `request.json["key"]` will raise a KeyError exception. In contrast, using `.get()` methods (e.g., `request.json.get("key")`) returns None by default if the key is missing.
2. Lack of default values
With dictionary-like syntax, you can't provide a default value if the key is missing. The `.get()` method allows you to specify a default value as a second argument.
3. Reduced readability
Using dictionary-like syntax can make your code less readable, especially when working with nested data structures.

## Frontend

`npm create vite@latest frontend`
`npm install`

Goal: be able to interact with the backend by pressing buttons, using input fields, etc.

Remove unnecessary files:
assets/
public/vite.svg

`App.jsx`:
```
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// const [count, setCount] = useState(0)
```
only keep the fragment:
```
return (
    <>
    </>
  )
```

`index.html`:
reference to the logo: `<link rel="icon" type="image/svg+xml" href="/vite.svg" />`
Change title

### Fetch the Contacts

#### What is `fectch()`?

`fetch()` is a part of the Fetch API, which is a set of APIs for fetching resources across the network.

Browser Support
`fetch()` is supported by most modern web browsers, including:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

#### `useEffect()` Hook


`useEffect` is a powerful Hook in React that allows you to run side effects, such as making API calls, setting timers, or updating the DOM, after rendering a component.

What is a side effect?
A side effect is an operation that affects other components, the DOM, or external resources, such as:
- Making an API call to fetch data
- Setting a timer or interval
- Updating the DOM directly
- Using a third-party library

Dependencies
The second argument to `useEffect` is an array of dependencies. When any value in this array changes, the effect is re-run.
- Empty array: If the array is empty, the effect is only run once, after the initial render.
- Values: If the array contains values, the effect is re-run whenever any of these values change.

#### Notes

Can not do: `data = await fetch("http://127.0.0.1:5000/contacts").json()`

Why not?
- The reason is that fetch() returns a `Promise` that resolves to a `Response` object, and `json()` is a method on that `Response` object.
- When you call `fetch("http://127.0.0.1:5000/contacts").json()`, you're essentially calling `json()` on the `Promise` returned by `fetch()`, not on the `Response` object.

### Display Contacts

New component (a function) in the `src` folder: ContactList.jsx

#### Notes

In JavaScript, when you define an arrow function with a single expression as its body, you can omit the curly brackets `{}` and the `return` keyword. The function will return that single expression

#### Exports

You use curly braces (`{}`) when importing named exports, and you omit them when importing default exports.

Named Exports:
- Multiple values can be exported from a single file.
- You use curly braces to specifically import the desired named exports.
```JS
// In ContactList.jsx 
export const Contact = () => { ... }; 
export const ContactForm = () => { ... };

// In App.jsx
import { Contact, ContactForm } from './ContactList';
```

Default Exports:
- Only one value (component, function, etc.) can be the default export from a file.
- You omit the curly braces when importing the default export.
```JS
// In ContactList.jsx
export default function ContactList() { ... } 

// In App.jsx
import ContactList from './ContactList';
```

### Add the Form for Creating, Updating, and Deleting Contacts

Create another component: `ContactForm.jsx`

#### Forms

**1. Basic Structure**

* **`label`:** This element acts as a visual indicator for the associated input field. It provides context to the user about what kind of information should be entered.
* **`input`:** This element is where the user actually enters data. It can take various forms depending on the `type` attribute (e.g., text, number, checkbox, radio).

**2. Key Concepts**

* **`for` attribute in `label`:** This attribute is crucial for linking the `label` to its corresponding `input` element. The value of `for` should match the `id` of the `input` element. This creates an association between the two, allowing users to click on the label to focus on the input field (accessibility feature).

**3. Example**

```jsx
<form>
  <label htmlFor="username">Username:</label>
  <input type="text" id="username" name="username" />

  <label htmlFor="email">Email:</label>
  <input type="email" id="email" name="email" />

  <button type="submit">Submit</button>
</form>
```

**Explanation:**

* In this example:
    * The first `label` has `htmlFor="username"`.
    * The corresponding `input` has `id="username"`.
    * This association allows users to click on "Username:" to focus on the username input field.
* Similar linking exists for the "Email" label and its input.

**4. Benefits of Using `label`**

* **Accessibility:** Improves accessibility for users with screen readers or motor impairments.
* **User Experience:** Provides a clear visual connection between the label and the input field, making the form easier to understand and use.
* **Maintainability:** Makes it easier to maintain and update the form's structure and labels.

**5. Important Notes**

* The `name` attribute in the `input` element is essential for submitting form data to the server.
  * While the name attribute is often used, it's not always necessary in React when you're managing form state and submission within the component itself. You can effectively handle form interactions without relying on the name attribute.
* You can use different `input` types (text, number, checkbox, radio, etc.) depending on the type of data you need to collect.
* For complex forms, consider using a form library like Formik or React Hook Form to manage state, validation, and other form-related logic.

I hope this explanation is helpful! Let me know if you have any further questions.

#### Only Display the Form if Create or Update is Clicked (`App.jsx`)

**Modal**
- Pop the form up in a modal
- A little window that's hovering on top of the screen

**CSS**
Class Selector (`.`): A class selector is used to select elements that have a specific `class` attribute. The `class` attribute is defined in the HTML element.

Tag/Element Selector (no dot): A tag selector is used to select all elements of a specific type.

Key differences
- Specificity: Class selectors have a higher specificity than tag selectors, meaning they override styles applied by tag selectors.
- Reusability: Class selectors can be reused across multiple elements, while tag selectors apply to all elements of the same type.
- Flexibility: Class selectors provide more flexibility, as you can add or remove classes from elements dynamically.

CSS properties: `margin` vs. `padding`

![margin vs. padding](./margin-padding.png)

`index.css`:
- Where we specify the general stype of a certain tag (e.g., <input>)

#### Updating the Contact

Inside our ContactList component, when we click on the Update button, we need to go back into the App component, and indicate what that contact (the one that's being updated) is, and then open the modal using that contact.

Inside our ContactList component, the Update button is going to tell the main App component that we want to edit a contact. Inside the App component, it's going to open up a modal, and then we need to pass that contact to the contact form. The ContactForm will allow us to edit that contact.

Inside the `ConctactForm.jsx` file, we're going to take in some props.

#### Props (use curly brackets)

**Destructuring**

**Default parameter**

**Callback funtion**