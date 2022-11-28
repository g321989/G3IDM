import React from "react";
import {
  Card,
  CircularProgress,
  useTheme,
  Grid,
  IconButton,
  Tooltip,
  // Drawer
} from "@material-ui/core";
import { AlertProps, DrawerProps } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { actions } from "atp-authorization-binder";
import { CommonTable } from "../../components/common";
import { useHistory } from "react-router";
import { withAllContexts } from "../../HOCs";
import { SearchWithFilter } from "./SearchWithFilter";
import { makeStyles } from "@material-ui/core/styles";

import { Slide, Typography, Button } from "@material-ui/core";
import { PractitionerForm } from "../../components";
import { toast } from "react-toastify";
import { KeyboardBackspace } from "@material-ui/icons";

import { ContactSupportOutlined } from "@material-ui/icons";
import { actions } from "../../../redux";

let ValidateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: "relative",
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));
function PractitionerTable(props) {
  const [loader, setLoader] = React.useState(true);
  const { classes } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const { parent_id } = props;
  const history = useHistory();
  const listData = useSelector(
    (state) => state?.practitionerSlice?.practitioner_list?.data
  );
  const organizationSlice = useSelector((state) => state.organizationSlice);

  const loading = useSelector(
    (state) => state?.practitionerSlice?.practitioner_list?.loading
  );

  const [state, setState] = React.useState({
    open: false,
    edit_data: null,
  });

  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [personDetails, setPersonDetails] = React.useState([]);
  const [editData, setEditData] = React.useState({});
  const [edit, setEdit] = React.useState(false);
  const [error, setError] = React.useState({});
  const allPersons = React.useRef([]);
  const handlepageChange = async (currentPage, PerPage) => {
    let tenantid = localStorage.getItem("tenentid");
    let roleid = localStorage.getItem("RoleId");
    setPage((currentPage - 1) * PerPage);
    setPerPage(PerPage);
    await dispatch(
      actions.PRACTITIONER_LIST_READ({
        page: (currentPage - 1) * PerPage,
        perPage: PerPage,
        tenantid: tenantid,
        roleid: roleid,
      })
    );
  };

  const handleDrawerOpen = (val) => {
    if (val === "new") {
      setEdit(false);
    }
    // console.log("pressed");
    setState({
      ...state,
      open: true,
    });
  };

  // Backdrop Helpers
  const showBackdrop = () => {
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: true,
      message: "processing....",
    });
  };
  const hideBackdrop = () => {
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: false,
    });
  };

  const getAllPerson = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      db_name: process.env.REACT_APP_DB,
      entity: "Person",
      filter: `(like(document(first(Person.name)).text,'%%',true))&& Person.roleid[0].roleid!='5' && Person.activestatus==true`,

      return_fields:
        "MERGE(Person,{ name:(FOR nam IN TO_ARRAY(Person.name) RETURN MERGE(DOCUMENT(nam),{use:DOCUMENT(DOCUMENT(nam).use)})), address:(FOR add IN TO_ARRAY(Person.address) RETURN MERGE(DOCUMENT(add),{country:DOCUMENT(DOCUMENT(add).country),Type:DOCUMENT(DOCUMENT(add).Type) ,use:DOCUMENT(DOCUMENT(add).use) ,city:DOCUMENT(DOCUMENT(add).city) ,state:DOCUMENT(DOCUMENT(add).state) ,postalCode:DOCUMENT(DOCUMENT(add).postalCode) })), photo:DOCUMENT(Person.photo), telecom:(for tel IN TO_ARRAY(Person.telecom) RETURN MERGE(DOCUMENT(tel),{system:DOCUMENT(DOCUMENT(tel).system),use:DOCUMENT(DOCUMENT(tel).use),rank:MERGE(DOCUMENT(DOCUMENT(tel).rank),{coding:DOCUMENT(DOCUMENT(DOCUMENT(tel).rank).coding)}) })), gender:MERGE(DOCUMENT(Person.gender),{coding:(FOR cod IN TO_ARRAY(DOCUMENT(Person.gender).coding) RETURN DOCUMENT(cod))}) })",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(process.env.REACT_APP_ARANGO_URL_READ, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("sample:", result);
        allPersons.current = result.result;
      })
      .catch((error) => console.log("error", error));
  };
  React.useLayoutEffect(() => {
    console.log(actions)
    const getdata = async () => {
      let tenantid = localStorage.getItem("tenentid");
      let roleid = localStorage.getItem("RoleId");
      await dispatch(actions.ORGANIZATION_ENTITY_TYPE());
      await dispatch(actions.ORGANIZATION_GET_LEVEL_CARE());

      await dispatch(
        actions.PRACTITIONER_LIST_READ({
          page: page,
          perPage: perPage,
          tenantid: tenantid,
          roleid: roleid,
        })
      );
    };
    getAllPerson();
    getdata();
   
  }, [dispatch]);

  const handleEdit = (e, values, index) => {
    setState({ open: true });
    setEdit(true);
    let onePerson = allPersons.current?.filter((e) => e._id === values._id);
    const genderValue = onePerson[0]?.gender?._id;
    const name = {
      use: "",
      text: onePerson[0]?.name[0]?.text,
      family: onePerson[0]?.name[0]?.family,
      given: onePerson[0]?.name[0]?.given,
      prefix: onePerson[0]?.name[0]?.prefix,
      suffix: onePerson[0]?.name[0]?.suffix,
      period: [],
      id: 0,
    };

    const telecom = {
      system: "",
      value: onePerson[0]?.telecom[0]?.value,
      use: "",
      rank: "",
      period: [],
      id: 0,
    };
    const entityName = { id: onePerson[0]?.orgType };
    const roleID = onePerson[0]?.roleid[0];

    const dateOfBirth = onePerson[0]?.birthDay;
    const OrgID = onePerson[0]?.OrgID[0];
    setEditData(onePerson);
    let valll = {
      name: [
        {
          use: name?.use,
          text: name?.text,
          family: name?.family,
          given: name?.given,
          prefix: name?.prefix,
          suffix: name?.suffix,
          period: [],
          id: 0,
        },
      ],
      telecom: [
        {
          system: telecom?.system,
          value: telecom?.value,
          use: telecom?.use,
          rank: telecom?.rank,
          period: [],
          id: 0,
        },
      ],
      gender: genderValue,
      //birthDay: dateOfBirth.split("-").reverse().join("/"),
      address: [],
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
      Id: onePerson[0]?.Id,
      RelatedPersonID: onePerson[0]?.RelatedPersonID,
      OrgID: [OrgID],
      alias: "",
      usertype: "",
      orgType: entityName?.id,
      roleid: [roleID],
      keycloackid: onePerson[0]?.keycloackid,
      tenantid: localStorage.getItem("tenentid"),
    };

    setPersonDetails(valll);
  };

  const handleSave = async () => {
    if (Valid()) {
      if (ValidateEmail(personDetails?.telecom?.[0]?.value)) {
        try {
          let tenantid = localStorage.getItem("tenentid");
          const response = await dispatch(actions.PERSON_UPSERT(personDetails));

          let roleid = localStorage.getItem("RoleId");
          if (response?.payload?.data?.Code === 201) {
            setLoader(true);
            hideBackdrop();
            toast.success("Role Mapped Successfully", {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT,
            });

            setEdit(false);
            setEditData({});
            await dispatch(
              actions.PRACTITIONER_LIST_READ({
                page: page,
                perPage: perPage,
                tenantid: tenantid,
                roleid: roleid,
              })
            );
            getAllPerson();
          } else {
            hideBackdrop();
            return toast.error(response?.payload?.message, {
              autoClose: 2000,
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          hideBackdrop();
          return toast.error(error, {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setLoader(true);
        handleClose();
      } else {
        toast.error("Please Enter Valid Mail", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Required Fields Are Empty", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const sendData = (keyValue, value, newval) => {
    setPersonDetails(newval);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
    setPersonDetails([]);
    setEdit(false);
    setEditData({});
  };
  const Valid = () => {
    var ValidData = false;
    const FormData = {
      firstName: personDetails?.name?.[0]?.text,
      lastName: personDetails?.name?.[0]?.given,
      gender: personDetails?.gender,
      email: personDetails?.telecom?.[0]?.value,
      roleid: personDetails?.roleid?.[0]?.roleid,
    };
    if (
      Object.values(FormData).every(
        (val) => val !== undefined && val.length !== 0
      )
    ) {
      ValidData = true;
      return ValidData;
    } else {
      return ValidData;
    }
  };

  const handleUpdate = async () => {
    if (Valid()) {
      showBackdrop();
      const response = await dispatch(
        actions.PERSON_UPDATE({
          filter: {
            _key: edit ? editData[0]._key : "",
          },
          doc: {
            ...personDetails,
          },
        })
      );
      if (response?.payload?.data?.Code === 201) {
        setLoader(true);
        hideBackdrop();
        handleClose();
        toast.success("Person Updated Succesfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        });
        let tenantid = localStorage.getItem("tenentid");
        let roleid = localStorage.getItem("RoleId");
        await dispatch(
          actions.PRACTITIONER_LIST_READ({
            page: page,
            perPage: perPage,
            tenantid: tenantid,
            roleid: roleid,
          })
        );
      } else {
        hideBackdrop();
        return toast.error(response?.payload?.message, {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      console.log("error", error);
      return toast.error("Validation failed!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const statusChange = async (e, values, index) => {
    let data = {
      code: values.code_type,
      description: values.description,
      type: props.type,
      status: e.target.checked,
      _key: values._key,
      id: values.id,
    };
    setState({
      ...state,
      edit_data: data,
    });
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: true,
      message: "Status Updating",
    });
    let tenantid = localStorage.getItem("tenentid");
    let roleid = localStorage.getItem("RoleId");
    await dispatch(actions.PRACTITIONER_STATUS_CHANGE(data));
    await dispatch(
      actions.PRACTITIONER_LIST_READ({
        page: page,
        perPage: perPage,
        type: props.type,
        tenantid: tenantid,
        roleid: roleid,
      })
    );
    setState({
      ...state,
      edit_data: null,
    });
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: false,
      message: "",
    });
    props.alert.setSnack("update");
  };

  const onSearchChange = (value = "") => {
    if (value?.length > 2) {
      let tenantid = localStorage.getItem("tenentid");
      let roleid = localStorage.getItem("RoleId");
      dispatch(
        actions.PRACTITIONER_LIST_READ({
          type: props.type,
          search: value.trim(),
          page: page,
          perPage: perPage,
          tenantid: tenantid,
          roleid: roleid,
        })
      );
    } else if (!value) {
      let tenantid = localStorage.getItem("tenentid");
      let roleid = localStorage.getItem("RoleId");
      dispatch(
        actions.PRACTITIONER_LIST_READ({
          type: props.type,
          page: page,
          perPage: perPage,
          tenantid: tenantid,
          roleid: roleid,
        })
      );
    }
  };

  return (
    <React.Fragment>
      {!state.open && (
        <Card id={`${parent_id}-parent-card`} style={{ borderRadius: "12px" }}>
          <div id={`${parent_id}-parent-div`} style={{ width: "100%" }}>
            <Card
              id={`${parent_id}-parent-card`}
              style={{ borderRadius: "12px" }}
            >
              <div
                id={`${parent_id}-parent-div`}
                style={{
                  borderRadius: "6px",
                }}
              >
                <div
                  id={`${parent_id}-header-button-div`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: theme.palette.background.table,
                  }}
                >
                  <div
                    id={`${parent_id}-header-div`}
                    style={{ marginLeft: "18px" }}
                  >
                    <p
                      id={`${parent_id}-${props?.header?.replaceAll?.(
                        " ",
                        "-"
                      )}-p`}
                      style={{
                        fontFamily: "poppinsemibold",
                        fontSize: "16px",
                        marginBottom: "0px",
                      }}
                    >
                      {props.header}
                    </p>
                  </div>
                  <div
                    id={`${parent_id}-Add-New-button-div`}
                    style={{
                      marginTop: "16px",
                      float: "right",
                      marginRight: "20px",
                      display: "flex",
                    }}
                  >
                    <SearchWithFilter
                      id="symptomyandspeciality"
                      placeholder="Search code and Description!"
                      classes={classes}
                      onSearchChange={onSearchChange}
                      hideSearchBar={false}
                      hideFilter={true}
                    />
                    &nbsp;
                    <Button
                      id={`${parent_id}-Add-New-button`}
                      // className={classes.btn}
                      variant="contained"
                      // style={{
                      //   margin: "0 5px ",
                      //   backgroundColor: "#4CAF50",
                      //   color: "white",
                      // }}
                      color="primary"
                      onClick={() => handleDrawerOpen("new")}
                    >
                      +Add New
                    </Button>
                  </div>
                </div>

                {/* table */}
                <div
                  id={`${parent_id}-CommonTable-div`}
                  style={{
                    padding: 20,
                    height: "71vh",

                    background: theme?.palette?.background?.table,
                  }}
                >
                  <CommonTable
                    parent_id={"practitioner"}
                    Header={["S.No", "Name", "Type", "Action"]}
                    dataList={listData}
                    tableData={[
                      { type: ["INCRIMENT"], name: "" },
                      { type: ["TEXT"], name: "name" },
                      { type: ["TEXT"], name: "type" },
                      { type: ["EDIT"], name: "" },
                    ]}
                    handleCheckBox={statusChange}
                    handleEdit={handleEdit}
                    handlepageChange={(currentPage, PerPage) =>
                      handlepageChange(currentPage, PerPage)
                    }
                    TableCount={listData?.length}
                    incrementCount={page}
                    showPagination={true}
                    rowsPerPageOptions={[
                      { label: "10 Rows", value: 10 },
                      { label: "50 Rows", value: 50 },
                      { label: "100 Rows", value: 100 },
                    ]}
                    loading={loading}
                    classes={classes}
                  />
                </div>
              </div>
            </Card>
          </div>
        </Card>
      )}
      {state.open && (
        <React.Fragment>
          <Grid
            container
            style={{
              // backgroundColor: "#ECF0F7",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <Grid item sm={12} xs={12} md={12} xl={12} lg={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "16px",
                }}
              >
                <IconButton
                  size="small"
                  id="BackBtn"
                  onClick={() => handleClose()}
                  style={{
                    padding: "5px",
                    marginRight: "18px",
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    border: "1px solid #E0E0E0",
                    opacity: 1,
                  }}
                >
                  <Tooltip title={"Back to Person"} placement="top" arrow>
                    <KeyboardBackspace fontSize="small" />
                  </Tooltip>
                </IconButton>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bolder" }}
                  className={classes.title}
                >
                  Person Registration
                </Typography>
              </div>
            </Grid>
            <PractitionerForm
              sendData={sendData}
              loading={loader}
              edit={edit}
              editData={editData}
              classes={classes}
            />
            <Grid
              item
              sm={12}
              xs={12}
              lg={12}
              xl={12}
              md={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                autoFocus
                // size="small"
                variant="contained"
                // style={{
                //   margin: "0 5px ",
                //   backgroundColor: "#4CAF50",
                //   color: "white",
                // }}
                color="primary"
                onClick={() => (edit ? handleUpdate() : handleSave())}
              >
                {edit ? "Update" : "save"}
              </Button>
              <Button
                style={{ margin: "0 0 0 5px" }}
                autoFocus
                variant="outlined"
                // size="small"
                color="primary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default withAllContexts(PractitionerTable);
