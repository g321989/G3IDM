import React from "react";
import { LinearProgress } from "@material-ui/core";
import { NetworkCall } from "./networkcall";
import { LocalStorageKeys, NetWorkCallMethods, refreshCacheAndReload, semverGreaterThan } from "./utils";
import axios from "axios";

class AppAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.checkForLatestBuild();
    this.refreshAPI();
  }

  refreshAPI = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idmmetadataid = urlParams?.get("metadata_id");
    let authtoken = urlParams?.get("token");
    localStorage.setItem(LocalStorageKeys.authToken, authtoken);
    localStorage.setItem(LocalStorageKeys.idmmetadataid, idmmetadataid);
    this.getProjectDetails();
  }
  
  

  getProjectDetails = async () => {
    try {
      let idmmetadataid = localStorage.getItem(LocalStorageKeys.idmmetadataid);
      console.log("idmmetadataid", idmmetadataid);
      let params = {
        db_name: `${process.env.REACT_APP_METADATA_DB_NAME}`,
        entity: "projectvstools",
        filter: `projectvstools.metadataid=='${idmmetadataid}' && projectvstools.activestatus==true`,
        return_fields: `MERGE(UNSET(projectvstools,'createdby','createddate','updatedby','updatedate'),{clientname:first(for client in clients filter client._id==projectvstools.clientid return client.clientname)},{projectname:first(for project in projects filter project._id==projectvstools.projectid return project.projectname )})`,
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
          // window.location.reload(true);

          let data = res.data.result[0];
          
          this.setState({
            ...this.state,
            project: data,
            call: true,
            // isRender: true,
          });
          localStorage.setItem(LocalStorageKeys.ProjectDbname, data.dbname);
          localStorage.setItem(LocalStorageKeys.clientid, data.clientid);
          localStorage.setItem(LocalStorageKeys.ProjectId, data.projectid);
          
          this.getEntityDesignermetaId(data.projectid);
          this.gettenantid(data.projectid);
          
          this.getEntrpriseID(data.dbname);
          this.getOrganizationID(data.dbname);
          this.getFacilityID(data.dbname);
           console.log("getProjectDetails", data);
           
        })
        .catch((err) => {
          console.log(err);
          // alert("Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  getEntityDesignermetaId = async (projectid) => {
    try {
      let params = {
        db_name: `${process.env.REACT_APP_METADATA_DB_NAME}`,
        entity: "projectvstools",
        filter: `DOCUMENT(projectvstools.toolid).toolid=='88fd87fa-6163-4a05-ba19-5dee347e0f2d' and projectvstools.projectid =='${projectid}'`,
        return_fields: "projectvstools.metadataid",
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
          // console.log(res.data.result[0]);
          localStorage.setItem(LocalStorageKeys.metaDataId, res.data.result[0]);
          
        })
        .catch((err) => {
          // console.log(err);
          alert("Something Went Wrong");
        });
    } catch (error) {}
  };

  gettenantid = async (projectid) => {
    try {
      let params = {
        db_name: `${process.env.REACT_APP_METADATA_DB_NAME}`,
        entity: "idm_configuration",
        filter: `idm_configuration.projectid =='${projectid}'`,
        return_fields: "idm_configuration.tenantId",
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
          // console.log(res.data.result[0]);
          localStorage.setItem("tenentid", res.data.result[0]);
          
        })
        .catch((err) => {
          // console.log(err);
          alert("Something Went Wrong");
        });
    } catch (error) {}
  };

  getEntrpriseID = async (projectDBName) => {
    
    try {
      let params = {
        db_name: `${projectDBName}`,
        entity: "CodingMaster",
        sort: "CodingMaster.display",
        filter: `CodingMaster.Type=='ORGTYPE' and CodingMaster.display == 'Enterprise'`,
        return_fields:"CodingMaster._id",
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
           //console.log("getOrgDetails: ",res.data.result[0]);
          
          //return res.data.result[0];
          localStorage.setItem("EnterpriseID", res.data.result[0]);
        })
        .catch((err) => {
          // console.log(err);
          alert("Something Went Wrong");
        });
    } catch (error) {}
  };

  getOrganizationID = async (projectDBName) => {
    
    try {
      let params = {
        db_name: `${projectDBName}`,
        entity: "CodingMaster",
        sort: "CodingMaster.display",
        filter: `CodingMaster.Type=='ORGTYPE' and CodingMaster.display == 'Organization'`,
        return_fields:"CodingMaster._id",
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
           //console.log("getOrgDetails: ",res.data.result[0]);
          
          //return res.data.result[0];
          localStorage.setItem("OrganizationID", res.data.result[0]);
        })
        .catch((err) => {
          // console.log(err);
          alert("Something Went Wrong");
        });
    } catch (error) {}
  };

  getFacilityID = async (projectDBName) => {
    
    try {
      let params = {
        db_name: `${projectDBName}`,
        entity: "CodingMaster",
        sort: "CodingMaster.display",
        filter: `CodingMaster.Type=='ORGTYPE' and CodingMaster.display == 'Facility'`,
        return_fields:"CodingMaster._id",
      };
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_ARANGO_URL_READ}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      };
      await axios(config)
        .then((res) => {
           //console.log("getOrgDetails: ",res.data.result[0]);
           localStorage.setItem("FacilityID", res.data.result[0]);
          //return res.data.result[0];
        })
        .catch((err) => {
          // console.log(err);
          alert("Something Went Wrong");
        });
    } catch (error) {}
  };

  
  checkForLatestBuild = () => {
    NetworkCall(
      `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + window.location.port : ''}/meta.json`,
      NetWorkCallMethods.get,
      null,
      null,
      false,
      true).then((_) => {
        const isVersion = semverGreaterThan(_.data.version, localStorage.getItem(LocalStorageKeys.version));
        localStorage.setItem(LocalStorageKeys.version, _.data.version)
        if (isVersion) {
          refreshCacheAndReload();
        }
      }).catch(err => {
        console.log('err:', err);
      })
  }

  render() {

    let {
      loading
    } = this.state;

    return (
      <>
        {loading ?
          <LinearProgress />
          : this.props.children
        }
      </>
    );
  }
}

export default AppAuth;
