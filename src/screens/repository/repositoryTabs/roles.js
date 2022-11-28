/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Switch,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

import {  treeData } from "../../../utils";
import { withAllContexts } from "../../../HOCs";
import styles from "./styles";
// import {
//   deleteRoleToKeyClock,
//   readDocument,
//   getRoleId,
//   deleteDocument,
//   upsertDocument,
//   addRole,
// } from "../../../function/commonapi";
// import Config from "../../../../src/config";
import DeleteComponent from "./deleteComp";
// import EditIcon from "../../../assets/icons - Edit.svg";
import DeleteIcon from "../../../assets/icons8-trash.svg";
import { withStyles } from "@material-ui/core/styles";
import searchicon from "../../../assets/icons - Search.svg";
// import TreeViewComponent from "./orgAccess";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Tree from "../../../components/tree";
// import { Text } from "qdm-component-library";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "idm_binder";
import { v4 as uuidV4 } from 'uuid'
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    // margin: theme.spacing(1),
  },
  saveBtn: {
    position: "absolute",

    bottom: "10px",
    right: "33px",
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

function Roles(props) {
  const classes = styles();
  const theme = useTheme();

  const [userRoles, setUserRoles] = useState([]);
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const cloneroleList = useSelector((state) => state?.rolesSlice?.role_read?.data);
  const reduxList =  useSelector((state) => state?.rolesSlice);
  const permissionList = useSelector((state) => state?.permissionSlice?.permission_read?.data);
  const [roleList,setRoleList] = useState(cloneroleList);
  useEffect(()=>{
    setRoleList(cloneroleList)
  },[cloneroleList])
  const [active, setActive] = useState();

  const [loader, setLoader] = useState(true);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // const [newState, setNewState] = useState({
  //   isEdit: false,
  //   selectRoles: "",
  //   Permission: [],
  //   OrgAccess: [],
  // });
  const [editMode, setEditMode] = useState(false);

  // Handle Detail Roles Edit
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleClickOpen = (item) => {
    //alert(JSON.stringify(item?.MasterRoles.rolename));
    setDeleteId(item?._key);
    // setDeleteRoleName(item?.coding[0]?.display);
    setOpen(true);
  };

  const handleClose = async (status) => {
    if(!status){
      setOpen(false);
      return;
    }
    const { alert } = props;
    let { setSnack } = alert;
  
      let codable_params = {
        dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
        _key:deleteId,
        status:false
      }
      try{
        let delete_data = await dispatch(actions.CODABALE_CONCEPT_UPSERT(codable_params));
        setOpen(false);
        if(delete_data?.payload?.error){
              setSnack({
                ...alert,
                horizontal: "right",
                msg: "Document deleted unsuccessfully",
                open: true,
                severity: "error",
                vertical: "top",
              });
              return;
        }
        setInitialize();
        setSnack({
          ...alert,
          horizontal: "right",
          msg: "Document deleted successfully",
          open: true,
          severity: "success",
          vertical: "top",
        });
      } catch(error){
        setOpen(false);
        setSnack({
          ...alert,
          horizontal: "right",
          msg: "Document deleted unsuccessfully",
          open: true,
          severity: "error",
          vertical: "top",
        });
      }
 
    
  
  };

  useEffect(() => {
    setInitialize();
  }, []);

  React.useLayoutEffect(() => {
    // dispatch(actions.ROLE_READ());
    let params =  {
      dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
    }
    dispatch(actions.PERMISSION_MANAGEMENT_READ(params))
  }, []);
 
  //SEARCH FOR PROCESS
  const searchChange = (event) => {
    console.log(userRoles);
    let val = event.target.value?.toLowerCase();
    const filterDate = cloneroleList.filter((item) => {
      return item.coding[0]?.display?.toLowerCase().includes(val);
    });
    setRoleList(filterDate);
  };



  const handleAlerts = (message, status) => {
    const { alert } = props;
    let { setSnack } = alert;
    setSnack({
      ...alert,
      horizontal: "right",
      msg: message,
      open: true,
      severity: status ? "success" : "error",
      vertical: "top",
    });
  };



  //API CALL FOR CHANGE ROLES STATUS
  const handleRoleStatus = async (event, item) => {
    // console.log(JSON.stringify(item));
  
    let list = {
      activestatus: !item?.activestatus,
      _key:item._key,
      dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
    };

    // let sendRoleData = {
    //   entity: Config.codabaleConceptMaster,
    //   metadataId: Config.metadataid,
    //   isedit: true,
    //   id: item?.id,
    //   list,
    //   keyvalue: "id",
    // };

    // let addEditpageUpsert = await upsertDocument(sendRoleData);
    //alert(JSON.stringify(addEditpageUpsert))
    try{
      let delete_data = await dispatch(actions.CODABALE_CONCEPT_UPSERT(list));
      // setOpen(false);
      if(delete_data?.payload?.error || delete_data?.payload?.data?.Code !==201){
            handleAlerts("Role status changed unsuccessfully!", false);
            return;
      }
      setInitialize();
      handleAlerts("Role status changed successfully!", true);

    } catch(error){
      // setOpen(false);
      handleAlerts("Role status changed unsuccessfully!", false);

    }
  };


  const [roleDetails,setRoleDetails] =  useState({
    permission:[],
    role_name:"",
    role_id:"",
    orgAccess:[],
    select_role:{},
    _key:'',
    error:{
      permission:false,
      role_name:false,
      role_id:false,
    },
    errorMsg:{
      permission:"please enter the field",
      role_name:"please enter the field",
      role_id:"please enter the field",
    }

  });
  const findDuplicate = (value)=>{
    let returnValue = false;
    roleList?.map(_=>{
      if(_.id !== roleDetails?.select_role?.id){
        if(value === _.coding[0]?.display){
          returnValue = true;
        }
      }
    });
    return returnValue;
  }
  const handleOrgCheck = (orgData) => {
    setRoleDetails({
      ...roleDetails,
      orgAccess:orgData
    })
  };
  const setInitialize = async() =>{
    try{
      const { alert } = props;
      let { setSnack } = alert;
      let params_db =  {
        dbname:sessionStorage.dbname,
          metadataId:sessionStorage.entity_metadata_id,
      }
     let role_list  =  await dispatch(actions.ROLE_READ(params_db));
     debugger;
     if(role_list?.payload?.error ){
      setLoader(false)
      setSnack({
        ...alert,
        horizontal: "right",
        msg: "Something went wrong !",
        open: true,
        severity: "error",
        vertical: "top",
      });
      return;
     }
     setLoader(false)
     if(role_list?.payload?.data?.length>0){
      setUpdatePermissionRole(role_list?.payload?.data[0]);

     }
    }catch(error){

    }
    
  }
  const setUpdatePermissionRole = async(_role) =>{
    const { alert } = props;
    let { setSnack } = alert;
    try{
      let params_db =  {
        dbname:sessionStorage.dbname,
          metadataId:sessionStorage.entity_metadata_id,
          role_id:_role.id
      }
      let roleManagementData =   await dispatch(actions.PERMISSION_MANAGEMENT_ROLE_READ(params_db));
      if(roleManagementData?.payload?.error ){
        setSnack({
          ...alert,
          horizontal: "right",
          msg: "Permission Role faild !",
          open: true,
          severity: "error",
          vertical: "top",
        });
        return;
      }
      setRoleDetails({
        ...roleDetails,
        select_role: _role,
        permission:roleManagementData?.payload?.data[0]?.permission?.permission ?? [],
        orgAccess: roleManagementData?.payload?.data[0]?.permission?.orgAccess ?? [],
        role_name:_role?.coding[0]?.display ?? "",
        role_id:_role?.coding[0]?.code ?? "",
        _key:roleManagementData?.payload?.data[0]?._key
      });
    } catch(error){
      setSnack({
        ...alert,
        horizontal: "right",
        msg: "Something went wrong !",
        open: true,
        severity: "error",
        vertical: "top",
      });
      setRoleDetails({
        ...roleDetails,
        select_role: _role,
        permission:[],
        role_name:"",
        role_id:"",
        orgAccess:[],
      });
    }
    

  }
  const handleState = (name,value)=>{
    let error = roleDetails.error;
    let errorMsg  = roleDetails.errorMsg;
    if(typeof value === 'object' && value?.length<=0){
      error[name]=true;
    } else if(typeof value === 'string' && value?.length<=0){
      error[name]= true;

      errorMsg[name] = 'please enter the field';
    } else {
      if(name === 'role_name' && findDuplicate(value)){
        errorMsg[name] = 'This field must be unique';
        error[name]= true;

      }
      error[name]= false;
    }
    setRoleDetails({
      ...roleDetails,
      [name]:value,
      error,
      errorMsg
    });
  }
  const submit  = async()=>{ 
    props.backdrop.setBackDrop({
      ...props.backdrop,
      open: true,
      message: "Processing...",
    });
    let error = roleDetails.error;
    let  keys = Object.keys(error);
    const { alert } = props;
    let { setSnack } = alert;
    keys.map((_)=>{
      if(typeof roleDetails[_] === 'object' && roleDetails[_]?.length<=0){
        error[_]=true;
      } else if(typeof roleDetails[_] === 'string' && roleDetails[_]?.length<=0){
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
      setRoleDetails({
        ...roleDetails,
        error
      });
      props.backdrop.setBackDrop({
        ...props.backdrop,
        open: false,
        message: "",
      });
      return;
    }
    let codeProperties  = {
      "_id": "",
      "text": "",
      "coding": [
        {
          "_id": "",
          "system": "",
          "version": "",
          "code": roleDetails.role_id,
          "display":roleDetails.role_name ,
          "userSelected": true,
          "id": uuidV4(),
          "Type": "PRACTROLE",
          "shortdesc": ""
        }
      ],
      "id": uuidV4(),
      "Type": "PRACTROLE",
      "status": true,
      dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
    }
    let permissionProperties ={
      "_id": "",
      "id": uuidV4(),
      "role_id": 0,
      "permission": {
        orgAccess:roleDetails?.orgAccess ?? [],
        permission:roleDetails?.permission ?? []
      },
      dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
    }
    if(roleDetails?.select_role && Object.keys(roleDetails?.select_role)?.length>0){
      codeProperties = {
        "_key":roleDetails.select_role._key,
        "coding":[
                  {
                    ...roleDetails?.select_role?.coding[0],
                    "code": roleDetails?.role_id,
                    "display":roleDetails?.role_name ,
                  }
              ],
              dbname:sessionStorage.dbname,
              metadataId:sessionStorage.entity_metadata_id,
        
      };
        //  codeProperties = {
        //             ...roleDetails?.select_role?.coding[0],
        //             "code": roleDetails?.role_id,
        //             "display":roleDetails?.role_name,
        //             dbname:sessionStorage.dbname,
        //             metadataId:sessionStorage.entity_metadata_id,  
        //   };
      permissionProperties ={
        _key:roleDetails?._key,
        "role_id": roleDetails?.select_role?.id,
        "permission": {
          orgAccess:roleDetails?.orgAccess ?? [],
          permission:roleDetails?.permission ?? []
        },
        dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
      }
    }
    if(roleDetails?.select_role && Object.keys(roleDetails?.select_role)?.length>0){
      try{
        let codeUpsert =   await dispatch(actions.CODABALE_CONCEPT_UPSERT(codeProperties));
        if(codeUpsert?.payload?.error || codeUpsert?.payload?.data?.Code !== 201){
          props.backdrop.setBackDrop({
            ...props.backdrop,
            open: false,
            message: "",
          });
          setSnack({
            ...alert,
            horizontal: "right",
            msg: roleDetails?.select_role ? "Role update unsuccessfully !" : "Role create unsuccessfully",
            open: true,
            severity: "error",
            vertical: "top",
          });
          return;
        }
        
          permissionProperties.role_id = roleDetails?.select_role?.id;
    
        let permissionRoleUpsert =   await dispatch(actions.PERMISSION_ROLE_UPSERT(permissionProperties));
        if(permissionRoleUpsert?.payload?.error || codeUpsert?.payload?.data?.Code !== 201){
          props.backdrop.setBackDrop({
            ...props.backdrop,
            open: false,
            message: "",
          });
          setSnack({
            ...alert,
            horizontal: "right",
            msg: roleDetails?.select_role ? "Permission Role update unsuccessfully !" : "Permission Role create unsuccessfully",
            open: true,
            severity: "error",
            vertical: "top",
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
          msg: roleDetails?.select_role ? "Permission Role update successfully !" : "Permission Role create successfully",
          open: true,
          severity: "success",
          vertical: "top",
        });
        setEditMode(false);
      } catch(error){
        props.backdrop.setBackDrop({
          ...props.backdrop,
          open: false,
          message: "",
        });
        setSnack({
          ...alert,
          horizontal: "right",
          msg: "Something went wrong !",
          open: true,
          severity: "error",
          vertical: "top",
        });
      }
    } else {
      try{
        let codeUpsert =   await dispatch(actions.CODABALE_CONCEPT_UPSERT(codeProperties));
        debugger;
        if(codeUpsert?.payload?.error || codeUpsert?.payload?.data?.Code !== 201){
          props.backdrop.setBackDrop({
            ...props.backdrop,
            open: false,
            message: "",
          });
          setSnack({
            ...alert,
            horizontal: "right",
            msg: roleDetails?.select_role ? "Role update unsuccessfully !" : "Role create unsuccessfully",
            open: true,
            severity: "error",
            vertical: "top",
          });
          return;
        }
        if( codeUpsert?.payload?.data?.Result[0]?.properties?.doc?.id){
          permissionProperties.role_id = codeUpsert?.payload?.data?.Result[0]?.properties?.doc?.id;
        }
        let permissionRoleUpsert =   await dispatch(actions.PERMISSION_ROLE_UPSERT(permissionProperties));
        if(permissionRoleUpsert?.payload?.error || codeUpsert?.payload?.data?.Code !== 201){
          props.backdrop.setBackDrop({
            ...props.backdrop,
            open: false,
            message: "",
          });
          setSnack({
            ...alert,
            horizontal: "right",
            msg: roleDetails?.select_role ? "Permission Role update unsuccessfully !" : "Permission Role create unsuccessfully",
            open: true,
            severity: "error",
            vertical: "top",
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
          msg: roleDetails?.select_role ? "Permission Role update successfully !" : "Permission Role create successfully",
          open: true,
          severity: "success",
          vertical: "top",
        });
        setEditMode(false);
  
      } catch(error){
        props.backdrop.setBackDrop({
          ...props.backdrop,
          open: false,
          message: "",
        });
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
    let params_db ={
      dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
    }
    await dispatch(actions.ROLE_READ(params_db));
    
  }
  const addRole = () =>{
    setEditMode(true);
    setRoleDetails({
        ...roleDetails,
        permission:[],
        role_name:"", 
        role_id:"",
        orgAccess:[],
        select_role:{},
        error:{
          permission:false,
          role_name:false,
          role_id:false,
        },
        errorMsg:{
          permission:"please enter the field",
          role_name:"please enter the field",
          role_id:"please enter the field",
        }
    });
  }

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
                  // className={classes.numbersEdit}
                  style={{
                    marginTop: "4px",
                    fontFamily: "poppinsemibold",
                    // padding: "10px 20px 6px"
                  }}
                >
                  {loader ? "Roles" : roleList?.length + " Roles"}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>

                <Button
                  onClick={()=>addRole()}
                  className={classes.btn}
                  contained
                >
                  + Add
                </Button>
              </div>

              {/* -----------------------------Search---------------------------- */}
              <div>
                <TextField
                  id="outlined-search"
                  placeholder="Search field"
                  size="small"
                  onChange={searchChange}
                  style={{
                    // width: "231px",
                    //  height: "32px" ,
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
                  Role Name
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
                { roleList?.length>0 && roleList?.map(
                  (item, index) =>
                    item?.coding[0]?.display && (
                      <div style={{ padding: "8px 0px" }}>
                        <div
                          className={
                            roleDetails?.select_role?.id === item?.id
                              ? classes.selectedCell
                              : classes.rolesDisplay
                          }
                          onClick={(e) => setUpdatePermissionRole(item)}
                          selected={roleDetails?.select_role?.id === item?.id}
                        >
                          <Typography className={classes.innerText}>
                            {item?.coding[0]?.display}
                          </Typography>
                          <div style={{ flexGrow: 1 }}></div>
                          <Tooltip
                            title={
                              item?.activestatus === true
                                ? "Active"
                                : "Inactive"
                            }
                            arrow
                          >
                            <IOSSwitch
                              // checked={
                              //   state.statusActive?.indexOf(
                              //     item?.PractitionerRole?.code[0]?.coding[0]?.display
                              //   ) > -1
                              //     ? true
                              //     : false
                              // }
                              // onChange={(e) => handleStatusCheck(e, index, item)}
                              checked={
                                item?.activestatus === true ? true : false
                              }
                              onChange={(e) => handleRoleStatus(e, item)}
                            />
                          </Tooltip>
                          {/* <Tooltip title="Edit" arrow>
                            <img
                              src={EditIcon}
                              onClick={(e) => editRoles(e, item)}
                              width="12px"
                              style={{ margin: "0px 16px" }}
                            />
                          </Tooltip> */}
                          <Tooltip title="Delete" arrow>
                            <img
                              src={DeleteIcon}
                              width="12px"
                              onClick={() => handleClickOpen(item)}
                              style={{ margin: "0px 16px" }}

                            />
                          </Tooltip>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </Grid>
        {
          (roleList?.length>0 || editMode)  && <Grid item xs={8}>
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
                  {`${roleDetails.role_id} ${roleDetails.role_name}`}
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
              <div
                style={{
                  padding: "10px 20px 6px 20px",
                  display: "flex",
                  gap: 8,
                }}
              >
                <TextField
                  id="role_id"
                  onChange={(e)=>handleState('role_id',e.target.value)}
                  value={roleDetails.role_id}
                  placeholder="Role id *"
                  size="small"
                  style={{
                    fontFamily: "poppinsemibold",
                  }}
                  error={roleDetails.error.role_id ? true :false}
                  helperText={roleDetails.error.role_id ? roleDetails.errorMsg.role_id :''}

                  InputProps={{
                    style: {
                      fontFamily: "poppinsemibold !important",
                      fontSize: "1rem",
                    },
                  }}
                />
                <TextField
                  id="role_name"
                  onChange={(e)=>handleState('role_name',e.target.value)}
                  value={roleDetails.role_name}
                  error={roleDetails.error.role_name ? true :false}
                  helperText={roleDetails.error.role_name ? roleDetails.errorMsg.role_name :''}
                  placeholder="Role name *"
                  size="small"
                  style={{
                    fontFamily: "poppinsemibold",
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "poppinsemibold !important",
                      fontSize: "1rem",
                    },
                  }}
                />
              </div>
            )}
            <Divider />

            <div
              style={{
                margin: 14,
                borderRadius: "10px",
                border: "1px solid #DCDCDC",
              }}
            >
              <Grid container>
                {/* Title */}
                <Grid item xs={12}>
                  <div>
                    <Typography
                      style={{
                        fontFamily: "poppinsemibold",
                        padding: "16px 20px 6px",
                        fontSize: "0.8rem",
                      }}
                      color="textSecondary"
                      variant="body2"
                    >
                      Permission List
                    </Typography>
                  </div>
                </Grid>

                {/* Permission list Fields / Chips */}
                <Grid item xs={12}>
                  {editMode ? (
                    <div style={{ padding: "6px 20px 6px" }}>
                      <Typography
                        id={`permission-list-typography`}
                        style={{
                          color: "#6F6F6F",
                          fontSize: "12px",
                          marginBottom: "6px",
                          fontFamily: "pc_regular",
                        }}
                      >
                        Select Permission List
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Autocomplete
                        multiple
                        fullWidth
                        size="small"
                        getOptionLabel={(option) => option?.permissionName ?? {}}
                        value={
                          roleDetails?.permission  ?? []
                        }
                        options={permissionList ?? []}
                        onChange={(e, v) => handleState('permission',v) }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={false}
                            variant="outlined"
                            placeholder="Type Here"
                            size="small"
                            error={roleDetails.error.permission ? true :false}
                            helperText={roleDetails.error.permission ? roleDetails.errorMsg.permission :''}
                          />
                        )}
                        classes={{
                          tag: classes.autocompleteTag
                        }}
                        // renderTags={(values) =>
                        //   values.map((value) => (
                        //     <Chip
                        //       label={value?.label ?? value}
                        //       classes={{ root: classes.rolesChipRoot }}
                        //       on
                        //       style={{marginRight: 8}}
                        //     />
                        //   ))
                        // }
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        padding: "6px 20px 6px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      {roleDetails?.permission?.map((permission) => (
                        <Chip
                          label={permission?.permissionName}
                          classes={{ root: classes.rolesChipRoot }}
                        />
                      ))}
                    </div>
                  )}
                </Grid>

                {/* Org Access */}
                {/* <Grid item xs={12}>
                  
                </Grid> */}

                {/* Org Access Tree View */}
                <Grid item xs={12}>
                  <div style={{ padding: "10px 20px 6px 20px", width: "100%" }}>
                    <div>
                      <Typography
                        style={{
                          fontFamily: "poppinsemibold",
                          padding: "6px 20px 6px 0px",
                          fontSize: "0.8rem",
                        }}
                        color="textSecondary"
                        variant="body2"
                      >
                        Org Access
                      </Typography>
                    </div>
                    <div style={{ paddingLeft: 20 }}>
                      <Tree
                        data={treeData}
                        handleOrgCheck={handleOrgCheck}
                        orgAccess={roleDetails.orgAccess}
                        // expanded={expanded}
                        // handleToggle={handleToggle}
                        editMode={editMode}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* Crud action buttons */}
            {editMode && (
              <div
                style={{
                  margin: "8px 14px 8px 0px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={toggleEditMode}
                  style={{ height: 32, borderRadius: 8 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color={"primary"}
                  style={{ height: 32, borderRadius: 8 }}
                  onClick={(e)=>submit()}
                >
                  Update
                </Button>
              </div>
            )}
          </div>
        </Grid>
        }
        
      </Grid>
      {/* -------------------------------- delete ----------------------------------  */}
      <DeleteComponent
        open={open}
        deleteClose={handleClose}
        rolesDelete="Roles-Data"
      />
    </div>
  );
}

export default withAllContexts(Roles);
