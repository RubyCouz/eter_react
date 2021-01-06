import React, {
    useContext,
    useEffect,
    useState,
} from "react"

import {
  TextField,
  Typography,
  TableRow,
  TableCell,
  CircularProgress,
} from "@material-ui/core"

import CreateIcon from '@material-ui/icons/Create';

import { AccountContext } from '../../Context/AccountContext';

export default function TableRowEdit(props) {

  const { nameQuery, tableRowOption , idUser, defaultValue, setDefaultValue } = props

  const { ModalAlertSetData } = useContext( AccountContext );
  const [ showField, setShowField ] = useState(false)
  const ShowField = () => {
    setShowField( !showField )
  }

  const [ entryValue, setEntryValue ] = useState()

  // Actualise la value entrée grâce au context value
  useEffect(
    () => {

      let value = defaultValue[nameQuery]
      const process = tableRowOption[ "process" ] || false

      if ( process ) {
        value = process(value)
      }
      setEntryValue(value)
    }, 
    [defaultValue, nameQuery, tableRowOption]
  )

  // Modifie le champs
  const changeField = (event)=> {
    setEntryValue(event.target.value)
  }

  // Envoie de la données modifier vers l'api
  const sendData = () => {

    setShowField( !showField )

    if ( entryValue === defaultValue[nameQuery] ) {
      ModalAlertSetData({
        severity: "error",
        data: <Typography>Même valeur, aucune modification a était effectuée</Typography>
      })
      return
    } else if ( !entryValue ) {
      ModalAlertSetData({
        severity: "error",
        data: <Typography>Aucune donnée impossible, modification refusé</Typography>
      })
      setEntryValue(defaultValue[nameQuery])
      return
    }
    const valueData = typeof entryValue === "string" ? `"${entryValue}"` : entryValue
    const queryColumnMutation = `${ nameQuery } : ${ valueData }`


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
    .then( ( data ) => {
        if(data.data.errors){
          throw new Error();
        } else {
          ModalAlertSetData({
            severity: "success",
            data: <Typography>Modification effectuée</Typography>
          })
          setDefaultValue( { ...defaultValue, [nameQuery]:entryValue} )
        }
    })
    .catch( () => {
        ModalAlertSetData({
            severity: "error",
            data: <Typography>Les modification n'ont pas pu êtres valider</Typography>
        })
        setEntryValue(defaultValue[nameQuery])
    })
  }
  
  function handleKeyPress(e){
    if(e.keyCode === 13) {
      e.target.blur(); 
      //Write you validation logic here
    }
  }

  return (
    <TableRow
      hover
      key = { tableRowOption[ "nameColumn" ] }
      onClick = { !( tableRowOption[ "modifiedValue" ] === false) ? ShowField : undefined }
    >
      <TableCell
        component = "th"
        scope = "row"
      >
        { tableRowOption[ "nameColumn" ] }
      </TableCell>
      <TableCell
        align = "right"
      >
        { 
          entryValue !== undefined ?
            showField ?
              <TextField
                fullWidth = { true }
                value = { entryValue }
                onChange = { changeField }
                autoFocus
                onBlur = { sendData }
                onKeyDown={ handleKeyPress }
                size = "small"
              />
            : 
              entryValue
          :
            <CircularProgress size = { 15 }/>
        }
      </TableCell>
      <TableCell
        style = {{ width: 20 }}
        size = "small"
        padding= "default"
      >
        {
          !( tableRowOption[ "modifiedValue" ] === false) ? 
            <CreateIcon fontSize="small" /> 
          : 
            undefined
        }
      </TableCell>
    </TableRow>
  )
}