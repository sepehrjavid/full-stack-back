import React from 'react'

const Notification = ({message, notifClassName}) => {

    if (message === null) {
        return null
    }
    return (
        <div className={notifClassName}>
            {message}
        </div>
    )
};

export default Notification
