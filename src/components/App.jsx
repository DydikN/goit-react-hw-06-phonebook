import { useSelector } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './app.module.scss';

function App() {
  const contacts = useSelector(store => store.contacts);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm />

      <div>
        <h2>Constacts</h2>
        <Filter />
        {contacts.length > 0 ? <ContactList /> : <p>No contacts</p>}
      </div>
    </div>
  );
}

export default App;
