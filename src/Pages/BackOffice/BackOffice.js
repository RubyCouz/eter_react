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

import { useCookies } from 'react-cookie';
import Request from '../../Tools/Request/Request'
import { getData } from '../../Tools/Cookie/ManagingCookie'

export default function BackOffice() {

    const [state, setState] = useState()

    const keyCookie = 'jwt_hp'
    const [cookies] = useCookies([keyCookie]);
    const xsrf =  getData(cookies)['xsrf-token'] ? getData(cookies)["xsrf-token"] : false

    useEffect( () => {
        function fetchMap(result) {
            let data = [];

            if ( !result.errors && result.data ) {
                result.data.eterUsers.edges.map(val => (
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
                ))
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

        const query = {
            query : `
                query {
                    eterUsers ( first: 100 ) {
                        edges {
                            node {
                                userLogin
                                userRole
                            }
                        }
                    }
                }
            `
        }

        Request( query, xsrf )
        .then(function(result) {
            fetchMap(result);
        })

    }, [xsrf])
   

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