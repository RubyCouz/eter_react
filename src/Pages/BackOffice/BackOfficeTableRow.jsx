import React from "react"

import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Typography,
  Box,
  Collapse,
} from '@material-ui/core';

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';

export default function BackOfficeTableRow( props ) {
  const { row, index, setSelected, selected } = props
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isItemSelected = isSelected(row.userLogin);
  const labelId = `enhanced-table-checkbox-${index}`;


  

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.userLogin}
        
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            onClick={(event) => handleClick(event, row.userLogin)}
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.userLogin}
        </TableCell>
        <TableCell align="right">{row.userRole}</TableCell>
        <TableCell align="right">{row.userDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    
    </>
  );
 }
