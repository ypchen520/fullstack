import { useState } from "react"

// props:
// existing contact: existingContact = {} (empty object)
// updateCallback

const ContactForm = ({existingContact = {}, updateCallback}) => {
  // Create states to store: first name, last name, email
  // Show existingContact if it's not empty
  // Use || as a shortcut
  // if existingContact is an empty object, existingContact.firstName will give us an undefined
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  // Create a boolean value to indicate whether we're updating or creating
  // The only thing we really need to change is the url
  const updating = Object.entries(existingContact).length !== 0

  // create a function to handle the form submission, onSubmit, and then assign this function to the onSubmit prop of the <form> tag
  // we're not using an inline arrow function because we have other things to run
  // e.preventDefault: avoid refreshing the page automatically
  // set up a POST request:
  // define the data we want to pass in JSON format (as a JS object), we still need to convert it to JSON
  // specify the url: "http://127.0.0.1:5000/create_contact"
  // set up options for our request (when we're sending a GET request, these are automatically done):
  // method: "POST"
  // headers (an object): 
  // Content-Type: "application/json" (specifying that we're submitting JSON data)
  // body:
  // JSON.stringify(JS object)
  // then we're going to send our request using fetch() (this is an async function):
  // since we're using await here, we need to turn this onSubmit function into an async function
  // fetch(url, options)
  // try:
  // if response !== 201 || response !== 200:
  // get the payload: await response.json()
  // alert(payload.message)
  // else: do something
  // catch:
  // the Promise return by fetch() is rejected


  const onSubmit = async (e) => {
    e.preventDefault()

    // const data = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email
    // }
    // if the property name is the same as the variable name, you can omit the colon and the value.
    const data = {
      firstName,
      lastName,
      email
    }
    // append (using the + operator) dynamic endpoint to our url:
    // (using the Ternary Operator: condition ? expressionIfTrue : expressionIfFalse)
    // if updating contact (updating): "http://127.0.0.1:5000/update_contact/id"
    // use `${exsitingContact.id}` for getting the id from exsitingContact and appending it to a string
    // if creating contact (!udating): "http://127.0.0.1:5000/create_contact"
    // const url = "http://127.0.0.1:5000/create_contact"
    // adding parenthesis for readability (not necessary)
    const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
    const options = {
    //   method: "POST", // need to change this based on if we're updating
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    try {
      const response = await fetch(url, options)
      if (response.status !== 201 && response.status !== 200) {
        const payload = await response.json()
        // alert(payload.message)
        console.error(payload.message)
      } else {
        // successful
        // call updateCallback: we didn't create or update, close the modal for us, 
        // and allow us to update the data we see from the contact list
        updateCallback()
      }
    } catch (e) {
      alert("Something went wrong!")
      console.log(e)
    }
  }

  // create a form
  // use <div> to create the first input element
  // <label>: htmlFor
  // <input> type=text, id, value, 
  // onChange: set, e.target.value
  // <button> (Create Contact), type=submit
  return <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input 
        type="text" 
        id="firstName" 
        value={firstName}
        onChange={(e) => {setFirstName(e.target.value)}} 
      />
    </div>
    <div>
      <label htmlFor="lastName">Last Name:</label>
      <input 
        type="text" 
        id="lastName" 
        value={lastName}
        onChange={(e) => {setLastName(e.target.value)}}
      />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input 
        type="text" 
        id="email" 
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
      />
    </div>
    {/* dynamic rendering needed for creating or editing/updating */}
    {/* <button type="submit">Create Contact</button>  */}
    <button type="submit">{updating ? "Update Contact" : "Create Contact"}</button> 
  </form>
}

// export the component
export default ContactForm