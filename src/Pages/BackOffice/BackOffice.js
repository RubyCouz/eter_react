import React, {Component} from "react"
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";


class BackOffice extends Component {
    state = {
        post: {}
    }

    fetchMap(result) {
        let data = [];
        result.map(val => {
            data.push(<TableRow key={val.id}>
                    <TableCell>
                        {val.id}
                    </TableCell>
                    <TableCell>
                        {val.userLogin}
                    </TableCell>
                </TableRow>
            )
        })
        this.setState({list: data});
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/eter_users')
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.fetchMap(result)
            })
    }

    render() {
        return (
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell>login</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.list}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default BackOffice


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
