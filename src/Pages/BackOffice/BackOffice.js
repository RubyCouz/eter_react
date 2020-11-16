import React, {useState, useEffect, useContext} from "react"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import { AccountContext } from '../../Context/AccountContext'

export default function BackOffice() {

    const [state, setState] = useState(0)
    

    const {JWT} = useContext(AccountContext);

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
            body:JSON.stringify({query: `
                query{
                    eterUsers{
                        edges{
                            node{
                                userLogin
                                userRole
                            }
                        }
                    }
                }`
                }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JWT
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



// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });


// export default function Test() {
//
//     const classes = useStyles();
//     // historique des routes, récupère la route précédente
//     let history = useHistory();
//
//     // retour  à la page d'accueil
//     function backHome() {
//         history.push("/")
//     }
//
//
//     return (
//         <Grid
//             container
//             direction="column"
//             justify="center"
//             alignItems="center"
//         >
//             <Typography>Back-Office</Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={backHome}
//             >
//                 Index
//             </Button>
//
//
//
//
//         </Grid>
//
//     )
// }
