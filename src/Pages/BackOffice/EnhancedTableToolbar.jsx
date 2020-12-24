import 
    React,{
        useState,
        useEffect,
} from 'react'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import {
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    FilterList as FilterListIcon,
} from '@material-ui/icons';

import Request from '../../Tools/Request/Request'

//Style de la toolbar
const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

//La toolbar
export default (props) => {
    const classes = useToolbarStyles();
    const { selected } = props;
  
    const numSelected = selected.length
  
    const deleteButton = () =>{
      console.log(selected)
    }

    return (
        <Toolbar
        className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}
        >
        {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
            </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Les membres
            </Typography>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Delete">
            <IconButton 
                aria-label="delete"
                onClick={deleteButton}
            >
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
};