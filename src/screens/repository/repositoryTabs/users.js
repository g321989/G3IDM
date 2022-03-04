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
import { withAllContexts } from "../../../HOCs";
import EditIcon from "../../../assets/icons - Edit.svg";
// import DeleteIcon from "../../../assets/icons8-trash.svg";
import { withStyles } from "@material-ui/core/styles";
import searchicon from "../../../assets/icons - Search.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { useDispatch, useSelector } from "react-redux";
import { actions } from "idm_binder";
import { v4 as uuidV4 } from 'uuid'
import { addUserToKeyClock } from "../../../function/commonapi";
import { AlertProps } from '../../../utils/constants';

// action switch component
const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
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
// end

// tab panel component
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

// end

// TabPanel props
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
// end

// const togArray = [];

// user component
function Users(props) {
    // use styles
    const classes = styles();
    // end

    // use states
    const [value, setValue] = React.useState(0);
    // const [state, setState] = useState({
    //     statusActive: [],
    //     active: null,
    //     secondSection: "Pages",
    //     permissionPage: {},
    // });
    const [editMode, setEditMode] = useState(false);

    // const [json, setJson] = useState({
    //     permissionID: "",
    //     permissionNam: "",
    //     tabName: "Pages",
    //     Pages: [],
    //     Forms: [],
    //     Reports: [],
    //     Processes: [],
    // });

    // const [permissionData, setPermissionData] = useState([]);
    // const [permissionData1, setPermissionData1] = useState([]);
    const [loader, setLoader] = useState(true);
    // const [pageData, setPageData] = useState([]);
    // const [formRepData, setFromRepData] = useState([]);
    // const [reportsData, setReportsData] = useState([]);
    // const [processData, setprocessData] = useState([]);
    // const [open, setOpen] = useState(false);
    // const [deleteId, setDeleteId] = useState("");
    // const [btnJson, setBtnJson] = useState({
    //     create: false,
    //     read: false,
    //     update: false,
    //     delete: false,
    // });
    // const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    // end

    // const handleClickOpen = (item) => {
    //     setDeleteId(item?._id);
    //     setOpen(true);
    // };

  

    //API CALL FOR CHANGE PERMISSION STATUS
    const handlePermissionStatus = async (event, item) => {
        let list = {
            active: !item?.active,
            _key: item._key,
            dbname:sessionStorage.dbname,
              metadataId:sessionStorage.entity_metadata_id,
        };
        let params_db ={
            dbname:sessionStorage.dbname,
              metadataId:sessionStorage.entity_metadata_id,
          }
        debugger;
        try {
            let delete_data = await dispatch(actions.PERSON_UPSERT(list));
            if (delete_data?.payload?.error || delete_data?.payload?.data?.Code !== 201) {
                props.alert.setSnack({
                    ...alert,
                    horizontal: "right",
                    msg: "User status changed unsuccessfully!" ,
                    open: true,
                    severity: "error",
                    vertical: "top",
                });
                return;
            }
            let permission_list = await dispatch(actions.PERSON_READ(params_db));
            props.alert.setSnack({
                ...alert,
                horizontal: "right",
                msg: "User status changed successfully!" ,
                open: true,
                severity: "success",
                vertical: "top",
            });
           

        } catch (error) {
            props.alert.setSnack({
                ...alert,
                horizontal: "right",
                msg: "User status changed unsuccessfully!" ,
                open: true,
                severity: "error",
                vertical: "top",
            });

        }
    };


    //SEARCH FOR PROCESS
    const searchChange = (event) => {
        let val = event.target.value.toLowerCase();
        const filterDate = clonepermissionList.filter((item) => {
            return item?.email
                .toLowerCase()
                .includes(val);
        });
        setPermissionList(filterDate)
    };


    // const handleAlerts = (message, status) => {
    //     const { alert } = props;
    //     let { setSnack } = alert;
    //     setSnack({
    //         ...alert,
    //         horizontal: "right",
    //         msg: message,
    //         autoHideDuration: 6000,
    //         open: true,
    //         severity: status ? "success" : "error",
    //         vertical: "top",
    //     });
    // };


    const drawerOpen = () => {
        setEditMode(true);
        // console.log(permissionDetails);
        debugger;

        setPermissionDetails({
         ...permissionDetails,
         email:"",
         username:"",
         designation:"",
         role:{},
         selectUser:{},
         error: {
             email: false,
             username: false,
             role:false
         },
         errorMsg: {
             email: "Please Enter The Field",
             username: "Please Enter The Field",
             role: "Please Select The Role"
         }
        });
    };


    // const [datalist, setdatalist] = useState({
    //     data: [],
    //     master: [],
    // });


    // Handle Detail Permission Edit
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };


    // new logic created by manikandan

    useEffect(() => {
        setInitialize();
    }, []);

    const dispatch = useDispatch();

    const clonepermissionList = useSelector((state) => state?.personSlice?.person_read?.data);
    // const repository_list = useSelector((state) => state?.repositorySlice?.repository_read?.data);
    // const repositoryTree = repository_list?.length > 0 ? repository_list[0] : {};
    // const [repoPermission, setRepoPermission] = useState({});
    const [permissionList, setPermissionList] = useState(clonepermissionList);
    useEffect(() => {
        setPermissionList(clonepermissionList)
    }, [clonepermissionList])

    const [permissionDetails, setPermissionDetails] = useState({
        email:"",
        username:"",
        designation:"",
        role:{},
        selectUser:{},
        roleMaster:[],
        error: {
            email: false,
            username: false,
            role:false
        },
        errorMsg: {
            email: "Please Enter The Field",
            username: "Please Enter The Field",
            role: "Please Select The Role"
        }

    });

    const setInitialize = async () => {
        try {
            debugger;
            let params_db ={
                dbname:sessionStorage.dbname,
                  metadataId:sessionStorage.entity_metadata_id,
              }
            let repo_list = await dispatch(actions.ROLE_READ(params_db));
            if (repo_list?.payload?.error) {
                setLoader(false)
                return;
            }
            let roleMaster = [];
            if(repo_list?.payload?.data && repo_list?.payload?.data?.length>0){
                roleMaster = repo_list?.payload.data.map(_=>{
                    return{
                        ..._,
                        label:_.coding[0].display,
                        value:_.id
                    }
                })
            }
            // setPermissionDetails({
            //     ...permissionDetails,
            //     roleMaster:roleMaster
            // });
            // forceUpdate();
            let permission_list = await dispatch(actions.PERSON_READ(params_db));
            if (permission_list?.payload?.error) {
                setLoader(false)
                return;
            }
            setLoader(false)
            debugger;
            if(permission_list?.payload?.data && permission_list?.payload?.data?.length>0){
                setUpdatePermission(permission_list?.payload?.data[0],'',roleMaster);

            } else {
                setPermissionDetails({
                    ...permissionDetails,
                    roleMaster
                   
                });
            }
        } catch (error) {
        }

    }
    const compareJSON = (old_json, new_data) => {
        old_json = JSON.parse(JSON.stringify(old_json));
        new_data?.map(_ => {
            if (!old_json[_?.key]) {
                debugger;
                old_json[_.key] = {};
                old_json[_.key].id = _.id;
                old_json[_.key].permission = {
                    "read": false,
                    "write": false,
                    "update": false,
                    "delete": false
                };
                if (_?.actionable) {
                    old_json[_.key].actionable = _.actionable;

                }
                if (_?.routes) {
                    old_json[_.key].routes = _.routes;

                }
            }
            if (_?.children?.length > 0 && old_json[_?.key]) {
                old_json[_?.key].component = compareJSON(old_json[_?.key]?.component ?? {}, _?.children)
            }
        })
        return old_json;
    }

    const setUpdatePermission = async (_permission, actions,roleMaster) => {
       
        if (actions === 'edit') {
            setEditMode(true);

        }
        debugger;
       let role = roleMaster?.filter(_=>_.value ===_permission.roleid)[0] ?? {}
        setPermissionDetails({
            ...permissionDetails,
            email: _permission?.email ?? "",
            username: _permission?.username ?? "",
            designation: _permission?.designation ?? "",
            selectUser:_permission,
            role,
            roleMaster
           
        });


    }

    const findDuplicate = (value) => {
        let returnValue = false;
        roleList?.map(_ => {
            if (_.id !== permissionDetails?.select_permission?.id) {
                if (value && value?.toLowerCase() === _.email?.toLowerCase()) {
                    returnValue = true;
                }
            }
        });
        return returnValue;
    }

    const handleState = (name, value) => {
        let error = permissionDetails.error;
        let errorMsg = permissionDetails.errorMsg;
        if (typeof value === 'object' &&  Array.isArray(value) && value?.length <= 0) {
            error[name] = true;
        }else if(typeof value === 'object' && !Array.isArray(value) && Object.keys(value)?.length<=0){
            error[name] = true;

        } else if (typeof value === 'string' && value?.length <= 0) {
            error[name] = true;
            if(name === 'email'){
                errorMsg[name]='Please Enter The Field';

            }
        } else {
            if (name === 'email' && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ) {
                error[name] = true;
                errorMsg[name]='Please Enter Valid Email Id'
            } else{
             error[name] = false;

            }
        }
        setPermissionDetails({
            ...permissionDetails,
            [name]: value,
            error,
            errorMsg
        });
    }
    const submit = async () => {
        props.backdrop.setBackDrop({
            ...props.backdrop,
            open: true,
            message: "processing....",
        });
        let error = permissionDetails.error;
        let keys = Object.keys(error);
        const { alert } = props;
        let { setSnack } = alert;
        debugger;
        keys.map((_) => {
        debugger;

            if (typeof permissionDetails[_] === 'object' && Array.isArray(permissionDetails[_]) && permissionDetails[_]?.length <= 0) {
                error[_] = true;
            } else if(typeof permissionDetails[_] === 'object' && !Array.isArray(permissionDetails[_]) && Object.keys(permissionDetails[_])?.length<=0){
                error[_] = true;

            }
            else if (typeof permissionDetails[_] === 'string' && permissionDetails[_]?.length <= 0) {
                error[_] = true;
                if(name === 'email'){
                    errorMsg[name]='Please Enter The Field';
    
                }
            } else {
                if (_ === 'email' && findDuplicate(permissionDetails[_])) {
                    errorMsg[_] = 'This field must be unique';
                    error[_] = true;

                }
                if(_ === 'email'&& !error[_] && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(permissionDetails[_])){
                    errorMsg[_] = 'Please enter valid Email Id';
                    error[_] = true;
                }
                else{
                    error[_] = false;
       
                   }
            }
        });

        let errorValue = Object.values(error);
        if (errorValue?.some(_ => _ === true)) {
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
    let   keyclockError = false;
    if(!permissionDetails?.selectUser?._id){
        let addUserKeyClock = await addUserToKeyClock( "", permissionDetails?.email)
        .then((res) => {
         if (res?.data?.Code === 201) {
           // alert("User created successfully!", true);
         } else {
           if(res?.data?.error){
             keyclockError = true
             props.alert.setSnack({
               open: true,
               severity: AlertProps.severity.warning,
               msg: res?.data?.errorMessage??"Something  went wrong Keyclock mail filed",
               vertical: AlertProps.vertical.top,
               horizontal: AlertProps.horizontal.right,
             });
             // return alert(res?.data?.errorMessage);
           }
         }
       })
       .catch((error) => {
         keyclockError = true
         props.alert.setSnack({
           open: true,
           severity: AlertProps.severity.warning,
           msg: "Something  went wrong Keyclock mail filed",
           vertical: AlertProps.vertical.top,
           horizontal: AlertProps.horizontal.right,
         });
         // return alert("Something  went wrong", false);
       });
    }
    
    if(keyclockError){
      props.backdrop.setBackDrop({
        ...props.backdrop,
        open: false,
        message: "",
      });
      return false
    }

        let userProperties = {
            "_id": "",
            "id": uuidV4(),
            "email": permissionDetails?.email,
            "active": true,
            "username": permissionDetails?.username,
            "designation": permissionDetails?.designation,
            "roleid": permissionDetails?.role?.value,
            dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
        }
        if (permissionDetails?.selectUser && Object.keys(permissionDetails?.selectUser)?.length > 0) {

            userProperties = {
                "_key": permissionDetails?.selectUser?._key,
                "email": permissionDetails?.email,
                "username": permissionDetails?.username,
                "designation": permissionDetails?.designation,
                "roleid": permissionDetails?.role?.value,
                dbname:sessionStorage.dbname,
        metadataId:sessionStorage.entity_metadata_id,
            }
        }
        try {
            let codeUpsert = await dispatch(actions.PERSON_UPSERT(userProperties));
            debugger;
            if (codeUpsert?.payload?.error || !codeUpsert?.payload?.data?.Code) {
                setSnack({
                    ...alert,
                    horizontal: "right",
                    msg: permissionDetails?.selectUser ? "User update unsuccessfully !" : "User create unsuccessfully",
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
                msg: permissionDetails?.selectUser ? "User  update successfully !" : "User  create successfully",
                open: true,
                severity: "success",
                vertical: "top",
            });
            setEditMode(false);
            let params_db ={
                dbname:sessionStorage.dbname,
                  metadataId:sessionStorage.entity_metadata_id,
              }
            let permission_list = await dispatch(actions.PERSON_READ(params_db));

        } catch (error) {
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

    let roleList = [];
    return (
        <div className={classes.contentBox}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #DCDCDC",
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
                                    }}
                                >
                                    {loader
                                        ? 0 +"Users"
                                        : permissionList?.length + 'Users' ?? 0 + " Users"}
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
                                    User Name
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
                                                permissionDetails?.selectUser?._id ===
                                                    item?._id
                                                    ? classes.selectedCell
                                                    : classes.rolesDisplay
                                            }
                                            onClick={(e) => setUpdatePermission(item,'',permissionDetails.roleMaster)}
                                            selected={
                                                permissionDetails?.selectUser?._id ===
                                                item?._id
                                            }
                                        >
                                            <Typography className={classes.innerText}>
                                                {item?.email}
                                            </Typography>
                                            <div style={{ flexGrow: 1 }}></div>
                                            <IOSSwitch
                                                checked={
                                                    item?.active === true
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) => handlePermissionStatus(e, item)}
                                            />
                                            <img
                                                src={EditIcon}
                                                onClick={(e) => setUpdatePermission(item, 'edit',permissionDetails.roleMaster)}
                                                width="12px"
                                                style={{ margin: "0px 16px" }}
                                            />
                                            {/* <img
                                                src={DeleteIcon}
                                                width="12px"
                                                onClick={() => handleClickOpen(item)}
                                            /> */}
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
                             border: "1px solid #DCDCDC",
                         }}
                     >
                         {!editMode && (
                             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                 <Grid item>
                                     <Typography
                                         className={classes.numbersEdit}
                                         style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         Username
                                     </Typography>
                                     <Typography
                                     className={classes.numbersEdit}
                                     style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         {permissionDetails?.username ?? '---'}
                                     </Typography>
                                 </Grid>
                                 <Grid item>
                                     <Typography
                                         className={classes.numbersEdit}
                                         style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         Email
                                     </Typography>
                                     <Typography
                                     className={classes.numbersEdit}
                                     style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         {permissionDetails?.email ?? '---'}
                                     </Typography>
                                 </Grid>
                                 <Grid item>
                                     <Typography
                                         className={classes.numbersEdit}
                                         style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         Designation
                                     </Typography>
                                     <Typography
                                     className={classes.numbersEdit}
                                     style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         {permissionDetails?.designation ?? '---'}
                                     </Typography>
                                 </Grid>
                                 <Grid item>
                                     <Typography
                                         className={classes.numbersEdit}
                                         style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         Role name
                                     </Typography>
                                     <Typography
                                     className={classes.numbersEdit}
                                     style={{ marginTop: 0, marginRight: 0 }}
                                     >
                                         {(permissionDetails?.role?.coding?.length>0 &&  permissionDetails?.role?.coding[0]?.display)  ?? '---'}
                                     </Typography>
                                 </Grid>
                                 
 
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
                             <div style={{ padding: 14 }}>
                                 <Grid container spacing={2}>
                                     <Grid item xs={4}>
                                         <TextField
                                             id="permission-name"
                                             onChange={(e) => handleState('username', e.target.value)}
                                             value={permissionDetails.username}
                                             placeholder="User Name *"
                                             size="small"
                                             fullWidth
                                             style={{
                                                 fontFamily: "poppinsemibold",
                                             }}
                                             variant='outlined'
                                             error={permissionDetails.error.username ? true : false}
                                             helperText={permissionDetails.error.username ? permissionDetails.errorMsg.username : ''}
 
                                             InputProps={{
                                                 style: {
                                                     fontFamily: "poppinsemibold !important",
                                                     fontSize: "1rem",
                                                 },
                                             }}
                                         />
                                     </Grid>
                                     <Grid item xs={4}>
 
                                         <TextField
                                             id="email-name"
                                             onChange={(e) => handleState('email', e.target.value)}
                                             value={permissionDetails?.email}
                                             placeholder="Email *"
                                             size="small"
                                             disabled={permissionDetails?.selectUser?._id ? true: false}
                                             fullWidth
                                             variant='outlined'
                                             style={{
                                                 fontFamily: "poppinsemibold",
                                             }}
                                             error={permissionDetails?.error.email ? true : false}
                                             helperText={permissionDetails?.error.email ? permissionDetails?.errorMsg.email : ''}
 
                                             InputProps={{
                                                 style: {
                                                     fontFamily: "poppinsemibold !important",
                                                     fontSize: "1rem",
                                                 },
                                             }}
                                         />
                                     </Grid>
                                     <Grid item xs={4}>
 
                                         <TextField
                                             id="designation-name"
                                             onChange={(e) => handleState('designation', e.target.value)}
                                             value={permissionDetails?.designation}
                                             fullWidth
                                             placeholder="Designation "
                                             size="small"
                                             style={{
                                                 fontFamily: "poppinsemibold",
                                             }}
                                             variant='outlined'
                                             // error={permissionDetails?.error.designation_name ? true : false}
                                             // helperText={permissionDetails?.error.designation_name ? permissionDetails?.errorMsg.permission_name : ''}
 
                                             InputProps={{
                                                 style: {
                                                     fontFamily: "poppinsemibold !important",
                                                     fontSize: "1rem",
                                                 },
                                             }}
                                         />
                                     </Grid>
                                     <Grid item xs={6}>
                                         <Autocomplete
                                             multiple={false}
                                             fullWidth
                                             size="small"
                                             getOptionLabel={(option) => option.label}
                                             value={
                                                 permissionDetails?.role ?? {}
                                             }
                                       
                                             options={permissionDetails?.roleMaster || []}
                                             onChange={(e, v) => handleState('role', v)}
                                             renderInput={(params) => (
                                                 <TextField
                                                     {...params}
                                                     label={false}
                                                     // variant="outlined"
                                                     placeholder="Select role *"
                                                     variant='outlined'
                                                     size="small"
                                                     error={permissionDetails.error.role ? true : false}
                                                     helperText={permissionDetails.error.role ? permissionDetails.errorMsg.role : ''}
                                                 />
                                             )}
                                             classes={{
                                                 tag: classes.autocompleteTag
                                             }}
                                         />
                                     </Grid>
                                 </Grid>
 
                                 <div style={{ margin: "8px 14px 8px 14px", display: "flex", justifyContent: "flex-end", gap: 12, alignItems: "center" }}>
                                     <Button variant="outlined" onClick={toggleEditMode} style={{ height: 32, borderRadius: 8 }} >Cancel</Button>
                                     <Button variant="contained" color={"primary"} style={{ height: 32, borderRadius: 8 }} onClick={() => submit()}>Update</Button>
                                 </div>
 
                             </div>
 
 
                         )}
 
                     </div>
 
                 </Grid>
                 }                           
                
            </Grid>
        </div>
    );
}
export default withAllContexts(Users);