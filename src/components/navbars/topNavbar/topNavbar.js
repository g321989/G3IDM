import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { MeetingRoom } from '@material-ui/icons';
import { LocalStorageKeys } from '../../../utils';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer } from '@material-ui/core';
import { SideNavBar } from '..';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        display: 'block',
    },
    titleContainer: {
        marginLeft: theme.spacing(2)
    },
    menuIcon: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}));

export const TopNavBar = (props) => {

    const classes = useStyles();

    const [state, setState] = React.useState({
        openSideNavBar: false
    })

    const handleLogout = () => {

    }

    const toogleSideNavBar = () => {
        setState({
            ...state,
            openSideNavBar: !state.openSideNavBar
        })
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>

                    <IconButton className={classes.menuIcon} onClick={toogleSideNavBar}>
                        <MenuIcon htmlColor="white" />
                    </IconButton>

                    <div className={classes.titleContainer}>
                        <Typography className={classes.title} variant="h6" noWrap>
                           IDM
                        </Typography>
                        <Typography variant="caption">
                            {`v${localStorage.getItem(LocalStorageKeys.version)}`}
                        </Typography>
                    </div>

                    <div className={classes.grow} />

                    <IconButton
                        aria-label="logout button"
                        aria-controls={"logout_button"}
                        aria-haspopup="true"
                        onClick={handleLogout}
                        color="inherit"
                    >
                        <MeetingRoom />
                    </IconButton>

                    <Drawer
                        open={state.openSideNavBar}
                        variant={"temporary"}
                        anchor="left"
                        onClose={toogleSideNavBar}>
                        <div style={{ width: 240 }}>
                            <SideNavBar isMobile={true} />
                        </div>
                    </Drawer>

                </Toolbar>
            </AppBar>
        </div>
    );
}
