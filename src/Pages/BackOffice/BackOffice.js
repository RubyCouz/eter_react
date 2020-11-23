import 
    React,{
        useState,
        useEffect,
} from 'react'

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'

export default function BackOffice() {

    const [state, setState] = useState()

    useEffect( () => {
        function fetchMap(result) {
            let data = [];

            if (!result.errors && result.data) {
                result.data.eterUsers.edges.map(val => {
                    data.push(
                        <TableRow
                            key={val.node.userLogin}
                        >
                            <TableCell>
                                {val.node.userLogin}
                            </TableCell>
                            <TableCell>
                                {val.node.userRole}
                            </TableCell>
                        </TableRow>
                    )
                })
            } else {
                data.push(
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

            setState(data);
        }

        fetch('https://localhost:8000/api/graphql', {
            body:JSON.stringify({
                query: `
                    query{
                        eterUsers(first: 100){
                            edges{
                                node{
                                    userLogin
                                    userRole
                                }
                            }
                        }
                    }
                `
            }),
            credentials: "include", 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Authorization': 'Bearer ' + cookies.auth.token
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            fetchMap(result)
        })
    }, [])
    
   

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Login</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
