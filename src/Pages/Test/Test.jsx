import React from "react"
import { Typography, Button, Grid } from "@material-ui/core"
import { useHistory, NavLink } from "react-router-dom"
import { AccountContext } from '../../Context/AccountContext'
import { useCookies } from 'react-cookie'

export default function Test() {
    let history = useHistory();

    //Hook Tokken
    function backHome() {
        history.push("/")
    }

    const [cookies, setCookie] = useCookies(['auth']);

    let token = "Aucune données"
    let refreshToken = "Aucune données"

    if (cookies.auth) {
        token = cookies.auth.token ?? cookies.auth.token

        refreshToken = cookies.auth.refresh_token ?? cookies.auth.refresh_token
    }


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
            <Typography>{cookies.auth!= undefined? "Cookie" : "Pas de cookie"} </Typography>
            <Typography>Token : {token} </Typography>
            <Typography>Refresh token : {refreshToken} </Typography>
        </Grid>
    )
}
