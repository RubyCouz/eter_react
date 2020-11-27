import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Routes from './Routes/Routes';
import { AccountContext } from './Context/AccountContext';
import ModalAlert from './components/ModalAlert/ModalAlert';
import './App.css';
import useCookiePlayload from "./Hook/useCookiePlayload"

// import composants
const Navbar = lazy( () => import('./Pages/Navbar/Navbar'));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function App() {

  const classes = useStyles();

  //Hook pour les information du JWT
  const [ sessionData, sessionRemove ] = useCookiePlayload('jwt_hp')
  



  //Hook pour la snackbar
  const [open, setOpen] = useState(false);

  const [snackData, setSnackData] = useState({
    data: null,
    severity: null
  })

  const setSnackDataFunction = (data) => {
    setSnackData(data);
    setOpen(true);
  };

  return (
    <AccountContext.Provider 
      value={{
          ModalAlertSetData: setSnackDataFunction,
          sessionData: sessionData,
          sessionRemove: sessionRemove,
        }}
    >
      <ModalAlert 
        snackData={snackData}
        open={{
          value : open,
          setValue : setOpen
        }}
      />
      <ThemeProvider theme={theme}>
        <div className={'App', classes.root}>
          <Router>
            <Suspense fallback={<CircularProgress />}>     
              <Navbar />
              <div className={classes.content} >
                <div className={classes.toolbar} />
                <Routes />
              </div>
            </Suspense>
          </Router>
        </div>
      </ThemeProvider>
    </AccountContext.Provider>
  );
}

export default App;
