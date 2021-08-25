import { isAfter, isBefore, isSameDay, startOfMonth, endOfMonth } from "date-fns";

function isSelected(day, value) {
    return isSameDay(value, day);
}
function beforeToday(day) {
    return isBefore(day, new Date());
}
function isToday(day) {
    return isSameDay(day, new Date());
}
function beforeCurrentMonth(day, value) {
    return isBefore(day, startOfMonth(value))
}
function afterCurrentMonth(day, value) {
    return isAfter(day, endOfMonth(value))
}
export default function dayStyles(day, value) {
    if(isSelected(day,value)) return "bg-warning";
    if(isToday(day)) return "bg-dark text-light";
    if(beforeCurrentMonth(day, value) || afterCurrentMonth(day, value)) return "text-muted";
    return "";
}