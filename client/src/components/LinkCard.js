import React from 'react';

const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Ссылка</h2>

            <p>Ваша ссылка: <a href={link.to} target='_blank' rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target='_blank' rel="noopener noreferrer">{link.from}</a></p>
            <p>Кол-во кликов: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    );
};

export default LinkCard;