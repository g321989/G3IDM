import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme)=>({
  root: {
    marginTop: 15,
    alignItems: "center",
  },
  overAllcount: {
    fontWeight: "bold",
    fontSize: "14px",
    color: theme?.pagination?.primaryText,
    fontFamily: "pc_semibold",
  },
  perpageDiv: {
    display: "flex",
    alignContent: "center",
  },
  perpage: {
    color: "#83859B",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "pc_regular",
  },
  formControl: {
    marginLeft: 10,
  },
  selectEmpty: {
    "& .App1-MuiOutlinedInput-input": {
      padding: "4.5px 14px",
      paddingRight: "32px",
      fontSize: "14px",
      fontFamily: "pc_regular",
      color: theme?.pagination?.primaryText,

      "& .App1-MuiOutlinedInput-notchedOutline":{
        borderColor:theme?.palette?.border?.textField
      },
      "& .App1-MuiPaper-root":{
        backgroundColor:"#000"
      },
    },
  },
  backicon: {
    borderRadius: "18px",
    cursor: "pointer",
    border: "1px solid #E5E5E5",
    //color: theme?.pagination?.text,
  },
  showingPage: {
    fontSize: "12px",
    fontFamily: "pc_regular",
    color: theme?.pagination?.primaryText,
  },
  notchedOutline:{
    borderColor:theme?.palette?.border?.textField
  },
  autocomplete: {
    "& .App1-MuiOutlinedInput-notchedOutline":{
      borderColor:theme?.palette?.border?.textField
    },
    "& .App1-MuiMenu-paper":{
      color:"#6a7888"
    }
   },
  prevNxtDiv: {
    display: "flex",
    justifyContent: "center",
  },
  prevNxtsubDiv: {
    display: "flex",
  },
  backiconGrid: {
    marginTop: 7,
  },
  Pageno: {
    display: "flex",
  },
  no: {
    padding: 10,
    color: "#86869A",
    fontSize: "12px",
    fontFamily: "pc_regular",
    cursor: "pointer",
  },
  secondContainer: {
    alignItems: "center",
  },
  menu: {
    color: theme?.pagination?.menuText
  },
  currentPageNo:{
    //color:theme?.pagination?.text,
    padding: 10,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold"
  }
}));

export const CustomTablePagination = ({
  count = 0,
  handlepageChange = async () => {},
  rowsPerPageOptions = [{ label: "10 Rows", value: 10 }],
}) => {
  const classes = useStyles();
  const [perpage, setPerpage] = React.useState(
    rowsPerPageOptions[0]?.value || 10
  );
  const [page, setPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState([]);

  //first render use effect.
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    setPage(totalpages);
    renderNumber(totalpages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //call everytime when perpage change
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    setPage(totalpages);
    if (currentPage > totalpages) {
      setCurrentPage(totalpages);
    } else {
      renderNumber(totalpages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perpage]);

  //call everytime when current page change
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    renderNumber(totalpages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  //onclick next page
  const next = async () => {
    if (currentPage + 1 <= page) {
      setCurrentPage(currentPage + 1);
      await handlepageChange(currentPage + 1, perpage);
    }
  };

  //onclick previous page
  const previous = async () => {
    if (currentPage - 1 >= 1) {
      setCurrentPage(currentPage - 1);
      await handlepageChange(currentPage - 1, perpage);
    }
  };

  //handle change on number
  const handleChange = async (value) => {
    let totalpages = Math.ceil(count / value);
    let NewCurrentpage = currentPage;
    if (currentPage > totalpages) {
      NewCurrentpage = totalpages;
    }
    setPerpage(value);
    await handlepageChange(NewCurrentpage, value);
  };

  //render the number based on count
  const renderNumber = (totalpages) => {
    let arr = [];
    const lastpage = currentPage + 4;
    if (currentPage <= 5) {
      if (totalpages > 6) {
        //show first 5 and last number
        arr = [1, 2, 3, 4, 5, 0, totalpages];
      } else {
        //all pages
        for (let index = 0; index < totalpages; index++) {
          arr.push(index + 1);
        }
      }
    } else if (lastpage < totalpages) {
      //show first page , lastpage, current page to next 5
      for (let index = currentPage; index <= lastpage; index++) {
        arr.push(index);
      }
      if (totalpages - lastpage === 1) {
        arr = [...[1, 0], ...arr, ...[totalpages]];
      } else {
        arr = [...[1, 0], ...arr, ...[0, totalpages]];
      }
    } else if (lastpage >= totalpages) {
      //show first page and remaing page from current page
      arr = [1, 0];
      for (let index = totalpages - 4; index <= totalpages; index++) {
        arr.push(index);
      }
    }
    setPageCount(arr);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        {/* <Typography className={classes.showingPage}>
          {(currentPage - 1) * perpage} -{" "}
          {currentPage * perpage > count ? count : currentPage * perpage}
          &nbsp;&nbsp;
          <span className={classes.overAllcount}>of {count}</span>
        </Typography> */}
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={8}>
        <Grid container className={classes.secondContainer} spacing={2}>
          <Grid item xs={4}>
            <Grid className={classes.perpageDiv}>
              <Typography className={classes.perpage} variant="h6">
                Per Page
              </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  id="demo-simple-select-required"
                  value={perpage}
                  onChange={(e) => handleChange(e.target.value)}
                  className={classes.selectEmpty}
                >
                  {rowsPerPageOptions?.map((row) => {
                    return <MenuItem className={classes.menu} value={row.value}>{row.label}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid className={classes.prevNxtDiv} item xs={8}>
            <Grid className={classes.prevNxtsubDiv}>
              <Grid className={classes.backiconGrid}>
                {/* <NavigateBeforeIcon
                  className={classes.backicon}
                  onClick={() => previous()}
                /> */}
              </Grid>
              <Grid className={classes.Pageno}>
                {/* {pageCount?.map((pg) => {
                  return (
                    <Typography
                      onClick={async () => {
                        if (pg) {
                          setCurrentPage(pg);
                          await handlepageChange(pg, perpage);
                        }
                      }}
                      // style={
                      //   currentPage === pg
                      //     ? classes.currentPageNo
                      //     : undefined
                      // }
                      className={currentPage === pg ? classes.currentPageNo : classes.no}
                    >
                      {pg ? <>{pg <= 9 ? `0${pg}` : pg}</> : <>...</>}
                    </Typography>
                  );
                })} */}
              </Grid>

              <Grid className={classes.backiconGrid}>
                {/* <NavigateNextIcon
                  className={classes.backicon}
                  onClick={() => next()}
                /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
