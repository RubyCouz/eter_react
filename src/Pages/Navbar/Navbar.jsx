import React, { useContext } from "react"
import clsx from 'clsx';

import {
    NavLink,
    useLocation,
} from "react-router-dom"

import {
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';

import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    HomeOutlined as HomeOutlinedIcon,
    RowingOutlined as RowingOutlinedIcon,
} from '@material-ui/icons';

import {
    Box,
    Grid,
    Button,
    CssBaseline,
    Typography,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    ButtonGroup,
} from "@material-ui/core";


import { AccountContext } from '../../Context/AccountContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        background:'#27272580', //secondary color
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        background:'transparent',
        "border-right":'none',
        width: theme.spacing(7),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

export default function Navbar() {
    let location = useLocation();
    let path = location.pathname

    path = path === "/" ? "" : path



    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //Chargement du role de l'utilisateur
    const {sessionData, sessionRemove} = useContext(AccountContext);

    let userRole = false

    if (sessionData["login"]) {
        userRole = sessionData["roles"][0]
    }

    return (
        <>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={
                    clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })
                }
            >
                <Toolbar>
                    <IconButton
                        color = "inherit"
                        aria-label = "open drawer"
                        onClick = {handleDrawerOpen}
                        edge = "start"
                        className = {
                            clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })
                        }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >

                            <img src="./img/themes/logo.png" alt="Logo EterelZ" />

                        <Box
                            visibility = { userRole === "ROLE_ADMIN" ? "visible": "hidden"}
                        >
                            <NavLink to={"/admin"}>
                                <Button
                                    variant="outlined"
                                    key={"BackOffice"}
                                >
                                    Back-office
                                </Button>
                            </NavLink>
                        </Box>
                       
                        <Box>
                            <ButtonGroup
                                color="secondary"
                                variant="outlined"
                                aria-label="outlined secondary button group"
                            > 
                                <Box
                                    component = "span"    
                                    visibility = { userRole ? "visible" : "hidden" }
                                >
                                    <Button
                                        onClick = { sessionRemove }
                                        display =  "none"
                                    >
                                        Déconnecter
                                    </Button>
                                </Box>
                                <Button
                                    component={NavLink}
                                    to={ userRole ? "/account" : path + "/login" }
                                >
                                    { userRole ? "Compte" : "Connexion" }
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                elevation={0}
                color="primary" 
                variant="permanent"
                /*className={
                    clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })
                }*/
                classes={{
                    paperAnchorDockedLeft: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List color="secondary">
                    <ListItem
                        button
                        key={"Home"}
                        component={NavLink}
                        to="/"
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
                        <ListItemText color="secondary" primary="Home"/>
                    </ListItem>
                    <ListItem 
                        button 
                        key={"Test"}
                        component={NavLink}
                        to="/test" 
                        onClick={handleDrawerClose}
                    >
                        <ListItemIcon><RowingOutlinedIcon/></ListItemIcon>
                        <ListItemText primary={"Test"}/>
                    </ListItem>
                </List>
            </Drawer>
        </>

    )
}



