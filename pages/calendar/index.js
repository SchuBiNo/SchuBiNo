import Link from "next/link";
import React,{ useState, useEffect } from "react";
import moment from "moment";

export default function Calender() {
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment())

    
    const startDay = value.clone().startOf("month").startOf("isoWeek"); //week = s sunday; isoWeek = s monday
    const endDay = value.clone().endOf("month").endOf("isoWeek");


    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");
        const tempA = []
        while(day.isBefore(endDay, "day")) {
            tempA.push(
                Array(7).fill(0).map(() => day.add(1, "day").clone())
            )
        }
        setCalendar(tempA)
    }, [value])


    

    return( 
            <div>
                <div className="container">
                {
                    calendar.map(week => <div className="row">
                       {
                           week.map(day => <div className="col card">
                               <div className="card-body text-center fw-bold">
                                    { day.format("D") }
                               </div>
                           </div>)
                       } 
                    </div>)
                }
                </div>

            </div>
        );
}