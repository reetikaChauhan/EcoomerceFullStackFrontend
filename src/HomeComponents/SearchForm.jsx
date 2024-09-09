import { useState } from 'react'
import '../Homepage.css'
import PropTypes from "prop-types";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
function SearchForm({setCheckInDate,setCheckOutDate}){
    const [openCalendar, setopenCalendar] = useState(false)
   
    const [date,setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    const handleChange = (ranges) =>{
        setDate(ranges.selection)
        setCheckInDate(`${format(ranges.selection.startDate,'MMM.dd,yyyy')} `);
        setCheckOutDate( `${format(ranges.selection.endDate,'MMM.dd,yyyy')} `);
       
    }
    const handleClick = () =>{setopenCalendar((prev) =>!prev)}

    return(
        <>
        <div className='calendar-input'>
            <form >
                <input
                className='input-field'
                id="booking-input"
                type="text"
                onClick={handleClick}
                value = {
                    `Check-in   ${format(date.startDate,'MMM.dd,yyyy')} `
                }
                readOnly
                />
                <input
                className='input-field'
                id="booking-input"
                type="text"
                onClick={handleClick}
                value = {
                    `Check-out  ${format(date.endDate,'MMM.dd,yyyy')} `
                }
                readOnly
                />
               
            </form>
            { openCalendar && <DateRangePicker
                className='data-range'
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
                />}
        </div>

        </>
    )
}

SearchForm.propTypes = {
    setCheckInDate: PropTypes.PropTypes.func.isRequired,
    setCheckOutDate:PropTypes.func.isRequired,
};

export default SearchForm