import React from 'react'

const Filter = ({search, searchField, searchFieldChange}) => {
    return (
        <div>
            <form onSubmit={search}>
                <div>
                    Filter shown with: <input value={searchField} onChange={searchFieldChange}/>
                </div>
            </form>
        </div>
    )
};

export default Filter
