import React from 'react';

import {
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';

import {
    Box,
    Tab,
    Tabs,
    AppBar,
    Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import LogInForm from "./LogInForm/LogInForm";
import Signin from "./SignInForm/SignInForm";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));


export default function FullWidthTabs() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar 
                position="static"
                color="default"
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Connexion" {...a11yProps(0)} />
                    <Tab label="Inscription" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <LogInForm/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Signin/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
