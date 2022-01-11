/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  Switch,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Divider,
  IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles";
// import { DrawerProps, treeData } from "../../../utils";
import { withAllContexts } from "../../../HOCs";
// import CreatePermission from "./createPermission";
// import {
//   readDocument,
//   getUserId,
//   deleteDocument,
//   upsertDocument,
// } from "../../../function/commonapi";
// import config from "../../../config";
import DeleteComponent from "./deleteComp";
import EditIcon from "../../../assets/icons - Edit.svg";
import DeleteIcon from "../../../assets/icons8-trash.svg";
import { withStyles } from "@material-ui/core/styles";
import searchicon from "../../../assets/icons - Search.svg";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Paper from "@material-ui/core/Paper";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import ToggleButtoncomp from "./toggle";
import { ContactSupportOutlined } from "@material-ui/icons";
import Tree from "../../../components/tree";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actions } from "idm_binder";
import { v4 as uuidV4 } from 'uuid'
import { withRouter } from "react-router";


const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    // margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#0071F2",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 12,
    height: 12,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(Switch);

function TabPanel(props) {
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
        <Box>
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



const togArray = [];

function PermissionList(props) {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = useState({
    statusActive: [],
    active: null,
    secondSection: "Pages",
    permissionPage: {},
  });
  const [editMode, setEditMode] = useState(false);

  // const getCrudLength = () => {};

  // const [permisonName, setPermisonName] = React.useState("");
  const [json, setJson] = useState({
    //repo_mapping: {
    permissionID: "",
    permissionNam: "",
    tabName: "Pages",
    Pages: [],
    Forms: [],
    Reports: [],
    Processes: [],
    //},
  });
  console.log("initial json", json);

  const [permissionData, setPermissionData] = useState([]);
  const [permissionData1, setPermissionData1] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [formRepData, setFromRepData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [processData, setprocessData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [btnJson, setBtnJson] = useState({
    create: false,
    read: false,
    update: false,
    delete: false,
  });
  console.log("permissionData", permissionData);


  const handleClickOpen = (item) => {
    setDeleteId(item?._id);
    setOpen(true);
  };

  // HANDLE DELETE
  const handleClose = async (status) => {
    if(!status){
      setOpen(false);
      return;
    }
    
    let list = {
      dbname:sessionStorage.dbname,
      metadataId:sessionStorage.entity_metadata_id,
      _id:deleteId
    };

 
    try{
      let delete_data = await dispatch(actions.PERMISSION_DELETE(list));
      // setOpen(false);
      if(delete_data?.payload?.error || delete_data?.payload?.data?.Code !==201){
            handleAlerts("Permission deleted unsuccessfully!", false);
            return;
      }
      setInitialize();
      handleAlerts("Permission deleted successfully!", true);

    } catch(error){
      // setOpen(false);
      handleAlerts("Permission deleted unsuccessfully!", false);
      setOpen(false);

    }
    setOpen(false);

  };

  // useEffect(() => {
  //   getPermissionData();
  //   getRepositoryData();
  // }, []);

  //API CALL FOR CHANGE PERMISSION STATUS
  const handlePermissionStatus = async (event, item) => {
      // console.log(JSON.stringify(item));
      let list = {
        dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,

        is_active: !item?.is_active,
        _key:item._key
      };
  
     
      try{
        let delete_data = await dispatch(actions.PERMISSION_UPSERT(list));
        // setOpen(false);
        if(delete_data?.payload?.error || delete_data?.payload?.data?.Code !==201){
              handleAlerts("Permission status changed unsuccessfully!", false);
              return;
        }
        setInitialize();
        handleAlerts("Permission status changed successfully!", true);
  
      } catch(error){
        // setOpen(false);
        handleAlerts("Permission status changed unsuccessfully!", false);
  
      }
    };


  //SEARCH FOR PROCESS
  const searchChange = (event) => {
    let val = event.target.value.toLowerCase();
    const filterDate = clonepermissionList.filter((item) => {
      return item?.permissionName
        .toLowerCase()
        .includes(val);
    });
    setPermissionList(filterDate)
  };







  const handleAlerts = (message, status) => {
    const { alert } = props;
    let { setSnack } = alert;
    setSnack({
      ...alert,
      horizontal: "right",
      msg: message,
      autoHideDuration: 6000,
      open: true,
      severity: status ? "success" : "error",
      vertical: "top",
    });
  };


  const drawerOpen = () => {
    setEditMode(true);
    
    setPermissionDetails({
      permission_name:"",
      repo_list:JSON.parse(JSON.stringify(repoPermission)),
      select_permission:{},
      error:{
        permission_name:false,
        repo_list:false,
      },
      errorMsg:{
        permission_name:"please enter the field",
        repo_list:"please select the permission",
      }
    });
  };

  
  const [datalist, setdatalist] = useState({
    data: [],
    master: [],
  });


  // Handle Detail Permission Edit
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };



  // new logic created by manikandan

  useEffect(() => {
    setInitialize();
  }, []);


  // React.useLayoutEffect(() => {

  //   // setInitialize();
  // }, []);
  const dispatch = useDispatch();

  const clonepermissionList = useSelector((state) => state?.permissionSlice?.permission_read?.data);
  const repository_list = useSelector((state) => state?.repositorySlice?.repository_read?.data);
  const repositoryTree = repository_list?.length>0 ? repository_list[0] : {};
  const [repoPermission,setRepoPermission] =  useState({});
  const [ permissionList,setPermissionList ] = useState(clonepermissionList);
  useEffect(()=>{
    setPermissionList(clonepermissionList)
  },[clonepermissionList])

  const [permissionDetails,setPermissionDetails] =  useState({
    permission_name:"",
    repo_list:{},
    select_permission:{},
    error:{
      permission_name:false,
      repo_list:false,
    },
    errorMsg:{
      permission_name:"please enter the field",
      repo_list:"please select the permission",
    }

  });
  const constructionTree = (_struct,str={})=>{
    _struct?.map((_,index)=>{
      str[_.key] = {};
      str[_.key].id = _.id;
      // str[_.key].key=_.key;
      str[_.key].permission= {
          "read": false,
          "write": false,
          "update":false,
          "delete":false
      };
      if(_?.actionable){
        str[_.key].actionable = _.actionable;

      }
      if(_?.routes){
        str[_.key].routes = _.routes;

      }
      if(_?.children?.length>0){
        str[_.key].component = constructionTree(_?.children);

      }
  
    })
    return str;
  }
  const setInitialize = async() =>{
    debugger;
    try{
      const { alert } = props;
      let { setSnack } = alert;
      let dbname = {
         dbname:sessionStorage.dbname

      }
      let repo_list = await dispatch(actions.REPOSITORY_READ_DOCUMENT(dbname));
      if(repo_list?.payload?.error ){
        setLoader(false)
        // setSnack({
        //   ...alert,
        //   horizontal: "right",
        //   msg: "Something went wrong !",
        //   open: true,
        //   severity: "error",
        //   vertical: "top",
        // });
        return;
       }
       let constructJSON = constructionTree(repo_list?.payload?.data[0]?.project_component);
       setRepoPermission(constructJSON);
     let permission_list  =  await dispatch(actions.PERMISSION_READ(dbname));
     if(permission_list?.payload?.error ){
      setLoader(false)
      // setSnack({
      //   ...alert,
      //   horizontal: "right",
      //   msg: "Something went wrong !",
      //   open: true,
      //   severity: "error",
      //   vertical: "top",
      // });
      return;
     }
     setLoader(false)
      setUpdatePermission(permission_list?.payload?.data[0]);
    }catch(error){
      debugger;
    }
    
  }
  const  compareJSON = (old_json,new_data) =>{
    old_json =  JSON.parse(JSON.stringify(old_json));
    new_data?.map(_=>{
      if(!old_json[_?.key]){
        debugger;
        old_json[_.key] = {};
        old_json[_.key].id = _.id;
        // old_json[_.key].key=_.key;
        old_json[_.key].permission= {
            "read": false,
            "write": false,
            "update":false,
            "delete":false
        };
        if(_?.actionable){
          old_json[_.key].actionable = _.actionable;
  
        }
        if(_?.routes){
          old_json[_.key].routes = _.routes;
  
        }
      }
      if(_?.children?.length>0 && old_json[_?.key]){
        old_json[_?.key].component= compareJSON(old_json[_?.key]?.component ?? {},_?.children)
      }
    })
    return old_json;
  }

  const setUpdatePermission = async(_permission,actions) =>{
    let data_json = {};
    if(actions==='edit'){
      setEditMode(true);
     
    }
    if(_permission?.repo_mapping && Object.keys(_permission?.repo_mapping)?.length >0){
       data_json =  compareJSON(JSON.parse(JSON.stringify(_permission?.repo_mapping)),repositoryTree?.project_component);
      // _permission.repo_mapping
      debugger;
    }

    let exist_list = _permission?.repo_mapping && Object.keys(_permission?.repo_mapping)?.length >0 ? data_json : repoPermission
    setPermissionDetails({
      ...permissionDetails,
      permission_name:_permission?.permissionName ?? "",
      repo_list:exist_list,
      select_permission:_permission ?? {}
    });
    

  }

  const findDuplicate = (value)=>{
    let returnValue = false;
    roleList?.map(_=>{
      if(_.id !== permissionDetails?.select_permission?.id){
        if(value === _.permissionName){
          returnValue = true;
        }
      }
    });
    return returnValue;
  }

  const handleState = (name,value)=>{
    let error = permissionDetails.error;
    let errorMsg  = permissionDetails.errorMsg;
    if(typeof value === 'object' && value?.length<=0){
      error[name]=true;
    } else if(typeof value === 'string' && value?.length<=0){
      error[name]= true;

      // errorMsg[name] = 'please enter the field';
    } else {
      if(name === 'role_name' && findDuplicate(value)){
        // errorMsg[name] = 'This field must be unique';
        error[name]= true;

      }
      error[name]= false;
    }
    setPermissionDetails({
      ...permissionDetails,
      [name]:value,
      error,
      errorMsg
    });
  }
  const submit  = async()=>{
    props.backdrop.setBackDrop({
      ...props.backdrop,
      open: true,
      message: "processing....",
    });
    let error = permissionDetails.error;
    let  keys = Object.keys(error); 
    const { alert } = props;
    let { setSnack } = alert;
    keys.map((_)=>{
      if(typeof permissionDetails[_] === 'object' && permissionDetails[_]?.length<=0){
        error[_]=true;
      } else if(typeof permissionDetails[_] === 'string' && permissionDetails[_]?.length<=0){
        error[_]= true;
      } else {
        if(_ === 'role_name' && findDuplicate(value)){
          errorMsg[_] = 'This field must be unique';
          error[_]= true;
  
        }
        error[_]= false;
      }
    });
    let errorValue = Object.values(error);
    if(errorValue?.some(_=>_===true)){
      setPermissionDetails({
        ...permissionDetails,
        error
      });
      props.backdrop.setBackDrop({
        ...props.backdrop,
        open: false,
        message: "",
      });
      return;
    }

   
    let permissionProperties ={
      "_id": "",
      "id": uuidV4(),
      "permissionName": permissionDetails?.permission_name,
      "is_active": true,
      "repo_mapping": permissionDetails?.repo_list,
      dbname:sessionStorage.dbname,
      metadataId:sessionStorage.entity_metadata_id
    }
    if(permissionDetails?.select_permission && Object.keys(permissionDetails?.select_permission)?.length>0){
  
      permissionProperties ={
         dbname:sessionStorage.dbname,
      metadataId:sessionStorage.entity_metadata_id,
        
        "_key":permissionDetails?.select_permission?._key,
        "permissionName": permissionDetails?.permission_name,
        // "is_active": true,
        "repo_mapping": permissionDetails?.repo_list
      }
    }
    try{
      let codeUpsert =   await dispatch(actions.PERMISSION_UPSERT(permissionProperties));
      debugger;
      if(codeUpsert?.payload?.error || codeUpsert?.payload?.data?.Code  !==201 ){
        setSnack({
          ...alert,
          horizontal: "right",
          msg: permissionDetails?.select_permission ? "Permission update unsuccessfully !" : "Permission create unsuccessfully",
          open: true,
          severity: "error",
          vertical: "top",
        });
        props.backdrop.setBackDrop({
          ...props.backdrop,
          open: false,
          message: "",
        });
        return;
      }
      props.backdrop.setBackDrop({
        ...props.backdrop,
        open: false,
        message: "",
      });
      setSnack({
        ...alert,
        horizontal: "right",
        msg: permissionDetails?.select_permission ? "Permission  update successfully !" : "Permission  create successfully",
        open: true,
        severity: "success",
        vertical: "top",
      });
      setEditMode(false);
      let dbname = {
      dbname:sessionStorage.dbname

      }
      let permission_list  =  await dispatch(actions.PERMISSION_READ(dbname));

    } catch(error){
      setSnack({
        ...alert,
        horizontal: "right",
        msg: "Something went wrong !",
        open: true,
        severity: "error",
        vertical: "top",
      });
    }
  }
 const handlePermission =  (_permission) =>{
  setPermissionDetails({
    ...permissionDetails,
    repo_list:_permission
  })
 };
  return (
    <div className={classes.contentBox}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <div
            // className={classes.firstSec}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #DCDCDC",
              // padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div>
              {/* ------------------------------Title---------------------- */}
              <div style={{ display: "flex", margin: "16px 20px 8px" }}>
                <Typography
                  style={{
                    marginTop: "4px",
                    fontFamily: "poppinsemibold",
                    // padding: "10px 20px 6px"
                  }}
                >
                  {loader
                    ? "Permission"
                    : permissionList.length + " Permissions"}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>

                <Button className={classes.btn} onClick={drawerOpen} contained>
                  + Add
                </Button>
              </div>

              {/* -----------------------------Search---------------------------- */}
              <div>
                <TextField
                  id="outlined-search"
                  placeholder="Search field"
                  onChange={searchChange}
                  size="small"
                  style={{
                    // width: "231px",
                    // height: "32px",
                    padding: "8px 20px",
                  }}
                  type="search"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "poppin",
                      fontSize: "12px",
                      background: "#f6f6f6",
                      // "&:focus": {
                      //   background: "unset"
                      // }
                      // marginRight: "10px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={searchicon} alt="Icon" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: { fontSize: 12 },
                  }}
                />
              </div>

              <Divider />

              <div
                className={classes.descriptionTab}
                style={{ marginLeft: 20, marginRight: 20 }}
              >
                <Typography
                  className={classes.innerText}
                  style={{ color: "#0000008a" }}
                >
                  Permission Name
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Typography
                  className={classes.innerText}
                  style={{ color: "#0000008a" }}
                >
                  Action
                </Typography>
              </div>

              <div
                className={classes.mainArea}
                style={{
                  height: `calc(100vh - 320px)`,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                {loader ? (
                  <div style={{ textAlign: "center", paddingTop: "90px" }}>
                    <CircularProgress />
                  </div>
                ) : null}
                {permissionList?.map((item, index) => (
                  <div style={{ padding: "8px 0px" }}>
                    <div
                      className={
                        permissionDetails?.select_permission?._id ===
                        item?._id
                          ? classes.selectedCell
                          : classes.rolesDisplay
                      }
                      onClick={(e) => setUpdatePermission( item)}
                      selected={
                        permissionDetails?.select_permission?._id ===
                        item?._id
                      }
                    >
                      <Typography className={classes.innerText}>
                        {item?.permissionName}
                      </Typography>
                      <div style={{ flexGrow: 1 }}></div>
                      <IOSSwitch
                        // checked={
                        //   state.statusActive?.indexOf(
                        //     item?.PermissionManagement?.permissionName
                        //   ) > -1
                        //     ? true
                        //     : false
                        // }
                        // onChange={(e) => handleStatusCheck(e, index, item)}
                        checked={
                          item?.is_active === true
                            ? true
                            : false
                        }
                        onChange={(e) => handlePermissionStatus(e, item)}
                      />
                      <img
                        src={EditIcon}
                        onClick={(e) => setUpdatePermission(item,'edit')}
                        width="12px"
                        style={{ margin: "0px 16px" }}
                      />
                      <img
                        src={DeleteIcon}
                        width="12px"
                        onClick={() => handleClickOpen(item)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Grid>
        {
          (permissionList?.length>0 || editMode) && <Grid item xs={8} style={{ overflow: "hidden" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              // padding: "10px 20px",
              border: "1px solid #DCDCDC",
            }}
          >
            {!editMode && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Typography
                  className={classes.numbersEdit}
                  style={{ marginTop: 0, marginRight: 0 }}
                >
                 {permissionDetails?.permission_name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={toggleEditMode}
                  style={{ height: 24, width: 24 }}
                >
                  <CreateOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            )}
            {editMode && (
              <>
              <Grid  container style={{    display: "flex",justifyContent: "space-between"}}>
              <div style={{padding: "10px 20px 6px 20px"}}>
              <TextField
                id="permission-name"
                // onChange={searchChange}
                onChange={(e)=>handleState('permission_name',e.target.value)}
                value={permissionDetails.permission_name}
                placeholder="Permission Name *"
                size="small"
                style={{
                  fontFamily: "poppinsemibold",
                }}
                error={permissionDetails.error.permission_name ? true :false}
                helperText={permissionDetails.error.permission_name ? permissionDetails.errorMsg.permission_name :''}

                // fullWidth
                InputProps={{
                  style: {
                    fontFamily: "poppinsemibold !important",
                    fontSize: "1rem",
                    // background: "#f6f6f6",
                    // "&:focus": {
                    //   background: "unset"
                    // }
                    // marginRight: "10px",
                  },
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <img src={searchicon} alt="Icon" />
                  //   </InputAdornment>
                  // ),
                }}
                // InputLabelProps={{
                //   style: { fontSize: 12 },
                // }}
              />
              </div>
               <div style={{margin: "8px 14px 8px 0px", display: "flex", justifyContent: "flex-end", gap: 12}}>
              <Button variant="outlined" onClick={toggleEditMode} style={{height: 32, borderRadius: 8}} >Cancel</Button>
              <Button variant="contained" color={"primary"} style={{height: 32, borderRadius: 8}} onClick={()=>submit()}>Update</Button>
              </div>
              </Grid>
              

              </>
              
              
            )}
            <Divider />
            <div style={{ margin: 14 }}>
              <Grid
                container
                style={{
                  borderRadius: "10px",
                  border: "1px solid #DCDCDC",
                }}
              >
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  // style={{ borderRight: "1px solid #DCDCDC" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingRight: 20,
                    }}
                  >
                    <div item xs={8}>
                      <Typography
                        style={{
                          fontFamily: "poppinsemibold",
                          padding: "6px 20px 6px",
                        }}
                        color="textSecondary"
                        variant="body2"
                      >
                        Repository
                      </Typography>
                    </div>
                    <div item xs={4}>
                      <div style={{ display: "flex", width: "100%" }}>
                        {["Create", "Read", "Update", "Delete"].map(
                          (action) => (
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: 60,
                                maxWidth: 62,
                                textAlign: "center",
                              }}
                            >
                              <div style={{ width: "100%" }}>
                                <Typography
                                  style={{
                                    fontFamily: "poppinsemibold",
                                    padding: "6px 8px 6px",
                                  }}
                                  color="textSecondary"
                                  variant="body2"
                                >
                                  {action}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <div style={{ padding: "10px 20px 6px 38px", width: "100%" }}>
                    <Tree
                      data={repositoryTree?.project_component}
                      permission_list={permissionDetails?.repo_list}
                      // expanded={expanded}
                      handlePermission={handlePermission}
                      isCrudNeeded
                      editMode={editMode}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
         
          </div>

         
        </Grid>
        }
        
      </Grid>
      {/* -------------------------------- delete ----------------------------------  */}
      <DeleteComponent open={open} deleteClose={handleClose} />
    </div>
  );
}
export default withAllContexts(PermissionList);
