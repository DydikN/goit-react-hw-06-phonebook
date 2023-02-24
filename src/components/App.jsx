import { useSelector, useDispatch } from 'react-redux';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import styles from './app.module.scss';
import Notiflix from 'notiflix';

function App() {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const handleFormSubmit = ({ name, number }) => {
    if (isDublicate(name)) {
      return Notiflix.Notify.failure(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));
  };

  const deleteContactById = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />

      <div>
        <h2>Constacts</h2>
        <Filter value={filter} changeFilter={changeFilter} />
        {contacts.length > 0 ? (
          <ContactList
            contacts={getVisibleContacts()}
            deleteContact={deleteContactById}
          />
        ) : (
          <p>No contacts</p>
        )}
      </div>
    </div>
  );
}

export default App;
