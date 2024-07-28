import { useCallback, useState } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });

            // Проверяем, что статус ответа успешен
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Что-то пошло не так');
            }

            // Проверяем, что ответ является JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setLoading(false);
                return data;
            }

            // Если ответ не JSON, возвращаем текстовый ответ
            const textData = await response.text();
            setLoading(false);
            return textData;
        } catch (e) {
            console.log('catch', e.message);
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);


    const clearError = useCallback(() => {
        setError(null);
    }, [])

    return { loading, request, error, clearError };
};

export default useHttp;
