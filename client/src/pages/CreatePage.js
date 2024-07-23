import React, {useContext, useState} from 'react';
import useHttp from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async (e) => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`); 
                console.log(data);
            } catch (e) {}
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col s8 offser-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input 
                            placeholder="Введите cсылку" 
                            id="link" 
                            type="text" 
                            className="yellow-input"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default CreatePage;