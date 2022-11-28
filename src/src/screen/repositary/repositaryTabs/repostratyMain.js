import React, { useLayoutEffect } from "react";
import { Typography, Grid, Divider, useTheme } from "@material-ui/core";
import Tree from "../../../components/tree";
import { useDispatch, useSelector } from "react-redux";
// import { actions } from "atp-authorization-binder";
// import {actions} from "../../../redux/src/index";
import { messageCatalogGetter } from "../../../utils/common/function";
import { actions } from "../../../../redux";

const RepositoryMain = (props) => {
  const { classes } = props;
    const dispatch = useDispatch();

    const repository_list = useSelector(
        (state) => state?.repositorySlice?.repository_read?.data
      );

    const repositoryTree = repository_list?.length > 0 ? repository_list[0] : {};


    
      useLayoutEffect(() => {
        const roleid = localStorage.getItem("RoleId");
        const tenentid = localStorage.getItem("tenentid");
       // let res= dispatch(actions.REPOSITORY_READ_DOCUMENT({ dbname:"ipmo"}));
       let res= dispatch(actions.REPOSITORY_READ_DOCUMENT());
         console.log("res",res);
      }, []);


      return (
        <div className={classes.contentBox}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <div className={classes.RepoHead}>
                <Typography className={classes.numbersEdit}>{messageCatalogGetter("Repository") ?? "Repository"}</Typography>
                <Divider />
                {repository_list?.length > 0 ? (
                  <div className={classes.Treecomp}>
                    <Tree repository={repositoryTree?.project_component} />
                  </div>
                ) : (
                  <div
                    
                    className={classes.nodatafound}
                  >
                    <span>{messageCatalogGetter("No data found") ?? "No data found."}</span>
                  </div>
                )}
              </div>
            </Grid>
    
            {/* -------------------------------- delete ----------------------------------  */}
            {/* <DeleteComponent open={open} deleteClose={handleClose} /> */}
          </Grid>
        </div>
      );
}

export default RepositoryMain;