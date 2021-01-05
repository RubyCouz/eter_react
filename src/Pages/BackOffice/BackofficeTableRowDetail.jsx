import React,{
    useState,
    useEffect,
    useMemo,
    useContext,
} from 'react'

import {
    Box,
    TableContainer,
    Table,
    TableBody,
    Paper,
} from '@material-ui/core'

import Request from '../../Tools/Request/Request'

import { AccountContext } from '../../Context/AccountContext'

import TableRowEdit from '../../components/TableRowEdit/TableRowEdit';

export default (props) => {
    const { row, setRows, index } = props
    const [ dataUser, setDataUser ] = useState(row)
    const { sessionData } = useContext( AccountContext );
    const xsrf =  sessionData[ 'login' ] ? sessionData[ "xsrf-token" ] : false


    // Template pour les informations
    const [templateDataUser] = useState({
        userLogin : {
            nameColumn : "Utilisateur",
            useForGetQuery : false,
        },
        userRole : {
            nameColumn : "Role",
            useForGetQuery : false,
        },
        userDate : {
            nameColumn : "Date",
            useForGetQuery : false,
        },
        userMail : {
            nameColumn : "Email",
        },
        userPassword : {
            nameColumn : "Mot de passe",
            useForGetQuery : false,
            //defaultValue : "************",
        },
        userAddress : {
            nameColumn : "Adresse", 
        },
        userZip : {
            nameColumn : "Code postale",
        },
        userCity : {
            nameColumn : "Ville",
        },
        userDiscord : {
            nameColumn : "Discord",
        },
        userSex : {
            nameColumn : "Sexe",
        },
        statut : {
            nameColumn : "Statut",
        },
        dateInscr : {
            nameColumn : "Date Inscription",
        },
    })

    //La requête
    useEffect( () => {
        setRows(oldData =>{

            const newDataRows = {
                node: {
                    id : dataUser.id ,
                    userDate : dataUser.userDate,
                    userLogin : dataUser.userLogin,
                    userRole : dataUser.userRole,
                }
            }

            const searchElement = (element) => element.node.id === row.id
            const index = oldData.findIndex(searchElement)

            index  > -1 && ( oldData[index] = newDataRows )            

            return oldData
        })
    },[dataUser])

    //La requête
    useEffect( () => {
        let queryColumn = "" ;
        for ( const [ key ] of Object.entries( templateDataUser ) ) {
            const useForQuery = templateDataUser[key]["useForGetQuery"] !== undefined ? templateDataUser[key]["useForGetQuery"] : true

            if (useForQuery) {
                queryColumn += " " + key
            }
        }

        const query = {
            query : `
                query {
                    eterUser(
                        id: "${ row.id }"
                    ){
                        ${ queryColumn }
                    }
                }
            `
        }

        Request( query, xsrf )
        .then(function(result) {
            const resultData = result.data.eterUser
            setDataUser(oldData =>({...oldData, ...resultData}))
        })
    
    },[])
    
    const form = useMemo(
        () => {
          let createForm = []
    
          for ( const [ nameQuery, column ] of Object.entries( templateDataUser ) ) {
            createForm.push(
              <TableRowEdit
                key = { nameQuery }
                nameQuery = { nameQuery }
                tableRowOption = { column } // edit, modifiedValue, process,
                idUser = { row.id }
                defaultValue = { dataUser }
                setDefaultValue = { setDataUser }
              />
            )
          }
    
          return createForm
        }
        , [ dataUser, setDataUser ]
      );
    
    return (
        <Box margin={1}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table" width = { 600 }>
                    <TableBody>
                        {form}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}   