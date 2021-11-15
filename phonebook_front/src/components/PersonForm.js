import React from 'react'

const PersonForm = ({addContact, newName, newNameChange, number, numberChange}) => {
    return (
        <div>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={newNameChange}/>
                </div>
                <div>
                    number: <input value={number} onChange={numberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
};

export default PersonForm
