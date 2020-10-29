import React from "react"
import { Typography, Button, Grid } from "@material-ui/core"
import { useHistory, NavLink } from "react-router-dom"
import { AccountContext } from '../../Context/AccountContext'

export default function Test() {
    let history = useHistory();



    //Utilisation du tokken et utilisation

    const {SetJWT, JWT } = React.useContext(AccountContext);

    const deconnection = () => {
        SetJWT(null)
    }

    const connection = () => {
        SetJWT("blabla")
    }

    function backHome() {
        history.push("/")
    }




    let message = JWT ? "Connecter": "Deconnecter"
    return(

        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >
            <Typography>Test</Typography>
            <Button 
                variant="contained"
                color="primary"
                onClick={backHome}
            >
                Index
            </Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={connection}
            >
                Connection
            </Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={deconnection}
            >
                Déconnection
            </Button>
            <Typography>Etat : {message} </Typography>
            <Typography>Tokken : {JWT} </Typography>
            

        </Grid>
    )
}
