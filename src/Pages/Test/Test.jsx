import React from "react"
import { Typography, Button, Grid } from "@material-ui/core"
import { useHistory} from "react-router-dom"
import { getData } from '../../Tools/Cookie/ManagingCookie'
import { useCookies } from 'react-cookie';

export default function Test() {
    let history = useHistory();

    //Hook Tokken
    function backHome() {
        history.push("/")
    }

    const keyCookie = 'jwt_hp'

    const [cookies] = useCookies([keyCookie]);

    const xsrf =  getData(cookies)['xsrf-token'] ? getData(cookies)["xsrf-token"] : "Pas de xsrf"

    const roles = getData(cookies)["roles"] ? getData(cookies)["roles"] : "Aucun roles"

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
            <Typography>{ xsrf }</Typography>
            <Typography>{ roles }</Typography>
            <Typography>{ JSON.stringify(document.cookie) }</Typography>
        </Grid>
    )
}
