import React, { useState } from "react";
import {
    Typography,
    makeStyles,
    AppBar,
    Tab,
    Tabs,
    Box,
    Grid,
    useTheme,
  } from "@material-ui/core";
import useStyles from "./style";
import RepositoryMain from "../repositary/repositaryTabs/repostratyMain";
import PermissionMapping  from "../repositary/repositaryTabs/permissionList";
import RolesMapping from "../repositary/repositaryTabs/rolesMapping"
import PropTypes from "prop-types";
import PractitionerTable from "../practitionerMaster/practitionertable"
import { withAllContexts } from "../../HOCs";
import { messageCatalogGetter } from "../../utils/common/function";
import { ToastContainer } from 'react-toastify';
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

  const Repository = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [listData, setListData] = React.useState([]);
    React.useEffect(() => {
      const baseFun = async () => {
        
        var unique = [
          "repository",
          "permissionList",
          "roles",
          // "rolesMapping",
          "person",
          "users",
        ];
  
        setListData(unique);
      };
      baseFun();
      if (props?.location?.state?.index) {
        setValue(props?.location?.state?.index ?? 0);
      }
    }, []);
  
    React.useEffect(() => {
      if (props?.location?.state) {
        setValue(props?.location?.state?.index ?? 0);
      }
      // eslint-disable-next-line
    }, [props?.location?.state?.index]);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div>
      <Grid container spacing={0}>
        <Grid item md={12}>
          <div className={classes.root}>
            <div className={classes.MainHead}>
              <div className={classes.AppHeading}>
             
              </div>
              <AppBar
                position="static"
                color="default"
                className={classes.AppBarstyle}
              
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  
                >
                  {listData.indexOf("repository") > -1 && (
                    <Tab
                      className={classes.TabStyle}
                      label={messageCatalogGetter("Repository") ?? "Repository"}
                      {...a11yProps(1)}
                    />
                  )}
                  {listData.indexOf("permissionList") > -1 && (
                    <Tab
                    className={classes.TabStyle}
                      label={messageCatalogGetter("Permission List") ?? "Permission List"}
                      {...a11yProps(2)}
                    />
                  )}
                  {listData.indexOf("roles") > -1 && (
                    <Tab
                    className={classes.TabStyle}
                      label={messageCatalogGetter("Roles") ?? "Roles"}
                      {...a11yProps(4)}
                    />
                  )}
                  {listData.indexOf("rolesMapping") > -1 && (
                    <Tab
                    className={classes.TabStyle}
                      label={messageCatalogGetter("Role Mapping") ?? "Role Mapping"}
                      {...a11yProps(3)}
                    />
                  )}
                  {listData.indexOf("person") > -1 && (
                    <Tab
                    className={classes.TabStyle}
                      label={messageCatalogGetter("Person") ?? "Person"}
                      {...a11yProps(5)}
                    />
                  )}
                  
                </Tabs>
              </AppBar>
            </div>
            <TabPanel value={value} index={0} style={{ padding: "0px" }}>
              <div className={classes.tabstyle}>
                <RepositoryMain classes={classes} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div
                 className={classes.tabstyle}
              >
                <PermissionMapping classes={classes} />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className={classes.tabstyle}>
           
                <RolesMapping classes={classes} />
              </div>
            </TabPanel>
            
            <TabPanel value={value} index={3}>
              <div className={classes.tabstyle}>
                <PractitionerTable parent_id={"Practitioner"} classes={classes} />
              </div>
            </TabPanel>
            
          </div>
        </Grid>
        
      </Grid>
      <ToastContainer />
      </div>
    );
  }

  export default withAllContexts(Repository);
  