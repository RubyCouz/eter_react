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
    IconButton,
} from "@material-ui/core"

import EditAttributesOutlinedIcon from '@material-ui/icons/EditAttributesOutlined';

import { AccountContext } from '../../Context/AccountContext';
import { PageAccountContext } from '../../Context/PageAccountContext';

export default function AccountRow(props) {

  const { nameQuery, nameColumn, process, modified } = props


  const { ModalAlertSetData } = useContext( AccountContext );
  
  const [ idUser ] = useState("/api/eter_users/4")



  const [ showField, setShowField ] = useState(false)
  const ShowField = () => {
    setShowField( !showField )
  }

  const { defaultValue, setDefaultValue } = useContext( PageAccountContext );
  const [ entryValue, setEntryValue ] = useState()

  // Actualise la value entrée grâce au context value
  useEffect(
    () => {

      let value = defaultValue[nameQuery]

      if ( process ) {
        const aFunction = process
        value = aFunction(value)
      }
      setEntryValue(value)
    }, 
    [defaultValue]
  )

  // Modifie le champs
  const changeField = (event)=> {
    setEntryValue(event.target.value)
  }

  // Envoie de la données modifier vers l'api
  const sendData = () => {

    setShowField( !showField )

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
    .then( () => {
        ModalAlertSetData({
            severity: "success",
            data: <Typography>Modification effectuée</Typography>
        })
        setDefaultValue( { ...defaultValue, [nameQuery]:entryValue} )
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
    if(e.keyCode === 13){
      e.target.blur(); 
      //Write you validation logic here
    }
 }

  return (
    <TableRow
      key = { nameColumn }
    >
      <TableCell
        component = "th"
        scope = "row"
      >
        { nameColumn }
      </TableCell>
      <TableCell
        align = "right"
      >
        { showField ? <TextField value = { entryValue }  onChange = { changeField } autoFocus  onBlur = { sendData } onKeyDown={ handleKeyPress } /> : entryValue }
      </TableCell>
      <TableCell
        style = {{ width: 48 }}
      >
        {
          modified ? 
            <IconButton
              onClick = { ShowField }
            >
              <EditAttributesOutlinedIcon/> 
            </IconButton>
          : 
            ""
        }
      </TableCell>
    </TableRow>
  )
}