import React, { useCallback, useState, useEffect } from 'react';
const storageName = 'userData'

const useAuth = () => {
    // создаем методы, которые помогают зайти и выйти из системы
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
        console.log(localStorage.getItem(storageName));

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        
        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
};

export default useAuth;