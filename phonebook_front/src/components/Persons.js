import React from 'react'
import {remove} from "../services/persons";

const removePerson = (person_id, setPersons, persons, setSearchResult) => {
    if (window.confirm("Confirm delete?")) {
        remove(person_id).then((response) => {
            let new_persons = persons.filter((person) => person.id !== person_id);
            setPersons(new_persons);
            setSearchResult([...new_persons])
        })
    }
};


const Persons = ({searchResult, persons, setPersons, setSearchResult}) => {

    return (
        <div>
            {
                searchResult.map((person, index) =>
                    <div key={index}>
                        <p>{person.name}: {person.number}</p>
                        <button onClick={() => removePerson(person.id, setPersons, persons, setSearchResult)}>Delete</button>
                    </div>
                )
            }
        </div>
    )
};

export default Persons
