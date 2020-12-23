import { useState, useEffect } from 'react';
import { getData, deleteCookie } from '../Tools/Cookie/ManagingCookie';

export default function useCookiePlayload( paramCookiesKey ) {
    const [ dataHook ] = useState ({
        cookieKey: paramCookiesKey,
        defaultValue: { login: false },
    })
    const [ value, setValue ] = useState( dataHook.defaultValue );

    
    function  removeCookie() {
        deleteCookie( dataHook.cookieKey)
        setValue( dataHook.defaultValue )
    }
    

    useEffect(
        () => {
            const cookieData = getData( dataHook.cookieKey )
            let playload = cookieData ? { ...cookieData, ...{ login: true } } : dataHook.defaultValue
            
            playload = { ...playload, ...{ id : `/api/eter_users/${playload["id"]}` } }
            setValue( playload )
        },
        [ document.cookie, dataHook ]
    )


    return [ value, removeCookie ];

}


