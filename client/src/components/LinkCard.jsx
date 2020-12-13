import React from 'react'

const LinkCard = ({ link }) => {
    return(
        <>
            <h2>Link</h2>
            <p>
                Reduced link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
            </p>
            <p>
                From link: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
            </p>
            <p>
                Click counter: <strong>{link.clicks}</strong>
            </p>
            <p>
                Created data: <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
        </>
    )
}

export default LinkCard