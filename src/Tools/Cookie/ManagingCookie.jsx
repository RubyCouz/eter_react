    //Prend valeur d'un cookie dans avec la possiblilité de split le résultat
    function readCookieKey( keyCookie ) {
        const splitter = "."
        let value

        try {
            value = document.cookie
                .split('; ')
                .find(row => row.startsWith(keyCookie))
                .split('=')[1];

            if ( value && splitter ) {
                value = value.split( splitter )
            }
        } catch ( error ) {
           return false
        }
        
        return value
    }

    //Decode le base 64 et convertie en JSON
    function convertBase64JSON( decode ) {
        try {
            decode = atob( decode )
            decode = JSON.parse( decode )
        } catch ( error ) {
            return false
        }

        return decode
    }

    export function getData( key ) {
        //JWT Header et Playload
        let data = readCookieKey( key )
        //Decoder le base64 du playload
        if ( data ) {
            data = convertBase64JSON( data[ 1 ] )
        }

        return data ? data : false
    }

    export function deleteCookie ( key ) {
        document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }