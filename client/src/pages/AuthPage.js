import React, { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/http.hook';
import useMessage from '../hooks/message.hook';
import 'materialize-css/dist/css/materialize.min.css';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (error) {
            message(error);
            clearError();
        }
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch (e) {
            // Ошибка будет обработана и отображена через useMessage
        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId)
            console.log('auth.login', auth.login());
        } catch (e) {
            // Ошибка будет обработана и отображена через useMessage
        }
    };

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Most short links</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email" 
                                    id="email" 
                                    type="text" 
                                    className="yellow-input"
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль" 
                                    id="password" 
                                    type="password" 
                                    className="yellow-input"
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            onClick={loginHandler}
                            disabled={loading}
                            className='btn yellow darken-4' 
                            style={{marginRight: 20}}
                        >
                            Войти
                        </button>
                        <button 
                            className='btn grey lighten-1'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
