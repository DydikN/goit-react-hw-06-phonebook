import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './app.module.css';
import Notiflix from 'notiflix';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = (name, number) => {
    const id = nanoid();
    const contact = {
      id,
      name,
      number,
    };

    if (
      contacts.find(item => {
        return item.name.toLowerCase() === contact.name.toLowerCase();
      })
    ) {
      return Notiflix.Notify.failure(`${contact.name} is already in contacts`);
    }
    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />

      <div>
        <h2>Constacts</h2>
        <Filter value={filter} filter={changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={getVisibleContacts()}
            deleteContact={deleteContact}
          />
        ) : (
          <p>No contacts</p>
        )}
      </div>
    </div>
  );
}

export default App;
