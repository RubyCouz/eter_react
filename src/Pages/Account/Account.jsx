import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react"

import {
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core"

import Request from '../../Tools/Request/Request'
import { AccountContext } from '../../Context/AccountContext';

export default function Test() {
  //Utilisation du tokken et utilisation


  const [templateData] = useState({
      0 : {
          nameColumn: "Utilisateur",
          nameQuery: "userLogin",
      },
      1 : {
          nameColumn: "Role",
          nameQuery: "userRole",
      },
      3 : {
          nameColumn: "Date",
          nameQuery: "userDate",
      },
      4 : {
          nameColumn: "Discord",
          nameQuery: "userDiscord",
      },
      5 : {
        nameColumn: "Adresse",
        nameQuery: "userAddress",
      },
      6 : {
        nameColumn: "Code Postale",
        nameQuery: "userZip",
      },
      7 : {
        nameColumn: "Ville",
        nameQuery: "userCity",
      },
  })


  const handleChange = (prop) => (event) => {
    setAccount({...account, [prop]: event.target.value});
  };


  const { sessionData, ModalAlertSetData } = useContext( AccountContext );
  const xsrf =  sessionData['login'] ? sessionData["xsrf-token"] : false



  let defaultTemplate = {}



  for ( const [ key ] of Object.entries( templateData ) ) {
    defaultTemplate[ templateData[ key ][ "nameQuery" ] ] = ""
  }

  const [ account, setAccount ] = useState(defaultTemplate)

  const queryColumn = useMemo(
    () => {
      let queryColumnTemporary = "" ;

      for ( const [ key ] of Object.entries( templateData ) ) {
        queryColumnTemporary += " " + templateData[ key ][ "nameQuery" ]
      }

      return  queryColumnTemporary
    }
    , [templateData]
  );

  useEffect( 
    () => {
      const query = {
          query : `
            query {
              eterUser(
                id: "/api/eter_users/5"
              ){
                ${queryColumn}
              }
            }
          `
      }

      Request( query, xsrf )
      .then(function(result) {
        console.log(result)
        setAccount(result["data"]["eterUser"]);
      })
    }, []
  )


  const form = useMemo(
    () => {
      let createForm = []

      for ( const [ key ] of Object.entries( templateData ) ) {
        
        const nameQuery = templateData[ key ][ "nameQuery" ]
        const nameColumn =  templateData[ key ][ "nameColumn" ]

        
        createForm.push(
          <Grid item>
            <TextField
              fullWidth 
              id = "outlined-basic"
              label = { nameColumn }
              variant = "outlined"
              value = { account[ nameQuery ] }
              onChange = { handleChange( nameQuery ) }
            />
          </Grid>
        )
        

      }

      return createForm
      
    }
    , [account]
  );



  const queryColumnMutation = useMemo(
    () => {
      let queryColumnTemporary = "" ;



      for ( const [ key ] of Object.entries( templateData ) ) {

        const value = typeof account[ templateData[ key ][ "nameQuery" ] ] === "string" ? 
          "\"" + account[ templateData[ key ][ "nameQuery" ] ] + "\""
        : 
          account[ templateData[ key ][ "nameQuery" ] ]

        queryColumnTemporary += " " + templateData[ key ][ "nameQuery" ] + " : " + value
      }

      return  queryColumnTemporary
    }
    , [account]
  );

  const modifyData = () => {

    const axios = require('axios').default;
    axios({
        data: {
            query: `
                mutation{
                    updateEterUser(
                        input:{
                          id: "/api/eter_users/5"
                          ${ queryColumnMutation }
                        }
                    )
                    {
                        eterUser{userMail}
                    }
                }
            `
        },
        method: 'post',
        url: 'https://localhost:8000/api/graphql',
    })
    .then( (reponse) => {
        console.log(reponse)
        ModalAlertSetData({
            severity: "success",
            data: <Typography>Les modification on était changer sur { reponse.data.data.updateEterUser.eterUser.userMail }</Typography>
        })
    })
    .catch( () => {
        ModalAlertSetData({
            severity: "error",
            data: <Typography>Les modification n'ont pas pu êtres valider</Typography>
        })
    })
  }

  return(
    <Grid
        container
        direction ="column"
        justify ="center"
        alignItems ="center"
    >
      <form
        noValidate
        autoComplete = "off"
      >
        <Grid
          container
          direction = "column"
          justify = "center"
          alignItems = "center"
          spacing = {5}
        >
          { form }
          <Button
            variant = "contained"
            color = "primary"
            onClick = { modifyData }
          >
            Modifier
          </Button>
        </Grid>


      </form>
      <Typography>{ account ? account["userMail"] : "rien" }</Typography>
      <Typography></Typography>
    </Grid>
  )
}
