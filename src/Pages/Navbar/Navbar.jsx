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
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    button: {
        color: 'white',
        border: '1px solid white'
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
                        alignItems="baseline"
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                noWrap
                            >
                                EterelZ
                            </Typography>
                        </Box>
                        <Box
                            visibility = { userRole === "ROLE_ADMIN" ? "visible": "hidden"}
                        >
                            <NavLink to={"/admin"}>
                                <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    key={"BackOffice"}
                                >
                                    Back-office
                                </Button>
                            </NavLink>
                        </Box>
                       
                        <Box>
                            <ButtonGroup
                                aria-label="outlined primary button group"
                            > 
                                <Button
                                    onClick = {sessionRemove}
                                    className={classes.button}
                                >
                                    Déconnecter
                                </Button>
                                <NavLink
                                    to = { userRole ? "/account" : path + "/login" }
                                >
                                    <Button
                                        className={classes.button}
                                    >
                                        { userRole ? "Compte" : "Connexion" }
                                    </Button>
                                </NavLink>
                            </ButtonGroup>
                        </Box>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={
                    clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })
                }
                classes={{
                    paper: clsx({
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
                <List>
                    <NavLink to="/" onClick={handleDrawerClose}>
                        <ListItem button key={"Home"}>
                            <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/test" onClick={handleDrawerClose}>
                        <ListItem button key={"Test"}>
                            <ListItemIcon><RowingOutlinedIcon/></ListItemIcon>
                            <ListItemText primary={"Test"}/>
                        </ListItem>
                    </NavLink>
                </List>
            </Drawer>
        </>

    )
}



