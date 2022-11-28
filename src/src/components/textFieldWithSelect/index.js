import React from "react";
import { Typography, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  label: {
    color: "#6F6F6F",
    fontSize: 12,
    fontFamily: "pc_regular",
    marginBottom: 8,
  },
  wrapper: (props) => ({
    display: "flex",
    alignItems: "center",
    border: `${props?.variant === "outlined" ? 1 : 0}px solid ${
      props?.error ? "red" : "#E0E0E0"
    }`,
    borderRadius: 8,
  }),
  wrapper_: (props) => ({
    display: "flex",
    alignItems: "center",
    border: `${props?.variant === "outlined" ? 1 : 0}px solid ${
      props?.error ? "red" : "#E0E0E0"
    }`,
    borderRadius: 8,
    width: "100%",
  }),
  root: {
    "& .App1-MuiInputBase-root": {
      padding: "0px",
    },
    "& fieldset": {
      border: 0,
    },
    wrapper: (props) => ({
      display: "flex",
      alignItems: "center",
      border: `${props?.variant === "outlined" ? 1 : 0}px solid ${
        props?.error ? "red" : "#E0E0E0"
      }`,
      borderRadius: 8,
      width: "100%",
    }),
    wrapper_: (props) => ({
      display: "flex",
      alignItems: "center",
      border: `${props?.variant === "outlined" ? 1 : 0}px solid ${
        props?.error ? "red" : "#E0E0E0"
      }`,
      borderRadius: 8,
      width: "100%",
    }),
    root: {
      "& .App1-MuiInputBase-root": {
        padding: "0px",
      },
      "& fieldset": {
        border: 0,
      },
      "& input": {
        fontSize: 12,
        fontFamily: "pc_medium",
        color: "#101010",
        padding: "10px !important",
      },
    },
    "& input": {
      fontSize: 12,
      fontFamily: "pc_medium",
      color: "#101010",
      padding: "10px !important",
    },
  },
  textField: (props) => ({
    flex: 1,
    borderRight: `1px solid ${props?.error ? "red" : "#E0E0E0"}`,
  }),
  autoComplete: (props) => ({
    flex: props?.equalWidth && 1,
    "& .App1-MuiInputBase-root": {
      paddingRight: props?.equalWidth && "0px !important",
    },
  }),
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  rotateDivide: {
    width: 2,
    backgroundColor: "#B6B6B6",
    height: "25px",
    transform: "rotate3d(1, 1, 1, 45deg)",
    margin: "0px 10px",
  },
}));

export const TextFieldWithSelect = (props) => {
  const classes = useStyles(props);
  const { parent_id } = props;
  const onChange = (key, value) => {
    let newValue = {
      ...props?.value,
      [key]: value,
    };
    if (props?.onChange) props.onChange(newValue);
  };

  return (
    <div id={`${parent_id}-parent-div`} className={classes.root}>
      {props.label && (
        <Typography
          id={`${parent_id}-${props?.label.replaceAll(" ", "-")}-typography`}
          className={classes.label}
        >
          {props?.label}
          {props?.required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <div id={`${parent_id}-parent-div`} className={classes.flexCenter}>
        <div id={`${parent_id}-textField-div`} className={classes.wrapper_}>
          <div
            id={`${parent_id}-textField-sub-div`}
            className={classes.textField}
          >
            <TextField
              id={`${parent_id}-textField`}
              value={props?.value?.value ?? ""}
              onChange={(e) => onChange("value", e.target.value)}
              variant={props?.variant}
              fullWidth
              type={props?.type}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              disabled={props?.disabled}
              error={props.error}
            />
          </div>
          <Autocomplete
            id={`${parent_id}-textField`}
            options={props?.options}
            getOptionLabel={(option) => option.label}
            value={props?.value?.type ?? {}}
            onChange={(e, newValue) => onChange("type", newValue)}
            className={classes.autoComplete}
            disabled={props?.disabled}
            disableClearable={props?.disableClearable}
            renderInput={(params) => (
              <TextField
                id={`${parent_id}-textField`}
                {...params}
                variant={props?.variant}
                fullWidth
                error={props.error}
              />
            )}
          />
        </div>
        {props?.showDivideSymbol && <div className={classes.rotateDivide} />}
      </div>
    </div>
  );
};

TextFieldWithSelect.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  equalWidth: PropTypes.bool,
  showDivideSymbol: PropTypes.bool,
  disableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf("standard" | "outlined" | "filled"),
};

TextFieldWithSelect.defaultProps = {
  required: false,
  label: "",
  value: {},
  onChange: null,
  variant: "outlined",
  error: false,
  type: "text",
  equalWidth: false,
  showDivideSymbol: false,
  disableClearable: false,
  disabled: false,
};
