import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { LocalStorageKeys } from '../../utils';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../router/routes';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        marginTop: "20%"
    }
}))

export const Home = props => {

    const history = useHistory();
    const classes = useStyles();

    const onLogOut = () => {
       // localStorage.removeItem(LocalStorageKeys.authToken);
        history.push(Routes.home);
    }

    return <div className={classes.root}>
        <Typography variant="body1">
            Your are logged in!!!
        </Typography>
        <Button
            variant={"contained"}
            color={"primary"}
            onClick={onLogOut}
        >
            Logout
        </Button>
    </div>
}