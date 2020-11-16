import 
    React,
{
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

import {
    useCookies,
} from 'react-cookie'

export default function BackOffice() {

    const [state, setState] = useState()
    
    const [cookies, setCookie] = useCookies(['auth']);
//    token = cookies.auth.token
//    refresh_token = cookies.auth.refresh_token  

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
            //credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookies.auth.token
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
