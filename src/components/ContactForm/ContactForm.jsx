import { useState } from 'react';
import { addContact } from 'redux/contacts/contacts-slice';
import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

import styles from './contact-form.module.scss';
import inititalState from './initialState';

function ContactForm({ onSubmit }) {
  const [state, setState] = useState({ ...inititalState });
  const contacts = useSelector(store => store.contacts);

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

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleFormSubmit({ ...state });
    setState({ ...inititalState });
  };

  const { name, number } = state;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label>
        <p className={styles.title}>Name</p>
        <input
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={handleChange}
          value={name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Surname Name"
          required
        />
      </label>
      <label>
        <p className={styles.title}>Number</p>
        <input
          className={styles.input}
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={styles.btnSubmit} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
