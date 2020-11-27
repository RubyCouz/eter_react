import React from "react";

import { 
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Grid,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";

import {
    AccountCircle as AccountCircleIcon,
    Visibility,
    VisibilityOff
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import { ModalContext } from "../../ModalContext";
import { AccountContext } from '../../../../Context/AccountContext';


export default function LogInForm() {
    const useStyles = makeStyles((theme) => ({
        inputClass: {
            width: '100%'
        },
    }))

    const classes = useStyles();

    const [inputValue, setInputValue] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setInputValue({...inputValue, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setInputValue({...inputValue, showPassword: !inputValue.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { ModalAlertSetData } = React.useContext(AccountContext);

    const axios = require('axios').default;
    
    const handleClick = () => {
        handleClose();
        axios({
            data: {
                email: inputValue.email,
                password: inputValue.password
            },
            method: 'post',
            url: 'https://localhost:8000/api/token/login',
            withCredentials: true,
        })
        .then(function () {
            ModalAlertSetData({
                data:"Token sauvegarder",
                severity: "success"
            })
        })
        .catch(function () {
            ModalAlertSetData({
                data:"Pas de token",
                severity: "error"
            })
        });
    }
    
    
    const {handleClose} = React.useContext(ModalContext);

    return (
        <div>
            <DialogTitle id="alert-dialog-slide-title">{"Connexion"}</DialogTitle>
            {/*<form noValidate autoComplete="off">*/}
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FormControl variant="outlined" className={classes.inputClass}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                label="Email"
                                id="email"
                                value={inputValue.email}
                                onChange={handleChange('email')}
                                endAdornment={<InputAdornment position="end">
                                    <AccountCircleIcon/>
                                </InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                               labelWidth={70}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                        <FormControl variant="outlined" className={classes.inputClass}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={inputValue.showPassword ? 'text' : 'password'}
                                value={inputValue.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {inputValue.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Annuler
                </Button>
                <Button onClick={handleClick} color="primary">
                    Se connecter
                </Button>
            </DialogActions>
        </div>
    )
}