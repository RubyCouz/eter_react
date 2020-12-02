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

  // Modèle des informations du compte a récupéré
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
      8: {
        nameColumn: "dateInscr",
        nameQuery: "dateInscr",
      }
  })


  const handleChange = (prop) => (event) => {
    setAccount({...account, [prop]: event.target.value});
  };


  const { sessionData, ModalAlertSetData } = useContext( AccountContext );
  const xsrf =  sessionData['login'] ? sessionData["xsrf-token"] : false


  // Création du template de défault pour account
  let defaultTemplate = {}
  for ( const [ key ] of Object.entries( templateData ) ) {
    defaultTemplate[ templateData[ key ][ "nameQuery" ] ] = ""
  }

  // Toute les information du compte
  const [ account, setAccount ] = useState(defaultTemplate)

  // Id de l'utilisateur
  const [ idUser ] = useState("/api/eter_users/5")

  // Création des columns pour la requête GET
  const queryColumn = useMemo(
    () => {
      let queryColumnTemporary = "" ;

      for ( const [ key ] of Object.entries( templateData ) ) {
        const keyData = templateData[ key ][ "nameQuery" ]

        queryColumnTemporary += ` ${ keyData }`
      }

      return  queryColumnTemporary
    }
    , [templateData]
  );

  // Requête pour GET les informations du compte
  useEffect( 
    () => {
      const query = {
          query : `
            query {
              eterUser(
                id: "${ idUser }"
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

  // Création du formulaire pour le rendu
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

  // Création des columns pour la requête de modification
  const queryColumnMutation = useMemo(
    () => {
      let queryColumnTemporary = "";

      for ( const [ key ] of Object.entries( templateData ) ) {
        const keyData = templateData[ key ][ "nameQuery" ]

        let valueData = account[ keyData ]
        valueData = typeof valueData === "string" ? `"${valueData}"` : valueData

        queryColumnTemporary += ` ${ keyData } : ${ valueData }`
      }

      return  queryColumnTemporary
    }
    , [account]
  );

  // Envoie de la requête de modification
  const modifyData = () => {

    const axios = require('axios').default;
    axios({
        data: {
            query: `
                mutation{
                    updateEterUser(
                        input:{
                          id: "${ idUser }"
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
    </Grid>
  )
}
