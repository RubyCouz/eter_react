import React, {
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react"

import {
    Box,
    Table,
    TableBody,
    TableContainer,
    Paper,
} from "@material-ui/core"

import AccountRow from './AccountRow';
  
export default function TabPanel(props) {
  const { value, index, data, ...other } = props;


  // Création du formulaire pour le rendu
  const form = useMemo(
    () => {
      let createForm = []

      for ( const [ nameQuery, column ] of Object.entries( data ) ) {
        createForm.push(
          <AccountRow
            key = { nameQuery }
            nameQuery = { nameQuery }
            nameColumn = { column[ "nameColumn" ] }
            process = { column[ "process" ] || false }
            modified = { !( column[ "modifiedValue" ] === false ) }
          />
        )
      }

      return createForm
    }
    , []
  );
  
  return (
    <div
      role = "tabpanel"
      hidden = { value !== index }
      id = { `vertical-tabpanel-${index}` }
      aria-labelledby = { `vertical-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box
          p = { 3 }
        >
          <TableContainer
            component = { Paper }
          >
            <Table
              aria-label = "custom pagination table"
            >
              <TableBody>
                { form }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}

