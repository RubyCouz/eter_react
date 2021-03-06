import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";



export default function SignInForm() {
    const useStyles = makeStyles((theme) => ({
            inputClass: {
                width: '100%'
            },
        })
    )
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
    let [setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen={setOpen}
    };
    return (
        <div>
            <DialogTitle id="alert-dialog-slide-title">{"Inscription"}</DialogTitle>
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
                <Button onClick={handleClose} color="primary">
                    S'inscrire
                </Button>
            </DialogActions>


        </div>
    )
}