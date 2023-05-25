import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { FormAdd } from './FormAdd/FormAdd';
import { ContactList } from './ContactList/ContactList';
import { Search } from './Search/Search';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLS = JSON.parse(window.localStorage.getItem('contacts'));
    if (contactsFromLS) {
      return contactsFromLS;
    } else {
      return [];
    }
  });

  const [filters, setFilters] = useState('');

  useEffect(() => {
    const contactsFromLS = JSON.parse(window.localStorage.getItem('contacts'));
    if (contactsFromLS) {
      setContacts(contactsFromLS);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
  };
  const handleSearch = event => {
    setFilters(event.target.value);
  };

  const filteredContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(filters.toLocaleLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <FormAdd handleForm={onFormSubmit} contacts={contacts} />
      <Search onSearch={handleSearch} />
      <ContactList fileList={filteredContacts} onDelete={handleDelete} />
    </div>
  );
};
// export class App extends React.Component {
//   state = {
//     contacts: SAMPLE,
//     filters: '',
//   };

//   onFormSubmit = (name, number) => {
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };

//   handleDelete = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(el => el.id !== id),
//     }));
//   };
//   handleSearch = event => {
//     this.setState({
//       filters: event.target.value,
//     });
//   };
//   render() {
//     const filteredContacts = this.state.contacts.filter(el =>
//       el.name.toLowerCase().includes(this.state.filters.toLocaleLowerCase())
//     );

//     return (
//       <div className="container">
//         <h1>Phonebook</h1>
//         <FormAdd
//           handleForm={this.onFormSubmit}
//           contacts={this.state.contacts}
//         />
//         <Search onSearch={this.handleSearch} />
//         <ContactList fileList={filteredContacts} onDelete={this.handleDelete} />
//       </div>
//     );
//   }
// }
