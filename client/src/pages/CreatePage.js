import React, { useContext, useState } from 'react';
import useHttp from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');

    const generateLink = async () => {
        try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
                Authorization: `Bearer ${auth.token}`
            });
            navigate(`/detail/${data.link._id}`);
            console.log(data);
        } catch (e) {
            console.error(e); // Выводим ошибку в консоль для отладки
        }
    };

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            await generateLink();
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                    <div className="input-field">
                        <input 
                            placeholder="Введите ссылку" 
                            id="link" 
                            type="text" 
                            className="yellow-input"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler} // Обработка нажатия Enter
                        />
                        <button 
                            className="waves-effect waves-light btn" 
                            onClick={generateLink} // Обработка клика на кнопку
                        >
                            Сократить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
