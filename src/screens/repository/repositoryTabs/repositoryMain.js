/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Typography,

  Grid,

  Divider,
} from "@material-ui/core";

import { withAllContexts } from "../../../HOCs";
import styles from "./styles";
import {
  readDocument,
  deleteDocument,
  upsertDocument,
} from "../../../function/commonapi";
import {config} from "../../../config";
import DeleteComponent from "./deleteComp";
// import EditIcon from "../../../assets/icons - Edit.svg";
// import DeleteIcon from "../../../assets/icons8-trash.svg";
// import { withStyles } from "@material-ui/core/styles";
// import searchicon from "../../../assets/icons - Search.svg";
// import TreeViewComponent from "./orgAccess";
import Tree from "../../../components/tree";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "idm_binder";
import { withRouter } from "react-router";
import axios from 'axios';




function RepositoryMain(props) {
  const classes = styles();

  const dispatch = useDispatch();

  const repository_list = useSelector((state) => state?.repositorySlice?.repository_read?.data);
  const repositoryTree = repository_list?.length>0 ? repository_list[0] : {};
  console.log(repositoryTree)
  // React.useLayoutEffect(async() => {
  //   // dispatch(actions.ROLE_READ());
    
  // }, []);
  useEffect(async()=>{
    if (props.location.search && props.location.search.length > 0) {
      let params = new URLSearchParams(props.location.search)
      // sessionStorage.setItem('metadataname', params.get('metaDataName'))
      sessionStorage.setItem('metadata_id', params.get('metadata_id'))
      let payload = {
        db_name: `${config.qdm_dbname}`,
        entity:"projectvstools",
        filter:`projectvstools.metadataid=='${params.get('metadata_id')}'`,
        return_fields: `{projectvstools}`

      }
      let project_details = {};
      await axios
      .post(`${config.api_url}/api/read_documents`,payload )
      .then(async(response) => {
        if(response?.data?.Code===201){
          project_details = response?.data?.result[0]?.projectvstools;
        } else {

        }
      })
      .catch((error)=>{

      });
     
      let project_info = {};
      let tool_id = "";
      if(project_details?.projectid){
        let entity_tool = {
          db_name: `${config.qdm_dbname}`,
          entity:"tools",
          filter:`tools.toolid=='${config.entityDesignerId}'`,
          return_fields: `{tools}`
        }
        await axios
        .post(`${config.api_url}/api/read_documents`,entity_tool )
        .then(async(response) => {
          if(response?.data?.Code===201){
            
            tool_id = response?.data?.result[0]?.tools?._id;
          } else {
  
          }
        })
        .catch((error)=>{
  
        });
        let metadataparams = {
          db_name: `${config.qdm_dbname}`,
          entity:"projectvstools",
          filter:`projectvstools.projectid=='${project_details?.projectid}' and projectvstools.toolid=='${tool_id}'`,
          return_fields: `{projectvstools}`
        }
        await axios
        .post(`${config.api_url}/api/read_documents`,metadataparams )
        .then(async(response) => {
          if(response?.data?.Code===201){
            sessionStorage.setItem('entity_metadata_id',response?.data?.result[0]?.projectvstools?.metadataid)
            // project_details = response?.data?.result[0]?.projectvstools;
          } else {
  
          }
        })
        .catch((error)=>{
  
        });
        let project_payload =  {
          db_name: `${config.qdm_dbname}`,
          entity:"projects",
          filter:`projects._id=='${project_details?.projectid}'`,
          return_fields: `{projects}`
        }
        await axios
        .post(`${config.api_url}/api/read_documents`,project_payload )
        .then(async(response) => {
          if(response?.data?.Code===201){
            project_info = response?.data?.result[0]?.projects;
            sessionStorage.setItem('dbname', project_details.dbname);
          } else {
  
          }
        })
        .catch((error)=>{
  
        });
      }
    }
    let dbnameParams =  {
      dbname:sessionStorage.dbname
    }
    dispatch(actions.REPOSITORY_READ_DOCUMENT())
  },[]);
  console.log("repository_list", repository_list, actions);
  return (
    <div className={classes.contentBox}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              // padding: "10px 20px",
              border: "1px solid #DCDCDC",
            }}
          >
            <Typography className={classes.numbersEdit}>Repository</Typography>
            <Divider />
            {
              repository_list?.length >0 ? 
                <div style={{ padding: "10px 20px 6px 38px" }}>
                  <Tree data={repositoryTree?.project_component} />
                </div>
                : 
                <div style={{ padding: "10px 20px 6px 38px" }} className={classes.nodatafound}>
                  <span>No data found.</span>
              </div>
            }
            
          </div>
        </Grid>
        
        {/* -------------------------------- delete ----------------------------------  */}
        {/* <DeleteComponent open={open} deleteClose={handleClose} /> */}
      </Grid>
    </div>
  );
}

export default withRouter(withAllContexts(RepositoryMain));
