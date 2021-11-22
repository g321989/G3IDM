import React, { useState } from "react";
import { withStyles, makeStyles, Typography } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.palette.text.secondary,
    fontSize: "12px",
    padding: "7px",
  },
}));
const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    //margin: theme.spacing(2),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: "6px",
      border: "1px solid #E2E2E2",
    },
    "&:first-child": {
      borderRadius: "6px",
      border: "1px solid #E2E2E2",
    },
    "&.MuiToggleButton-root": {
      padding: theme.spacing(0.9),
      background: "#fff",
      color: "#6F6F6F",
      border: "1px solid #6F6F6F",
      fontFamily: "poppin",
      marginRight: 15,
      minWidth: "60px",
      fontWeight: "unset",
      textTransform: "none",
      fontSize: "12px",
      "&.Mui-selected": {
        //   marginRight: 25,
        //   background: theme.palette.primary.dark,
        color: "#0071F2",
        border: "1px solid #0071F2",
      },
    },
  },
}))(ToggleButtonGroup);

export function ToggleButtoncomp(props) {
  const classes = useStyles();
  const [seletedBtn, setSelectBtn] = useState([]);
 
  const handleSelectedList = (e, v) => {
    const filtermap = props.totalJson.map((itm) => itm.page);
    const filterTotal = props.totalJson.filter(
      (item) => item.page === v.selectedRow
    );
    setSelectBtn(filterTotal);
    let check = filterTotal[0]?.acees.some((item)=> item === e.target.innerText)
  };

  const handleSelected = (v)=>{
    if(props.tab === "Pages"){
      let isCheck = props.totalJson?.some((_item)=> {
        if(_item?.page === props.row && _item.acees.indexOf(v.value)>= 0){
          return true
        }else{
          return false
        }
      })
      return isCheck
    } else if(props.tab === "Forms"){
      let isCheck = props.totalJson?.some((_item)=> {
        if(_item?.form === props.row && _item.acees.indexOf(v.value)>= 0){
          return true
        }else{
          return false
        }
      })
      return isCheck
    }
    else if(props.tab === "Reports"){
      let isCheck = props.totalJson?.some((_item)=> {
        if(_item?.report === props.row && _item.acees.indexOf(v.value)>= 0){
          return true
        }else{
          return false
        }
      })
      return isCheck
    }
    else if(props.tab === "Processes"){
      let isCheck = props.totalJson?.some((_item)=> {
        if(_item?.process === props.row && _item.acees.indexOf(v.value)>= 0){
          return true
        }else{
          return false
        }
      })
      return isCheck
    }
  }

  const handlegroupSelect = (e, newValue) => {
    props.handletoggleselect(
      newValue,
      props.page,
      props.tab,
      props.row,
      props.indexId,
      props.rowItem
    );
  };

  return (
    <div>
      {props.text && (
        <Typography className={classes.label} variant="h4">
          {props.text}
        </Typography>
      )}
      <StyledToggleButtonGroup
        size={props.size}
        exclusive={props.exclusive}
        orientation={props.orientation}
        itemdata={props.itemdata}
        page={props.page}
        tab={props.tab}
        row={props.row}
        indexId={props.indexId}
        aria-label="toggle"
        value={props.value}
        onChange={(e, newValue) => handlegroupSelect(e, newValue)}
      >
        {props.data?.map((v, i) => {
          return (
            <ToggleButton
              // onClick={(e) => handleSelectedList(e, v)}
              key={i}

              selected={
              //  v.subSec?.some((item)=> item.page === props.row) && v.checked === true
                // props.totalJson.some((_item)=> _item.page === props.rowItem.Repository.elementname)
                // props.totalJson.some((_item)=> _item.page === props.row && _item.acees.some((itm)=>itm === v.name)) ? true : false
                //  props.totalJson.some((_item)=> {
                //   console.log("_item.acess", _item.acees)
            
                //   if(_item.page === props.row && _item.acees.indexOf((itm)=>itm === v.name)>= 0){
                //     return true
                //   }else{
                //     return false
                //   }
                // })
                handleSelected(v)
                // true
              }
              //  && v.subSec?.some((item)=> item?.acees?.some((itm)=> itm === v.name))
                // seletedBtn[0]?.acees.filter((itm) => itm === v.name)
                // props.totalJson?.filter(
                //   (item) =>
                //     item.page ===
                //     v.selectedRow?.item.acees.filter((i) => i === v.name)
                // )
                  // ? true
                  // : false
              // }
              value={v?.value}
              // disabled={v?.disabled}
              // disableRipple={v?.disableRipple}
              style={{
                height: "30px",
                margin: "0px 8px",
                border: "1px solid ",
              }}
            >
              {v.name}
            </ToggleButton>
          );
        })}
      </StyledToggleButtonGroup>
    </div>
  );
}
ToggleButtoncomp.propTypes = {
  value: PropTypes.string,
  size: PropTypes.string,
  exclusive: PropTypes.bool,
  orientation: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.array,
};

export default ToggleButtoncomp;
