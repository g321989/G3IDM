import React from 'react';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
    root: {
        '& .App1-MuiInputBase-root': {
            padding: '2px'
        },
        '& fieldset': {
            borderRadius: 8,
            borderColor: '#E0E0E0'
        },
        '& input': {
            fontSize: 12,
            fontFamily: 'pc_medium',
            color: '#101010',
            padding: 10
        }
    },
    label: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'pc_regular !important',
        marginBottom: 8
    }
}))

export const SelectWithLabel = (props) => {

    const classes = useStyles(props);
    const { parent_id } = props;

    const returnOptions = () => {
        // if(props?.multiple && props?.value){
        //     return props?.options?.filter(o1 => {
        //         props?.value?.
        //     });
        // }
        return props?.options
    }

    return (
        <div
            id={`${parent_id}-parent-div`}
            className={classes.root}>
            {
                props.label &&
                <Typography
                    id={`${parent_id}-${props?.label?.replaceAll(" ", "-")}-typography`}
                    className={classes.label}>{props?.label}
                    {props?.required && <span
                        id={`${parent_id}-title-star-span`}
                        style={{ color: "red" }} >*</span>}
                </Typography>
            }
            <Autocomplete
                id={`${parent_id}-Autocomplete`}
                freeSolo={props?.freeSolo}
                multiple={props?.multiple}
                options={returnOptions()}
                getOptionLabel={(option) => props?.freeSolo ? option : option.label}
                value={props?.value}
                onChange={(event, newValue) => props?.onChange(newValue)}
                disabled={props?.disabled}
                renderInput={(params) => (
                    <TextField
                        id={`${parent_id}-textField`}
                        {...params}
                        variant={props?.variant}
                        fullWidth
                        required={props?.required}
                        error={props?.error}
                        placeholder={props?.placeholder}
                    />
                )}
            />
        </div>
    )
}



SelectWithLabel.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.bool,
    value: PropTypes.object,
    onChange: PropTypes.func,
    variant: PropTypes.oneOf('standard' | 'outlined' | 'filled'),
    options: PropTypes.array,
    multiple: PropTypes.bool,
    freeSolo: PropTypes.bool
}

SelectWithLabel.defaultProps = {
    required: false,
    label: '',
    value: {},
    onChange: null,
    variant: 'outlined',
    error: false,
    options: [],
    multiple: false,
    freeSolo: false
}