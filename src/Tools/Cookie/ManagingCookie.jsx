    //Prend valeur d'un cookie dans avec la possiblilité de split le résultat
    function readCookieKey( cookie ) {
        
        const splitter = "."
        let value

        try {
            const key = Object.keys(cookie)[0]
            value = cookie[key]
        } catch ( error ) {
           return false
        }

        if ( value && splitter ) {
            value = value.split( splitter )
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

    export function getData( cookie) {
        //JWT Header et Playload
        let data = readCookieKey( cookie )
        //Decoder le base64 du playload
        if ( data ) {
            data = convertBase64JSON( data[ 1 ] )
        }

        return data ? data : false
    }