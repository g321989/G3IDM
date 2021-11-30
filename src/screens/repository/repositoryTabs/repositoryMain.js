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





function RepositoryMain(props) {
  const classes = styles();
  const [loader, setLoader] = useState(true);
  const [statusCheck, setStatusCheck] = useState({
    statusActive: {},
  });
  console.log("statusCheck", statusCheck);
  const [pageData, setPageData] = useState([]);
  const [pageData1, setPageData1] = useState([]);

  const [formRepData, setFromRepData] = useState([]);
  const [formRepData1, setFromRepData1] = useState([]);

  const [reportsData, setReportsData] = useState([]);
  const [reportsData1, setReportsData1] = useState([]);

  const [processData, setprocessData] = useState([]);
  const [processData1, setprocessData1] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [selectedIndex, setSelectedIndex] = React.useState("Pages");











  const handleClose = async (status) => {
    const { alert } = props;
    let { setSnack } = alert;
    if (status) {
      let sendPageData = {
        entity: config.repositoryEntity,
        metadataId: config.metadataid,
        id: [deleteId],
        keyvalue: ["rep_id"],
      };
      await deleteDocument(sendPageData)
        .then((res) => {
          if (res?.data?.data) {
            setSnack({
              ...alert,
              horizontal: "right",
              msg: "Document deleted successfully",
              open: true,
              autoHideDuration: 6000,
              severity: "success",
              vertical: "top",
            });
          }
        })
        .catch((error) => {
          alert("Document not deleted.");
        });
      setOpen(false);
      getRepositoryData();
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getRepositoryData();
  }, []);

  const getRepositoryData = async () => {
    try {
      let readDocParams = {
        entity: config.repositoryEntity,
      };
      let getreadDocument = await readDocument(readDocParams);
      setTimeout(() => {
        // setLoader(false);
        let filterForms = getreadDocument?.data?.result?.filter(
          (i) => i.Repository.rep_type === "Forms"
        );
        let filterPages = getreadDocument?.data?.result?.filter(
          (i) => i.Repository.rep_type === "Pages"
        );
        let filterReports = getreadDocument?.data?.result?.filter(
          (i) => i.Repository.rep_type === "Reports"
        );
        let filterProcess = getreadDocument?.data?.result?.filter(
          (i) => i.Repository.rep_type === "Processes"
        );
        setPageData(filterPages);
        setPageData1(filterPages);

        setFromRepData(filterForms);
        setFromRepData1(filterForms);

        setReportsData(filterReports);
        setReportsData1(filterReports);

        setprocessData(filterProcess);
        setprocessData1(filterProcess);
        setLoader(false);
      }, 1000);
    } catch (error) {
      setPageData([]);
    }
  };

  // useEffect(() => {
  //   setInitialize();
  // }, []);
  const dispatch = useDispatch();

  const repository_list = useSelector((state) => state?.repositorySlice?.repository_read?.data);
  const repositoryTree = repository_list?.length>0 ? repository_list[0] : {};
  React.useLayoutEffect(() => {
    // dispatch(actions.ROLE_READ());
    dispatch(actions.REPOSITORY_READ_DOCUMENT())
  }, []);
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
        <DeleteComponent open={open} deleteClose={handleClose} />
      </Grid>
    </div>
  );
}

export default withAllContexts(RepositoryMain);
