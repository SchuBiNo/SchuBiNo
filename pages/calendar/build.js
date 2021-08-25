import { startOfMonth, startOfISOWeek, endOfMonth, endOfISOWeek, startOfDay, addDays } from "date-fns";

export default function buildCalendar(value) {
    let month = takeMonth(value);

    return month();
}

function takeWeek(start = newDate()) {
    let date = startOfISOWeek(startOfDay(start));

    return function () {
        const week = [...Array(7)].map((_, i) => addDays(date, i));
        date = addDays(week[6], 1)
        return week;
    };
}

function takeMonth(start = new Date()) {
    let month = [];
    let date = start
    return function () {
        const weekGen = takeWeek(startOfMonth(date));
        const endDate = startOfDay(endOfISOWeek(endOfMonth(date)));
        month.push(weekGen())

        while(month[month.length - 1][6] < endDate) {
            month.push(weekGen());
        }

        return month;
    };

}