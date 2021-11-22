import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  editButton: {
    marginLeft: "10px",
    backgroundColor: "#0071F2",
    borderRadius: "0px",
    color: "#fff",
  },
  drawerHead: {
    display: "flex",
    padding: "25px",
    borderBottom: "1px solid #eee",
  },
  drawerSubHead: {
    fontFamily: "poppin",
    color: "#6F6F6F",
    fontSize: "12px",
    paddingBottom: "8px",
  },
  addDrawerBtn: {
    backgroundColor: "#0071F2",
    color: "#fff",
    fontFamily: "poppin",
    textTransform: "none",
    padding: "8px 60px",
    marginTop: "20px",
  },
  textTotalArea: {
    padding: "20px 30px",
  },
  headerMain: {
    fontFamily: "poppinsemibold",
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
    backgroundColor: "#0071F2",
    color: "#fff",
    padding: "6px 16px",
    fontFamily: "poppin",
    fontSize: "12px",
    textTransform: "none",
  },
  rolesDisplay: {
    width: "99%",
    border: "1px solid #DCDCDC",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  lowerDisplay: {
    width: "99%",
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
    "& .MuiTabs-indicator": {
      background: "#0071F2",
    },
    "& .MuiTabs-flexContainer": {
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
  numbersEdit: {
    marginTop: "8px",
  },
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
  },
  mainAreaNoData: {
    height: "0px",
  },
  selectedCell: {
    cursor: "pointer",
    border: "1px solid #0071F2",
    width: "99%",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
  },
  numbersEdit: {
    marginTop: "4px",
    fontFamily: "poppinsemibold",
    padding: "10px 20px 6px",
  },
  paperEdit: {
    borderRadius: "0px",
  },
  innerText: {
    fontSize: "12px",
    fontFamily: "poppinsemibold",
  },
  descriptionTab: {
    display: "flex",
    border: "1px solid #DCDCDC",
    padding: "14px 60px 14px 30px",
    borderRadius: "8px",
    marginTop: "15px",
    backgroundColor: "#f6f6f6",
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
    fontFamily: "poppin",
    fontSize: "12px",
    color: "gray",
    backgroundColor: "#f9f9f9",
  },
  tableBody: {
    width: "120px",
    padding: "12px",
    fontFamily: "poppinsemibold",
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
    color: theme.palette.text.primary,
    fontFamily: "poppinsemibold",
    background: "#F0F0F0",
  },
  autocompleteTag: {
    borderRadius: 8,
    height: 26,
    color: theme.palette.text.primary,
    fontFamily: "poppinsemibold",
    background: "#F0F0F0",
    "& .MuiChip-label": {
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
    color: "#0071F2",
    marginRight: 6,
  },
  detailData: {
    // marginLeft: "2.8vh",
    marginLeft: "18px",
    textAlign: "left",
    fontFamily: "poppinsemibold",
    fontSize: "0.9rem"
  },
  displaySectionTitle: {
    fontFamily: "poppinsemibold",
    padding: "10px 6px",
    display: "inline-block",
  },
  nodatafound:{
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold"
  }

}));

export default styles;
