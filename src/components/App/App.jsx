import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Section } from '../Section/Section';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { FilterContacts } from '../FilterContacts/FilterContacts';
import { ContainerApp } from './App.styled';


export class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFiltered = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <ContainerApp>
        <Section title='Phonebook'>
          <ContactForm contacts={contacts} onSubmit={this.addContact} />
        </Section>
        <Section title='Contacts'>
          <FilterContacts value={filter} onChange={this.changeFiltered} />
          <ContactList contacts={this.getVisibleContacts()} onDeleteContact={this.deleteContact} />
        </Section>
      </ContainerApp>
    );
  }
}
