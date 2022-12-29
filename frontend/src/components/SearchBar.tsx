import React, { FunctionComponent } from "react";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";

import { SearchBarProps } from "../interfaces";
import { icons } from "../assets/icons";

const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
    const { label, value, setValue, handleSearch } = props;
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel
                size="small"
                htmlFor={`outlined-adornment-${value.split(" ").join("")}`}
            >
                {label}
            </InputLabel>
            <OutlinedInput
                size="small"
                id={`outlined-adornment-${value.split(" ").join("")}`}
                type={"text"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={`${value.split(" ").join("-")}`}
                            onClick={handleSearch}
                            edge="end"
                        >
                            {icons["searchicon"]()}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
};

export default SearchBar;
