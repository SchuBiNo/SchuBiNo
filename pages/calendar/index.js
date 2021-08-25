import Link from "next/link";
import React,{ useState, useEffect } from "react";
import moment from "moment";
import {format, getISODay, startOfMonth} from "date-fns"

import buildCalendar from "./build";
import dayStyles from "./styles";

export default function Calender() {
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value])

    return( 
            <div>
                <div className="container">
                {
                    calendar.map(week => <div className="row">
                       {
                           week.map(day => 
                           <div onClick={()=> setValue(day)} className={`col card ${dayStyles(day, value)} `}>
                                <div className="card-body text-center fw-bold">
                                     { format(day, "dd-MM")}
                                </div>
                           </div>)
                       } 
                    </div>)
                }
                </div>

            </div>
        );
}