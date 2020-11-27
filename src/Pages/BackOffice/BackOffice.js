import 
    React,{
        useState,
        useEffect,
        useContext,
        useMemo,
} from 'react'

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'

import Request from '../../Tools/Request/Request'

import { AccountContext } from '../../Context/AccountContext';

export default function BackOffice() {

    const { sessionData } = useContext( AccountContext );
    const xsrf =  sessionData['login'] ? sessionData["xsrf-token"] : false

    const [table, setTable] = useState()


    // Template pour les informations
    // 0 est prit comme key des lignes
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
    })

    //Création de la requête
    const query = useMemo(
        () => {
            let queryColumn = "" ;
            for ( const [ key ] of Object.entries( templateData ) ) {
                queryColumn += " " + templateData[ key ][ "nameQuery" ]
            }

            const query = {
                query : `
                    query {
                        eterUsers ( first: 100 ) {
                            edges {
                                node {
                                    ${queryColumn}
                                }
                            }
                        }
                    }
                `
            }
            return query
        }
        , [templateData]
    );
    
    //Création de l'en-tête du tableau
    const header = useMemo(
        () => {
            let headerData = [];

            for ( const [ key ] of Object.entries( templateData ) ) {
                headerData.push(
                    <TableCell>
                        { templateData[ key ][ "nameColumn" ] }
                    </TableCell>
                )
            }
            return headerData
        }
        , [templateData]
    );

    useEffect( () => {
        function fetchMap(result) {
            let table = [];

            if ( !result.errors && result.data ) {
               table = result.data.eterUsers.edges.map(val => {

                    // création des cellules de la lignes
                    let row = []
                    for ( const [ key ] of Object.entries( templateData ) ) {
                        row.push(
                            <TableCell>
                                { val.node[ templateData[ key ][ "nameQuery" ] ] }
                            </TableCell>
                        )
                    }

                    // création de la lignes du tableau
                    
                        return <TableRow
                            key={ val.node[ templateData[ "0" ][ "nameQuery" ] ] }
                        >
                         { row }
                        </TableRow>
                    
                })
            } else {
                table.push(
                    <TableRow
                        key={"rien"}
                    >
                        <TableCell
                            colSpan={2}
                            align="center"
                        >
                            Rien !
                        </TableCell>
                    </TableRow>
                )
            }

            setTable(table);
        }

        Request( query, xsrf )
        .then(function(result) {
            fetchMap(result);
        })

    },[])

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            { header }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { table }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}