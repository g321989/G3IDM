import React from 'react';
import { IconButton, TextField, Grid, LinearProgress, Tooltip, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";
// import { FilterIcon } from '../../.././src/assets/filterIcon';
import PropTypes from 'prop-types';



export const SearchWithFilter = (props) => {

    const {classes} = props;

    const [state, setState] = React.useState({
        search: ""
    });

    const changeState = (key, value) => {

        setState({
            ...state,
            [key]: value
        })

        if (key === 'search') {
            onSearchChange(value, props?.title);
        }
    }

    const {
        placeholder = "Search",
        hideFilter = false,
        hideSearchBar = false,
        loading = false,
        onSearchChange = () => false,
        onFilterClicked = () => false,
        isFilterApplied = false,
        id = "",
        title = "",
    } = props;

    return (
        <div>
            <Grid container>
                <Grid item style={{ display: "flex", alignItems: 'center' }} >
                    {!hideFilter && <Grid item className={classes.filterIcon}>
                        <Tooltip title={isFilterApplied ? "Filter Applied" : "Click for filter"}>
                            <Badge color={"secondary"} variant="dot" invisible={!isFilterApplied} >
                                <IconButton
                                    className={classes.filterIconBtn}
                                    //  onClick={onFilterClicked}
                                    id={id + "filter" ?? "filter"}>
                                    {/* <FilterIcon isFilterApplied={isFilterApplied} /> */}
                                </IconButton>
                            </Badge>
                        </Tooltip>
                    </Grid>}
                    {!hideSearchBar && <Grid item >
                        <TextField
                            id="outlined-search"
                            placeholder={placeholder}
                            size="small"
                            style={{ width: "231px", height: "34px" }}
                            type="search"
                            variant="outlined"
                            value={state.search}
                            onChange={(e) => changeState('search', e.target.value)}
                            InputProps={{
                                style: {
                                    fontFamily: "poppin",
                                    fontSize: "12px",
                                    marginRight: "10px",
                                    background: "#f7f7f7",
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                        {/* <img src={searchicon} alt="Icon" /> */}
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                style: { fontSize: 12 },
                            }}
                        />
                        {loading && <LinearProgress className={classes.progressBar} />}
                    </Grid>}
                </Grid>
            </Grid>
        </div>
    )
}

SearchWithFilter.propTypes = {
    placeholder: PropTypes.string,
    hideSearchBar: PropTypes.bool,
    hideFilter: PropTypes.bool,
    onSearchChange: PropTypes.func,
    onFilterClicked: PropTypes.func,
    isFilterApplied: PropTypes.bool
}