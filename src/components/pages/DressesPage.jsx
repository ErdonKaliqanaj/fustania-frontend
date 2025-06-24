import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const DressesPage = () => {
    const { t } = useTranslation();
    const [dresses, setDresses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/dresses')
            .then(response => setDresses(response.data))
            .catch(error => console.error('Error fetching dresses:', error));
    }, []);

    return (
        <div>
            <h1>{t('dresses.title')}</h1>
            <ul>
                {dresses.map(dress => (
                    <li key={dress.id}>
                        <h2>{dress.name}</h2>
                        <p>{dress.description}</p>
                        <p>{t('dresses.price')}: ${dress.price}</p>
                        <p>{t('dresses.designer')}: {dress.designer}</p>
                        <img src={dress.imageUrl} alt={dress.name} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DressesPage;