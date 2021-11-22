import React, { useState,useEffect } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Checkbox, Chip, makeStyles, SvgIcon } from "@material-ui/core";
import ico from "../../assets/icons8-flag-filled.svg";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: 110,
    flexGrow: 1,
    // maxWidth: 400,
  },
  fontEdits: {
    fontSize: "14px",
    fontFamily: "poppin",
    // padding: "10px 12px",
  },
  editLine: {
    position: "relative",
    margin: "14px 0px",
    "&:before": {
      pointerEvents: "none",
      content: '""',
      position: "absolute",
      width: 14,
      left: -16,
      top: (props) => (props.isCrudNeeded ? 18 : 10),
      borderBottom: "1px solid #B6B6B6",
    },
    "&:focus > $content": {
      backgroundColor: "E0EBF9",
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 15,
    borderLeft: "1px solid #B6B6B6",
  },
  selected: {
    backgroundColor: "#E0EBF9",
  },
  chipRoot: {
    borderRadius: 4,
    height: 22,
    color: theme.palette.text.secondary,
    background: "#F0F0F0",
  },

  checkboxRoot: {
    padding: "0px 8px 0px 0px",
  },

  treeLabelFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // gridTemplateColumns: "1fr calc(33.333333% + 22px)"
  },
}));

export default function Tree(props) {
  const classes = useStyles(props);
  const [orgCheck, setOrgCheck] = useState({
    orgData: props?.orgAccess ?? []
  });
  const  [permissionCheck,setPermissionCheck] =  useState(props?.permission_list ?? {});
  const [updateComp,setUpdateComp] = useState(false);
  useEffect(()=>{
    setOrgCheck({
    orgData: props?.orgAccess

    })
  },[props?.orgAccess])
  useEffect(()=>{
    setPermissionCheck(props?.permission_list);
  },[JSON.stringify(props?.permission_list)])
    const handleCheck = (e,item,i) =>{
      debugger;
      let {orgData} = orgCheck;

      if(orgData?.indexOf(item?.id) > -1){
          orgData.splice(orgData?.indexOf(item?.id),1)
      }else{
        orgData= orgData ? orgData : []
        orgData.push(item?.id)
      }

      // }else{
        setOrgCheck({
          ...orgCheck,
          orgData
        })
      // }
      props.handleOrgCheck(orgData)
    }

  // const handleCheck = () => {};
  const changeRepo = (_struct,permissionName,_id,str,is_check=false)=>{
    _struct?.map((_,index)=>{
     
      if(_.id===_id){
        is_check  = str[_.key]?.permission[permissionName?.toLowerCase()];
      }
      if(_?.children?.length>0 && str[_.key]?.component){
        is_check = changeRepo(_?.children,permissionName,_id,str[_.key]?.component,is_check);

      }
    })
    return is_check;

  }

  const constructionTree = (_struct,permissionName,_id,str)=>{
    str = JSON.parse(JSON.stringify(str));
    debugger;
    _struct?.map((_,index)=>{
     
      if(_.id===_id){
        debugger;
        if(str[_?.key]?.permission){
          str[_?.key].permission[permissionName?.toLowerCase()] = !str[_?.key]?.permission[permissionName?.toLowerCase()]

        }
        let _values = str[_?.key]?.permission && Object.values(str[_?.key]?.permission)?.some(_s=>_s===true);
        if(!_values && _?.children?.length>0 && str[_?.key]?.component){
          str[_?.key].component = structureCreate(_values, str[_?.key]?.component,_?.children);
        }
      }
      if(_?.children?.length>0 && str[_?.key]?.component){
        str[_?.key].component = constructionTree(_?.children,permissionName,_id,str[_?.key]?.component);

      }
    })
    return str;
  }
  const handleRepo = (name,_id,_permission)=>{
    const list = constructionTree(props.data,name,_id,_permission);
    props.handlePermission(list);
  }
  const structureCreate = (check,permission_struct,ui_struct)=>{
    permission_struct = JSON.parse(JSON.stringify(permission_struct));

    ui_struct?.length>0 && ui_struct?.map(_=>{
        let _per_key = Object.keys(permission_struct[_?.key]?.permission);
        _per_key?.map(_key=>{
          permission_struct[_?.key].permission[_key] = check;
        })
        if(_?.children?.length>0 && permission_struct[_?.key]?.component) {
          permission_struct[_?.key].component=structureCreate(check, permission_struct[_?.key]?.component,_?.children);
        }
    
     
    });
    return permission_struct;
  }
  const constructioncheck = (check,_id,__permission,ui_struct)=>{
    __permission = JSON.parse(JSON.stringify(__permission));

    ui_struct?.length>0 &&  ui_struct?.map(_=>{
      if(_?.id==_id){
    
        let _per_key = __permission[_?.key]?.permission && Object.keys(__permission[_?.key]?.permission);
        _per_key?.map(_key=>{
          __permission[_?.key].permission[_key] = check;
        })
        if(_?.children?.length>0 && __permission[_?.key]?.component) {
          __permission[_?.key].component=structureCreate(check, __permission[_?.key]?.component,_?.children);
        }
      } else if(_?.children?.length>0 && __permission[_?.key]?.component) {
        __permission[_?.key].component=constructioncheck(check,_id, __permission[_?.key]?.component,_?.children);
      }
     
    })
    return __permission;
  }
  const handleFullCheck = (value,Uidata,permissionData)=>{
    
    const list = constructioncheck(value.target.checked,Uidata.id,permissionData,props?.data);
    debugger;
    props.handlePermission(list);

  }
  const checkFull = (_struct,_id,str,is_check=false) =>{
    _struct?.map((_,index)=>{
     
      if(_.id===_id){
        is_check  = str[_.key]?.permission ? Object.values(str[_.key]?.permission).some(_s=>_s==true) : false;
      }
      if(_?.children?.length>0 && str[_.key]?.component){
        is_check = checkFull(_?.children,_id,str[_.key]?.component,is_check);

      }
    })
    return is_check;
  }
  const renderTree = (treelist, i) => {

    treelist =   Array.isArray(treelist) && treelist?.map((item,i)=>(
      <TreeItem
      key={item.id}
      nodeId={item.id}
      //   icon={<img src={ico} alt="dummy" />}
      label={
        props.isCrudNeeded ? (
          <div className={classes.treeLabelFlex}>
            <Checkbox
              checked={
                checkFull(props.data,item.id,props.permission_list) == true ? true : false

                // Object.value(item.permission)?.some(_=>_===true)  ? true : false
              }
              onChange={(e) => handleFullCheck(e, item,props.permission_list)}
              // style={{ color: "#0071F2" }}
              // size="small"
              color="primary"
              size="small"
              // classes={{ root: classes.checkboxRoot }}
              disabled={!props.editMode}

            />
            <div style={{ display: "flex", gap: 8 }}>
              {item.name}
              {item?.component_type ? <Chip label={item?.component_type ?? ''} classes={{ root: classes.chipRoot }} /> :''} 

            </div>
            
            <div style={{ display: "flex" }}>
              {["Write", "Read", "Update", "Delete"].map((x) => (
                <div
                  style={{
                    minWidth: 60,
                    maxWidth: 62,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                     checked={
                      changeRepo(props.data,x,item.id,props.permission_list) == true ? true : false
                    }
                    onChange={(e) => handleRepo(x,item.id,props.permission_list)}
                    // onChange={(e) => {
                    //   debugger;
                    //   e.stopPropagation();
                    // }}
                    // style={{
                    //   color: "#0071F2",
                    // }}
                    color="primary"
                    size="small"
                    disabled={!props.editMode}
                    // classes={{root: classes.checkboxRoot}}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : props.editMode ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={
                orgCheck.orgData?.indexOf(item?.id) > -1 ? true : false
              }
              onChange={(e) => handleCheck(e, item, i)}
              style={{ color: "#0071F2" }}
              size="small"
              classes={{ root: classes.checkboxRoot }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              {item.name}
              {item?.component_type ? <Chip label={item?.component_type ?? ''} classes={{ root: classes.chipRoot }} /> :''} 

            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            {item.name}

           {item?.component_type ? <Chip label={item?.component_type ?? ''} classes={{ root: classes.chipRoot }} /> :''} 
          </div>
        )
      }
      classes={{
        label: classes.fontEdits,
        root: classes.editLine,
        group: classes.group,
      }}
    >
      {Array.isArray(item.children)
        ?  renderTree(item.children, i)
        : null}
    </TreeItem>
  
    ));
    return treelist;
  }
    

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<InfoIcon />}
      // expanded={props.expanded}
      // onNodeToggle={props.handleToggle}
    >
      {renderTree(props.data)}
    </TreeView>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}
