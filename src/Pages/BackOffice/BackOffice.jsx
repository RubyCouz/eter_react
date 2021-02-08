import 
    React,{
        useState,
        useEffect,
        useContext,
        useMemo,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    TablePagination,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TableRow,
    TableSortLabel,
    CircularProgress,
    Typography,
    Paper,
    Checkbox,
    Grid,
} from '@material-ui/core';

import Request from '../../Tools/Request/Request'
import BackOfficeTableRow from './BackOfficeTableRow'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import { AccountContext } from '../../Context/AccountContext';

import {getComparator} from '../../Tools/Filtre/Filtre'

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el.node, index]);
  stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//Variable tableau
const headCells = [
  { id: 'userLogin', numeric: false, disablePadding: true, label: 'Utilisateur' },
  { id: 'userRole', numeric: true, disablePadding: false, label: 'Role' },
  { id: 'userDate', numeric: true, disablePadding: false, label: 'Date' },
];


//En-tête du tableau
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

    //className={ "margin-left": theme.spacing(7)} pour la table
  return (
    <TableHead> 
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate = { numSelected > 0 && numSelected < rowCount }
            checked = { rowCount > 0 && numSelected === rowCount }
            onChange = { onSelectAllClick }
            inputProps = {{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        <TableCell padding="checkbox" >
          <Typography>+</Typography>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '75%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 300,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

//Table
export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const { sessionData } = useContext( AccountContext );
  const xsrf =  sessionData['login'] ? sessionData["xsrf-token"] : false


  //Création de la requête
  const query = useMemo(
      () => {

        let queryColumn = "" ;
        headCells.map((n) => queryColumn += " " + n.id )

        const query = {
            query : `
                query {
                    eterUsers ( first: 100 ) {
                        edges {
                            node {
                                id
                                ${queryColumn}
                            }
                        }
                    }
                }
            `
        }
        return query
      }
      , []
  )

  const [rows, setRows] = useState([])
  
  //La requête
  useEffect( () => {
      Request( query, xsrf )
      .then(function(result) {
        setRows(Object.values(result.data.eterUsers.edges))
      })
  },[ xsrf ])

  //Bouton de trie
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //Selection de tout 
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.node.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Grid
      container
      direction = "row"
      justify = "center"
    >
      <Paper className={classes.paper}>
        <EnhancedTableToolbar selected = { selected }  xsrf = { xsrf } />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size= 'medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes = { classes }
              numSelected = { selected.length }
              order = { order }
              orderBy = { orderBy }
              onSelectAllClick = { handleSelectAllClick }
              onRequestSort = { handleRequestSort }
              rowCount = { rows.length }
            />
            <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <BackOfficeTableRow
                        key = { row.id }
                        row = { row }
                        setRows = { setRows }
                        index = { index }
                        selected = { selected }
                        setSelected = { setSelected }
                      />
                    )
                  })
                }
                {emptyRows > 0 && (
                  <TableRow style = { { height: 62 * emptyRows } }>
                      <TableCell 
                        colSpan = { 6 }
                        align = "center"
                      >
                        { emptyRows === rowsPerPage && <CircularProgress /> }
                      </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions = { [5, 10, 25, { label: 'All', value: -1 }] }
          component = "div"
          count = { rows.length }
          rowsPerPage = { rowsPerPage }
          page = { page }
          onChangePage = { handleChangePage }
          onChangeRowsPerPage = { handleChangeRowsPerPage }
        />
      </Paper>
    </Grid>
  );
}