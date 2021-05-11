import { AxisLabelsFormatterContextObject } from "highcharts";
import { addDays } from "../../Types/AppUtils";

export function formatDate(date: Date): string 
{
    return date.getDate()  + "." + (date.getMonth()+1) + "." + date.getFullYear();
}
