import React, {useEffect, useState} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import {create, getAll, update} from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');
    const [searchField, setSearchField] = useState('');
    const [message, setMessage] = useState(null);
    const [notifClassName, setNotifClassName] = useState("error");


    useEffect(() => {
        getAll().then((response) => {
            setPersons(response.data);
            setSearchResult(response.data);
        });
    }, []);


    const addContact = (event) => {
        event.preventDefault();
        let new_person = {name: newName, number: number};
        if (!persons.map((person) => person.name).includes(newName)) {
            create(new_person).then((response) => {
                let newPersons = persons.concat(response.data);
                setPersons(newPersons);
                setNewName('');
                setNumber('');
                setSearchResult([...newPersons]);
                setMessage(`Contact added`);
                setNotifClassName("message");
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
        } else {
            let updatingPerson = persons.filter((person) => person.name === newName)[0];
            update(updatingPerson.id, number).then((response) => {
                let newPersons = persons.map(p =>
                    p.name === new_person.name
                        ? {...p, number: new_person.number}
                        : p
                );
                setPersons(newPersons);
                setNewName('');
                setNumber('');
                setSearchResult([...newPersons]);
                setMessage(`Contact updated`);
                setNotifClassName("message");
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            }).catch((err) => {
                setMessage(`Information of ${newName} has already been removed`);
                setNotifClassName("error");
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
        }
    };

    const search = (event) => {
        event.preventDefault();
        if (searchField === '') {
            setSearchResult(persons);
        } else {
            setSearchResult(persons.filter((person) => person.name.match(searchField)));
            setSearchField('');
        }
    };

    const newNameChange = (event) => {
        setNewName(event.target.value);
    };

    const numberChange = (event) => {
        setNumber(event.target.value);
    };

    const searchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} notifClassName={notifClassName}/>
            <Filter search={search} searchField={searchField} searchFieldChange={searchFieldChange}/>
            <h2>Add New</h2>
            <PersonForm addContact={addContact} newName={newName} newNameChange={newNameChange} number={number}
                        numberChange={numberChange}/>
            <h2>Numbers</h2>
            <Persons searchResult={searchResult} persons={persons} setPersons={setPersons}
                     setSearchResult={setSearchResult}/>
        </div>
    )
};

export default App
