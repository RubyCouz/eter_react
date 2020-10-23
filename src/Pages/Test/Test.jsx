import React from "react"
import { Typography, Button, Grid } from "@material-ui/core"
import { useHistory, useParams } from "react-router-dom"

export default function Test() {
    let history = useHistory();

    function backHome() {
        history.push("/")
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
        </Grid>
    )
}
