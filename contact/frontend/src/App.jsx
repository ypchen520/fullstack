import { useState, useEffect } from 'react'
// import the ContactList component (default export)
// import { ContactList } from './ContactList'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import './App.css'

function App() {
  // set up a state to store the contacts
  // useState([]) is the initial value of the state
  const [contacts, setContacts] = useState([])
  // const [contacts, setContacts] = useState([{"firstName": "Yu-Peng", "lastName": "Chen", "email": "ypchen520@gmail.com"}])
  // define a state for the modal's status (close/open)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // define a state for storing the current contact we're editing
  // this is needed so that we can access this current contact from the JSX we're returning
  const [currentContact, setCurrentContact] = useState({})


  // we just want to fetch the contacts ONCE when the component is mounted
  // se we can use the useEffect hook (as soon as this component renders, run this)
  // useEffect takes in a callback function
  useEffect(() => {
    // call the fetchContacts function
    fetchContacts()
  }, []) // the dependencies array is empty, meaning the effect is only run once, after the intial render

  // define an async function for fetching contacts
  const fetchContacts = async () => {
    // fetch(URL)
    const response = await fetch("http://127.0.0.1:5000/contacts")
    // get the json data from the response (.json() is also an async method)
    const data = await response.json()
    // set the contacts
    setContacts(data.contacts)
    // log the contacts
    // console.log(data.contacts)
  }
  
  // define a function for closing modal (closeModal)
  // when we close the modal, we need to set the current contact to be an empty object
  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  // define a function for opening the modal (openModal) for creating and editing
  // const openModal = () => {
  //   if (!isModalOpen) setIsModalOpen(true)
  // }

  // define a function for opening the modal (openCreateModal) for creating
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  // define a function for opening the modal (openEditModal) for editing
  // open the modal with our contact (so passing in the contact)
  // set the currentContact as the contact we pass in
  // set the isModalOpen to true
  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // define a function (onUpdate) that will be called whenever we perform an update
  // it will close the modal (set isModalOpen to false and set currentContact to empty) and
  // fetch the contact list 
  // (remember we use useEffect with no dependencies, so the contact list will only be fetched upon intial rendering)
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  // return the ContactList component and pass the contacts as a prop
  // render the ContactForm --> we want to make it that we only see the form if we click Create or Update
  // create a fragment
  // use && as a shortcut operator for if-statement {boolean && expression}
  // create a button (Create New Contact), onClick={openModal}
  // use className for CSS
  // <div>: className="modal"
  // <div>: className="modal-content"
  // <span>: className="close", onClick={closeModal}
  // Yes, the <span> tag can have the onclick attribute
  // inside the span put &times; (this represents the x button)

  // Now, we need to pass existing data to the contact form if we're updating it
  // We need to go to the contact list
  // So we need to pass in some function as well that we can call to update the contact
  // pass in openEditModal to the ContactList, this is where we get the contact we're editing (from a list of existing contacts)
  // pass in onUpdate to the ContactList component as the updateCallback prop
  // pass to the ContactForm the current contact we're editing (if there's one, otherwise, it will show "" by default)
  // pass in onUpdate to the ContactList component as the updateCallback prop

  // return (
  //   <>
  //   </>
  // )

  return <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create New Contact</button>
    {isModalOpen && 
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
    }
  </>
}

export default App
