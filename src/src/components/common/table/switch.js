import React from 'react';
import {
    withStyles, Switch
} from '@material-ui/core';

export const TableSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      // margin: theme.spacing(1),
    },
    switchBase: {
      padding: 2,
      "&$checked": {
        transform: "translateX(12px)",
        color: theme?.palette?.common?.white,
        "& + $track": {
          backgroundColor: theme?.palette?.background?.tableHeader,
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
      border: `1px solid ${theme?.palette?.grey[400]}`,
      backgroundColor: theme?.palette?.grey[50],
      opacity: 1,
      transition: theme?.transitions?.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(Switch);