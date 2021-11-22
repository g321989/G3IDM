import {
  Typography,
  makeStyles,
  AppBar,
  Tab,
  Tabs,
  Box,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Roles from "./repositoryTabs/roles";

import RepositoryMain from "./repositoryTabs/repositoryMain";
import PermissionList from "./repositoryTabs/permissionList";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,

    "& .MuiTab-textColorPrimary": {
      "&.Mui-selected": {
        color: "#0071F2",
      },
    },
    "&.MuiPaper-elevation4": {
      shadow: "none",
    },
    "& .MuiTab-root": {
      [theme.breakpoints.up("xs")]: {
        minWidth: "inherit !important",
      },
    },
    "& .MuiAppBar-root": {
      width: "80%",
    },
  },
  MuiTab: {
    root: {
      minWidth: 0,
      "@media (min-width: 0px)": {
        minWidth: 0,
      },
    },
  },
  box: {
    padding: "24px 12px",
    paddingBottom: "43px",
    backgroundColor: "#F6F6F6",
    // height: "100vh",
    height: "100%",
    paddingTop: "14px",
  },
}));

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.box}>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Repository(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={0}>
     
        <Grid item md={12}>
          <div className={classes.root}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  paddingTop: "14px",
                  paddingLeft: "25px",
                  fontFamily: "poppinsemibold",
                  fontSize: "14px",
                  width: "200px",
                }}
              >
                User Management
              </div>
              <AppBar
                position="static"
                color="default"
                style={{ boxShadow: "none", zIndex: "auto" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  className={classes.root}
                >
                  <Tab
                    style={{
                      fontSize: "12px",
                      textTransform: "unset",
                      fontFamily: "poppinsemibold",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      marginLeft: "20px",
                    }}
                    className={classes.color}
                    label="Repository"
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={{
                      fontSize: "12px",
                      textTransform: "unset",
                      fontFamily: "poppinsemibold",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      marginLeft: "20px",
                    }}
                    label="Permission List"
                    {...a11yProps(2)}
                  />
                  <Tab
                    style={{
                      fontSize: "12px",
                      textTransform: "unset",
                      fontFamily: "poppinsemibold",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      marginLeft: "20px",
                    }}
                    label="Roles"
                    {...a11yProps(3)}
                  />
                  
                </Tabs>
              </AppBar>
            </div>
            <TabPanel value={value} index={0} style={{ padding: "0px" }}>
              <div
                style={{ borderRadius: "10px", width: "100%", padding: "0px" }}
              >
                <RepositoryMain />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div
                style={{ borderRadius: "10px", width: "100%", padding: "0px" }}
              >
                <PermissionList />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div
                style={{ borderRadius: "10px", width: "99%", padding: "0px" }}
              >
                <Roles />
              </div>
            </TabPanel>
          </div>
        </Grid>
      
    </Grid>
  );
}

export default Repository
