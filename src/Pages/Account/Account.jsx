import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react"

import {
  Tabs,
  Tab,
  Grid,
} from "@material-ui/core"

import { makeStyles } from '@material-ui/core/styles';  

import TabPanel from './AccountDetail';
import Request from '../../Tools/Request/Request'

import { AccountContext } from '../../Context/AccountContext';
import { PageAccountContext } from '../../Context/PageAccountContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Test() {

  // Fonction pour calculer le temps entre deux date utiliser dans le template
  const time = (date) => {
    const nowTime = new Date()
    const inscDate = new Date(date)

    let difference = nowTime - inscDate


    let resultat
    
    if ( difference ) {
      if ( difference / ( 1000 * 3600 * 730 * 365 ) >= 1 ) {
        resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 730 * 365 ) ) } ans`
      } else if ( difference / ( 1000 * 3600 * 730 ) >= 1 ) {
        resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 730 ) ) } mois`
      } else {
        resultat = `${ Math.trunc( difference / ( 1000 * 3600 * 24 ) ) } jours`
      }
    }

    return difference ? resultat : date
  }

  // Modèle des informations du compte a récupéré
  const [ templateData ] = useState({
    index : {
        0 : {
            name : "Résumé du compte",
            content : {
              userLogin : {
                nameColumn : "Utilisateur",
                modifiedValue : false,
              },
              userDescription : {
                nameColumn : "Description",
              },
              userDate : {
                nameColumn : "Date de mise a jour du compte",
                modifiedValue : false,
                process: time,
              },
              dateInscr : {
                nameColumn : "Date inscription",
                modifiedValue : false,
              },
            }
        },
        1 : {
            name : "Données personnels",
            content : {   
              userMail : {
                nameColumn : "Adresse email",
              },
              userSex : {
                nameColumn : "Sex",
              },
              userAddress : {
                nameColumn : "Adresse",
              },
              userZip : {
                nameColumn : "Code postale",
              },
              userCity : {
                nameColumn: "Ville",
              },
            }
        },
        2 : {
            name : "Réseaux social",
            content : {
              userDiscord : {
                nameColumn : "Discord",
              },
            }
        },
        3 : {
          name : "Confidentialité",
          content : {
            userPassword : {
              nameColumn : "Mot de passe",
            },
          }
      },
    },
  })

  const classes = useStyles();

  const [ value, setValue]  = useState(0);

  const handleChange = (event, newValue) => { 
    setValue(newValue);
  }


  const { sessionData } = useContext( AccountContext );
  const xsrf =  sessionData['login'] ? sessionData["xsrf-token"] : false
  const [ idUser ] = useState("/api/eter_users/4")


  // Création d'une modèle pour les données

  let defaultTemplateData = {}
  for ( const value of Object.values( templateData[ "index" ] ) ) {
    for ( const [ nameQuery ] of Object.entries( value["content"] ) ) {
      defaultTemplateData[nameQuery] = ""
    }
  }

  // Toute les information du compte
  const [ data, setData ] = useState({})




  // Création des columns pour la requête GET
  const queryColumn = useMemo(
    () => {
      let queryColumnTemporary = "" ;
      for ( const value of Object.values( templateData[ "index" ] ) ) {
        for ( const [ key ] of Object.entries( value["content"] ) ) {
          queryColumnTemporary += ` ${ key }`
        }
      }
      return  queryColumnTemporary
    }
    , []
  );
  
  // Requête GET pour les informations du compte
  useEffect( 
    () => {
      const query = {
          query : `
            query {
              eterUser(
                id: "${ idUser }"
              ){
                ${ queryColumn }
              }
            }
          `
      }

      Request( query, xsrf )
      .then(function(result) {

        let tableResult = {}
        for ( const value of Object.values( templateData[ "index" ] ) ) {
          for ( const [ queryName ] of Object.entries( value["content"] ) ) {
            const valueQuery =  result["data"]["eterUser"][queryName]
            tableResult[queryName] = valueQuery
          }
        }

        setData( {...data, ...tableResult } )

      })
    }, []
  )


  // Création des onglets 
  const tabs = useMemo(
    () => {

      function a11yProps(index) {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        }
      }

      let tabs = []

      Object.entries( templateData[ "index" ] ).forEach(
        ([keyObject, valueObject]) => {
          tabs.push(
            <Tab
              label = { valueObject[ "name" ] }
              key = { keyObject }
              { ...a11yProps( parseInt( keyObject ) ) } 
            />
          )
        }
      )

      return tabs

    }
    , []
  )

  //Création des panneaux d'onglets
  const tabsPanels = useMemo(
    () => {
      let tabsPanels = []

      Object.entries( templateData[ "index" ] ).forEach(
        ( [ keyObject, valueObject ] ) => {
          tabsPanels.push(
            <TabPanel
              key = { keyObject }
              value = { value }
              index = { parseInt( keyObject ) }
              data = { valueObject[ "content" ] }
            />
          )
        } 
      )

      return tabsPanels

    }
    , [ value ]
  )

  return(
      <div >
      <Grid className={classes.root} direction="row">
        <Grid item>
          <Tabs
            orientation = "vertical"
            variant = "scrollable"
            value = { value }
            onChange = { handleChange }
            aria-label = "Vertical tabs"
            className = { classes.tabs }
          >
            { tabs }
          </Tabs>
        </Grid>
        <Grid item xs>
          <PageAccountContext.Provider 
            value = { {defaultValue : data, setDefaultValue: setData} }
          >
            { tabsPanels }
          </PageAccountContext.Provider>
        </Grid>
      </Grid>
      </div>
  )
}