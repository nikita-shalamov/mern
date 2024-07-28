import { useCallback } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const useMessage = () => {

    return useCallback((text) => {
        if (window.M && text) {
            window.M.toast({html: text});
        }
    }, []);
};

export default useMessage;