import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from 'redux/contacts/contacts-slice';

import styles from './contact-list.module.scss';

const ContactList = () => {
  const filter = useSelector(store => store.filter);
  const contacts = useSelector(store => store.contacts);

  const dispatch = useDispatch();

  const deleteContactById = id => {
    dispatch(deleteContact(id));
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
    <ul className={styles.list}>
      {getVisibleContacts().map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <p className={styles.text}>
            {name}: {number}
          </p>
          <button
            className={styles.button}
            type="button"
            onClick={() => deleteContactById(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
