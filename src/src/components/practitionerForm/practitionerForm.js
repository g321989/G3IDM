import {
  Typography,
  Grid,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { todaydate } from "../../utils/helperFunctions";
import React from "react";
import { RequiredField } from "../common";
import { useDispatch, useSelector } from "react-redux";
//import { actions } from "atp-authorization-binder";
import { Autocomplete } from "@material-ui/lab";
import { messageCatalogGetter } from "../../utils/common/function";
import config from "../../utils/config";
import { actions } from "../../../redux";

const PractitionerForm = (props) => {
 const {classes} = props
  const { edit, editData } = props;

  const [user, setuservalue] = React.useState(false);

  const dispatch = useDispatch();


  const Gender = useSelector((state) => state?.personSlice.gender_master?.data);
  const Prefix = useSelector((state) => state?.personSlice.prefix_master?.data);
  const Suffix = useSelector(
    (state) => state?.personSlice.surffix_master?.data
  );
  const roleList = useSelector((state) => {
    // console.log("role",state?.rolesSlice?.role_read?.data);
    return state?.rolesSlice?.role_read?.data
  });
  console.log("rolelist", roleList);
  const [imageFile, setImageFile] = React.useState({
    file: "",
  });
  const imageHandle = (event) => {
    setImageFile({ file: URL.createObjectURL(event.target.files[0]) });
  };
   const EntityType = useSelector((state) => Array.isArray(state?.organizationSlice?.getAllEnterprice?.data)?state?.organizationSlice?.getAllEnterprice?.data:[] );
   console.log("EntityType" ,EntityType)
  const genderValue = React.useRef(edit ? editData[0]?.gender?._id : "");
  const name = React.useRef({
    use: "",
    text: edit ? editData[0]?.name[0]?.text : "",
    family: edit ? editData[0]?.name[0]?.family : "",
    given: edit ? editData[0]?.name[0]?.given : "",
    prefix: edit ? editData[0]?.name[0]?.prefix : "",                        
    suffix: edit ? editData[0]?.name[0]?.suffix : "",
    period: [],
    id: 0,
  });

  const telecom = React.useRef({
    system: "",
    value: edit ? editData[0]?.telecom[0]?.value : "",
    use: "",
    rank: "",
    period: [],
    id: 0,
  });
  const entityName = React.useRef(edit ? { _id: editData[0]?.orgType } : []);
  console.log("entityName" ,entityName)
  const roleID = React.useRef(edit ? editData[0]?.roleid : []);
  // console.log(roleID,roleList.length,roleList,roleList?.filter((e) => e?.rolename !== "Patient") )

  const [photo, setPhotoDetails] = React.useState({
    date: "",
    url: "",
    id: 0,
    fileName: "",
    fileid: "",
    filetype: "",
  });
  const address = React.useRef({
    country: "",
    Type: "",
    city: "",
    line: "",
    use: "",
    postalCode: "",
    state: "",
  });
  const dateOfBirth = React.useRef(edit ? editData[0]?.birthDay : "");
  const OrgID = config.Facilityid

  const [parentEntity, setParent] = React.useState([]);
  // console.log("name.current", entityName.current, OrgID.current);
  React.useLayoutEffect( () => {
    const roleid = localStorage.getItem("RoleId");
    const tenentid = localStorage.getItem("tenentid");
    dispatch(actions.ROLE_READ({Roleid:roleid , tenantid:tenentid}));
    // dispatch(actions.ORGANIZATION_GET_LEVEL_CARE());
    dispatch(actions.GENDERMASTER());
    dispatch(actions.PREFIXMASTER());
    dispatch(actions.SURFFIXMASTER());

    dispatch(actions.ORGANIZATION_GET_ALL({Roleid:roleid , tenantid:tenentid}));

   
    // dispatch(actions.GET_PARENT_ENTITY("Facility"));
    dispatch(actions.ORGNAME());
    if (edit) {
      handleChange(OrgID.current);
    } else {
      getParent(undefined);
    }
  }, [dispatch, edit]);

  const getParent = async (type) => {
    // console.log(type);
    dispatch(actions.FACILITYLIST(type)); // console.log("getParent", res.payload.data);
    // setParent(res.payload.data);
    // console.log("parent", parent);
  };
  const handleChange = (value) => {
    getParent(value?.id);
  };
  // console.log({ parentEntity });
  const forUpdate = () => {
    let valll = {
      name: [
        {
          use: name.current.use,
          text: name.current.text,
          family: name.current.family,
          given: name.current.given,
          prefix: name.current.prefix,
          suffix: name.current.suffix,
          period: [],
          id: 0,
        },
      ],
      telecom: [
        {
          system: telecom.current.system,
          value: telecom.current.value,
          use: telecom.current.use,
          rank: telecom.current.rank,
          period: [],
          id: 0,
        },
      ],
      gender: genderValue.current,
      birthDay: dateOfBirth.current.split("-").reverse().join("/"),
      address: [
        {
          country: address.current.country,
          Type: address.current.Type,
          city: address.current.city,
          line: address.current.line,
          use: address.current.use,
          postalCode: address.current.postalCode,
          state: address.current.state,
        },
      ],
      photo: [
        {
          date: "",
          url: "",
          id: 0,
          fileName: "test",
          fileid: "101",
          filetype: "png",
        },
      ],
      active: true,
      link: [
        {
          isPractitioner: false,
          asurrance: "",
          patientID: [],
          PractitionerID: [],
        },
      ],
      Id: edit ? editData[0].Id : 0,
      RelatedPersonID: edit ? editData[0].RelatedPersonID : [],
      OrgID: [config.Facilityid],
      alias: "",
      usertype: "",
      orgType: entityName.current._id,
      roleid: [roleID.current],
      keycloackid: edit ? editData[0].keycloackid : "",
      tenantid:localStorage.getItem("tenentid"),
      

    };
    // console.log("prefic", valll, entityName.current.id);
    return valll;
  };
  //console.log("facilityList" ,facilityList)
  return (
    <React.Fragment>
      {!props.loading && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "90px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            zIndex: "2",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div>
        <Grid
          container
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <Grid container item xs={12} sm={12} md={8} lg={12} xl={12}>
            <Grid
              container
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              spacing={1}
            >
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography noWrap>{messageCatalogGetter("Prefix") && "Prefix"}</Typography>

                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Prefix"
                      variant="outlined"
                    />
                  )}
                  options={Prefix ?? []}
                  getOptionLabel={(option) => option.display ?? []}
                  value={
                    Prefix?.find((l) => l.display === name.current.prefix) || ""
                  }
                  onChange={(e, newvalue) => {
                    forUpdate();
                    name.current = {
                      ...name.current,
                      prefix: newvalue.display,
                    };
                    props.sendData("prefix", newvalue, forUpdate());
                  }}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography noWrap>
                  {messageCatalogGetter("First Name") && "First Name"}
                  <RequiredField color="red" />
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={name.current?.text}
                  onChange={(e) => {
                    name.current = {
                      ...name.current,
                      text: e.target.value,
                    };
                    props.sendData("name", name.current, forUpdate());
                  }}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography noWrap>{messageCatalogGetter("Middle Name") && "Middle Name"}</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={name.current?.family}
                  onChange={(e) => {
                    name.current = {
                      ...name.current,
                      family: e.target.value,
                    };
                    props.sendData("name", name.current, forUpdate());
                  }}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography noWrap>
                 {messageCatalogGetter("Last Name") && "Last Name"}
                  <RequiredField color="red" />
                </Typography>

                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={name.current?.given}
                  onChange={(e) => {
                    name.current = {
                      ...name.current,
                      given: e.target.value,
                    };
                    props.sendData("name", name.current, forUpdate());
                  }}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                          <Typography>
                            Gender
                            <RequiredField color="red" />
                          </Typography>
                          {/* <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              props.sendData("gender", e.target.value);
                            }}
                          /> */}
                          <Autocomplete
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Gender"
                                variant="outlined"
                              />
                            )}
                            value={
                              Gender?.find(
                                (l) => l?._id === genderValue?.current
                              ) || ""
                            }
                            options={Gender ?? []}
                            getOptionLabel={(option) => option?.display ?? []}
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e, newvalue) => {
                              genderValue.current = newvalue._id;
                              props.sendData("gender", newvalue, forUpdate());
                            }}
                          />
                        </Grid>
            
            
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography>
                  {messageCatalogGetter("Email") && "Email"}
                  <RequiredField color="red" />
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={telecom.current.value}
                  disabled = {edit? true : false}
                  onChange={(e) => {
                    telecom.current = {
                      ...telecom.current,
                      value: e.target.value,
                    };
                    props.sendData("telecom", telecom.current, forUpdate());
                  }}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography>
                  {messageCatalogGetter("Select Role") && "Select Role"}
                  <RequiredField color="red" />
                </Typography>
                <Autocomplete
                      // id={`${parent_id}-Entity-Type-autocomplete`}
                      multiple
                      options={roleList ?? []}
                      getOptionLabel={(option) => option?.rolename??""}
                      size={"small"}
                      onChange={(e, value) => {
                        console.log("value" ,value)
                        roleID.current = value;
                        props.sendData("roleid", value, forUpdate());
                      }}
                      value={
                        roleID.current || []
                      }
                      renderInput={(params) => (
                        <TextField
                          // id={`${parent_id}-Entity-Type-textField`}
                          {...params}
                          variant="outlined"
                          // error={props.data?.error?.EntityType}
                          placeholder={"Select Role"}
                          // autoComplete="off"
                          size="small"
                        />
                      )}
                    />
                {/* <Autocomplete
                multiple
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Role"
                      variant="outlined"
                      
                    />
                  )}
                 
                  options={
                     //[]
                    roleList?? []
                  }
                  value={
                    roleID.current || []
                  }
                  onChange={(e, newvalue) => {
                    roleID.current = newvalue;
                    props.sendData("roleid", newvalue, forUpdate());
                  }}
                 
                  getOptionLabel={(option) => option?.rolename}
                  // value={
                  //   roleList?.find(
                  //     (l) => l?.roleid === roleID?.current?.roleid
                  //   ) || ""
                  // }
                  // onChange={(e, newvalue) => {
                  //   console.log(newvalue)
                  //   roleID.current = newvalue;
                  //   props.sendData("roleid", newvalue, forUpdate());
                  // }}
                 
                  // getOptionLabel={(option) => option?.rolename ?? []}
                  
                  fullWidth
                  variant="outlined"
                  size="small"
                /> */}
              </Grid>
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Typography>
                  {messageCatalogGetter("Select Facility") && "Select Facility"}
                  <RequiredField color="red" />
                </Typography>

                <Autocomplete
                      // id={`${parent_id}-Entity-Type-autocomplete`}
                      options={EntityType ?? []}
                      getOptionLabel={(option) => option?.name||""}
                      size={"small"}
                      onChange={(e, value) => {
                        console.log("value" ,value)
                        entityName.current = value;
                        props.sendData("orgType", value, forUpdate());
                      }}
                      value={
                        
                        EntityType?.find(
                          (l) => l?._id === entityName?.current?._id
                        ) || ""
                      }
                      renderInput={(params) => (
                        <TextField
                          // id={`${parent_id}-Entity-Type-textField`}
                          {...params}
                          variant="outlined"
                          // error={props.data?.error?.EntityType}
                          placeholder={"Facility Name"}
                          autoComplete="off"
                          size="small"
                        />
                      )}
                    />
              </Grid>
            </Grid>
            
          </Grid>
        
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default PractitionerForm;
