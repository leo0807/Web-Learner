import React, {useState} from 'react'
import './Search.css'
// main css
import 'react-date-range/dist/styles.css'
// theme css
import 'react-date-range/dist/theme/default.css'

import { DateRangePicker } from 'react-date-range'
import { Button } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People';
// DATE PICKER COMPONENT
function Search() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    }

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    return (
        <div className="search">
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
            <div className="inputContent">
                <PeopleIcon />
                <span>Number of Guests: </span>
                <input type="number" min={0} defaultValue={2} />
            </div>
            <Button>Search Airbnb</Button>
        </div>
    )
}

export default Search
