import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../src/hooks/useLocalStorage';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import Styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert('Attempt to create existing contact!');
      return;
    }

    setContacts(prevState => [...prevState, { id: uuidv4(), name, number }]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={Styles.container}>
      <h1 className={Styles.h1}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={Styles.h2}>Contacts</h2>
      {visibleContacts.length >= 1 && (
        <Filter value={filter} onChange={changeFilter} />
      )}
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;