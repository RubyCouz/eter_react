import React, {
    useMemo,
} from "react"

import {
    Box,
    Table,
    TableBody,
    TableContainer,
    Paper,
} from "@material-ui/core"

import TableRowEdit from '../../components/TableRowEdit/TableRowEdit';
  
export default function TabPanel(props) {
  const { currentIndex, index, data, idUser, defaultValue, setDefaultValue, ...other } = props;


  // Création du formulaire pour le rendu
  const form = useMemo(
    () => {
      let createForm = []

      for ( const [ nameQuery, column ] of Object.entries( data ) ) {
        createForm.push(
          <TableRowEdit
            key = { nameQuery }
            nameQuery = { nameQuery }
            tableRowOption = { column } // edit, modifiedValue, process,
            idUser = { idUser }
            defaultValue = { defaultValue }
            setDefaultValue = { setDefaultValue }
          />
        )
      }

      return createForm
    }
    , [ defaultValue, setDefaultValue, data, idUser ]
  );
  
  return (
    <div
      role = "tabpanel"
      hidden = { currentIndex !== index }
      id = { `vertical-tabpanel-${index}` }
      aria-labelledby = { `vertical-tab-${index}` }
      { ...other }
    >
      {currentIndex === index && (
        <Box
          p = { 3 }
        >
          <TableContainer
            component = { Paper }
          >
            <Table
              aria-label = "custom pagination table"
              size = 'medium'
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

