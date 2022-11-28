import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    overflowX: "hidden",
    backgroundColor: theme?.palette?.background?.table,

    "& .App1-MuiTab-textColorPrimary": {
      "&.Mui-selected": {
        color: "#007AFF",
      },
    },
    "&.App1-MuiPaper-elevation4": {
      shadow: "none",
    },
    "& .App1-MuiTab-root": {
      [theme.breakpoints.up("xs")]: {
        minWidth: "inherit !important",
      },
    },
    "& .App1-MuiAppBar-root": {
      width: "80%",
    },

  },
  MuiTab: {
    root: {
      minWidth: 0,
      "@media (min-width: 0px)": {
        minWidth: 0,
      },
    },
  },
  box: {
    padding: "24px 12px",
    paddingBottom: "43px",
    backgroundColor: theme?.palette?.common?.white,
    // height: "100vh",
    height: "100%",
    paddingTop: "14px",
  },

  MainHead: {

    backgroundColor: theme?.palette?.common?.white,
  },
  AppHeading: {
    paddingTop: "14px",
    paddingLeft: "25px",

    fontSize: "14px",
    whiteSpace: "nowrap",
    fontWeight: "bold"
  },
  AppBarstyle: {
    backgroundColor: theme?.palette?.common?.white,
    boxShadow: "none",
    zIndex: "auto"

  },
  TabStyle: {

    fontSize: "13px",
    textTransform: "unset",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginLeft: "20px",
    fontWeight: "bold"
  },
  tabstyle:{
    borderRadius: "10px", 
    width: "98%", 
    padding: "0px"
  },
  editButton: {
    marginLeft: "10px",
    backgroundColor: "#0071F2",
    borderRadius: "0px",
    color: theme?.palette?.common?.white,
  },
  drawerHead: {
    display: "flex",
    padding: "25px",
    borderBottom: "1px solid #eee",
  },
  drawerSubHead: {
    color: "#6F6F6F",
    fontSize: "12px",
    paddingBottom: "8px",
  },
  addDrawerBtn: {
    backgroundColor: "#0071F2",
    color: "#fff",
    textTransform: "none",
    padding: "8px 60px",
    marginTop: "20px",
  },
  textTotalArea: {
    padding: "20px 30px",
  },
  headerMain: {
  },
  btnPosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    color: "#ff0000",
  },
  root: {
    borderRadius: "0px",
    width: "100%",
  },
  firstSec: {
    padding: "15px 45px",
    borderBottom: "3px solid #9b9999",
  },
  firstSecRepository: {
    padding: "15px 45px",
  },
  btn: {
    backgroundColor: theme?.palette?.primary?.main,
    color: theme?.palette?.primary?.contrastText,
    padding: "6px 16px",
    fontSize: "12px",
    textTransform: "none",
  },
  rolesDisplay: {
    width: "100%",
    border: "1px solid #DCDCDC",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  lowerDisplay: {
    width: "100%",
    border: "1px solid #DCDCDC",
    display: "flex",
    padding: "14px 16px",
    borderRadius: "8px",
    alignItems: "center",
  },
  secondSec: {
    padding: "20px 45px",
  },
  tabs: {
    "& .App1-MuiTabs-indicator": {
      background: "#0071F2",
    },
    "& .App1-MuiTabs-flexContainer": {
      borderBottom: "2px solid #f4f4f5",
    },
  },
  tabEdit: {
    textTransform: "none",
  },
  Section2: {
    height: `calc(100vh - 452px)`,
    overflow: "auto",
    paddingBottom: "25px",
  },
  Section2NoMain: {
    height: `calc(100vh - 192px)`,
    overflow: "auto",
    paddingBottom: "25px",
  },
  // numbersEdit: {
  //   marginTop: "8px",

  // },
  mainAreaRepository: {
    height: `calc(100vh - 216px)`,
    overflow: "auto",
    margin: "10px 0px",
    paddingBottom: "20px",
  },
  mainArea: {
    height: "250px",
    overflow: "auto",
    marginTop: "10px",
    height: `calc(100vh - 320px)`,
    marginLeft: 10,
    marginRight: 2,
  },
  mainAreaNoData: {
    height: "0px",
  },
  selectedCell: {
    cursor: "pointer",
    border: "1px solid #0071F2",
    width: "100%",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
  },
  numbersEdit: {
    marginTop: "4px",
    padding: "10px 20px 6px",
    fontWeight:700
  },
  numbersEdit1: {
    marginTop: "4px",
    //padding: "10px 20px 6px",
    fontWeight:700
  },
  paperEdit: {
    borderRadius: "0px",
  },
  innerText: {
    fontSize: "14px",
    fontWeight:600
  },
  descriptionTab: {
    display: "flex",
    border: "1px solid #DCDCDC",
    padding: "14px 60px 14px 30px",
    borderRadius: "8px",
    marginTop: "15px",
    background: theme?.palette?.background?.tableHeader,
    marginLeft: 9, 
    marginRight: 14 
  },
  // contentBox: {
  //   position: "fixed",
  //   minHeight: `calc(100% - 140px)`,
  //   width: `calc(100% - 105px)`,
  // },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "12px",
    color: "gray",
    backgroundColor: "#f9f9f9",
  },
  tableBody: {
    width: "120px",
    padding: "12px",
    fontSize: "12px",
  },
  tableContainer: {
    borderRadius: "8px",
    marginTop: "20px",
    boxShadow: "none",
    border: "1px solid #E0E0E0",
    height: `calc(100vh - 218px)`,
  },
  repoLeftSide: {
    height: `calc(100vh - 143px)`,
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid #DCDCDC",
  },
  active: {
    backgroundColor: "#E0EBF9 !important",
    color: "#0071F2 !important",
  },
  groupedBtnAlign: {
    padding: "5px",
    margin: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },

  rolesChipRoot: {
    borderRadius: 4,
    height: 26,
    //color: theme?.palette?.text?.primary,
    background: "#F0F0F0",
  },
  autocompleteTag: {
    borderRadius: 8,
    height: 26,
    //color: theme?.palette?.text?.primary,
    background: "#F0F0F0",
    "& .App1-MuiChip-label": {
      paddingRight: 24,
    },
  },

  // Users Detail Display
  boxFirstDiv: {
    marginRight: "2%",
    marginBottom: "2%",
  },
  detailBox: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "1%",
    color: "#6f6f6f"
  },
  iconStyle: {
    fontSize: 18,
    color: theme?.palette?.primary?.main,
    marginRight: 6,
  },
  detailData: {
    // marginLeft: "2.8vh",
    marginLeft: "18px",
    textAlign: "left",
    fontSize: "0.9rem"
  },
  displaySectionTitle: {
    padding: "10px 6px",
    display: "inline-block",
  },
  nodatafound: {
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "10px 20px 6px 38px" 
  },
  dropDownPaper: {
    color: theme?.palette?.grey[500]
  },
  containedButton: {
    background: theme?.palette?.primary?.main,
    height: 32, 
    borderRadius: 8,
    //color: theme?.palette?.button?.text,
    "&:hover": {
      background: theme?.palette?.primary?.light,
    }
  },
  TreeStyle: {
    padding: "10px 20px 6px 38px",
    width: "100%"
  },
  Typostyle: {
    padding: "6px 8px 6px",
  },
  TypedivStyle: {

    width: "100%"
  },
  treeviewStyle: {

    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 60,
    maxWidth: 62,
    textAlign: "center",
  },
  tableStyle: {

    display: "flex",
    width: "100%"
  },
  TypeHeadStyle: {
    padding: "6px 20px 6px",
    fontWeight:"bold"
  },
  GriddivStyle: {

    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 20,
  },
  containerStyle: {

    borderRadius: "10px",
    border: "1px solid #DCDCDC",
  },
  RightTab: {

    margin: 14
  },
  btndivStyle: {

    margin: "8px 14px 8px 0px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
  },
  Editgrid:{

    display: "flex", 
    justifyContent: "space-between" 
  },
  Editdiv:{
    padding: "10px 20px 6px 20px" 
  },
  IconbtnStyle:{
    height: 24, 
    width: 24
  },
  EditMode:{
    display: "flex",
     gap: 8, 
     alignItems: "center" 
  },
  RepositarySide:{
     backgroundColor: theme?.palette?.common?.white,
     background: theme?.palette?.background?.table,
    borderRadius: "10px",
    border: "1px solid #DCDCDC",
  },
  RepogridStyle:{

    overflow: "hidden"
  },
  EditIconStyle:{
   fontSize:"18px",
   marginLeft:"16px",
   color:"#b3a1a1"
  },
  DeleteIconStyle:{
    fontSize:"18px",
    marginLeft:"16px",
    color:"#fd6161"
  },
  SearchStyle:{
    width: "95%",
    padding: "8px 9px"
  },
  TypeleftHeadStyle:{
    marginTop: "4px",
    fontWeight:700,
    fontSize:"16px"
  },
  leftTab:{
    border: "1px solid #DCDCDC",
    borderRadius: "10px",

  },
  TitleTab:{
    display: "flex", 
    margin: "16px 20px 8px"
  },
  RepoHead:{
     
    borderRadius: "10px",
    border: "1px solid #DCDCDC",
    backgroundColor:"#fff"
  },
  Treecomp:{
    padding: "10px 20px 6px 38px" 
  },
  cancelBtn:{
    height: 32, 
    borderRadius: 8 
  },
  InsideFormStyle:{
    padding: "6px 20px 6px"
  },
  InsideFormHeadStyle:{
    color: "#6F6F6F",
    fontSize: "12px",
    marginBottom: "6px",
  },
  spanStyle:{
    color:theme?.palette?.secondary?.main
  },
  circularprogesss:{
    textAlign: "center", 
    paddingTop: "90px" 
  },
  RolenameStyle:{
    padding: "8px 0px"
  },
  IsAddStyle:{
    display: "flex",
    gap: 8,
    alignItems: "center",
    padding: "10px",
  },
  IButtonStyle:{
    height: 24, 
    width: 24 
  },
  RightSideStyle:{
    margin: 14,
    borderRadius: "10px",
    border: "1px solid #DCDCDC",
  },
  TypoStyle:{
    padding: "16px 20px 6px",
    fontSize: "0.8rem",

  },
  TypoStylepermission:{
    color: "#6F6F6F",
    fontSize: "12px",
    marginBottom: "6px",
  },
  chipStyle:{
    width: "100%",
    padding: "6px 20px 6px",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  noncontainedButton:{
    height: 32, 
    borderRadius: 8
  },
  filterIcon: {
    height: 40,
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 2px 4px #0000000A',
    border: (props) => `1px solid ${props?.isFilterApplied ? theme?.palette?.secondary?.light : '#110F471A'}`,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: 10,
    marginRight: 10
},
filterIconBtn: {
    padding: theme?.spacing(1)
},
progressBar: {
    margin: "0px 10px",
},
table: {
  minWidth: 650,
},
tableHeader: {
  background: theme?.palette?.background?.tableHeader,
  fontSize: "14px",
  color: "#646464",
  padding: 10,
},
tableBody: {
  //padding: "12px",
  fontSize: "12px",
  padding: 10,
},
tablePaper: {
  background: theme?.palette?.background?.table,
},

}))

export default useStyles;