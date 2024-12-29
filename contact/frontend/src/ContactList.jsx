import React from "react";

// Display a list of contacts using HTML table
// Pass the contacts array as a prop

// updateContact: whenever we want to update a contact, we'll call this function with the contact we want to update
// updateCallback: whenever we perform an update, we'll call the updateCallback

// function ContactList({contacts}) {
const ContactList = ({contacts, updateContact, updateCallback}) => {
  // define a function (onDelete) for deleting a contact 
  // we need the id of the contact we are deleting (so the function takes in the id)
  // we need to send a quest:
  // specify: 
  // the url: "http://127.0.0.1:5000/delete_contact/${id}"
  // the options: method (we don't need the headers and the body)
  // use the try...catch statement, and so we need to set the function as an async function
  // use fetch(url, options)
  // check the status of the response:
  // if === 200: updateCallback()
  // else: console.error:
  // "Failed to delete" or get the payload and display the message ("User not found" if it's 404)
  // catch(e): alert(e)
  const onDelete = async (id) => {
    const url = `http://127.0.0.1:5000/delete_contact/${id}`
    const options = {
      method: "DELETE"
    }
    try {
      const response = await fetch(url, options)
      if (response.status === 200) {
        updateCallback()
      } else {
        const payload = await response.json()
        console.error(payload.message)
      }
    } catch (e) {
      alert(e)
    }
  }

  // return a <div>
  // add a header (h2) called "Contacts"
  // create a table (<table>)
  // add a table head (<thead>)
  // within the table head, add a table row (<tr>)
  // in the row, we need our table headers (<th>): First Name, Last Name, Email, Actions
  // then, add a table body (<tbody) that is going to be dynamically rendered (using contacts.map())
  // whenever you have a dynamic data, you need to specify the key
  // for each contact,
  // create a table row (<tr>) and set the key prop to contact.id
  // in the row, create 4 table data (<td>): firstName, lastName, email, and two buttons (Update, Delete)

  // onClick for the Update button: call the updateContact function and pass in the contact (that we're updating)
  return <div>
    <h2>Contacts</h2>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>
              <button onClick={() => {updateContact(contact)}}>Update</button>
              <button onClick={() => {onDelete(contact.id)}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

// export the component so that it can be imported
export default ContactList