import React from "react";
import { TDayStatistics } from "../../Types/AppTypes";
import { addDays } from "../../Types/AppUtils";

type TStatisticsGridProps = {
  startDate: Date,
  data: TDayStatistics[]  | undefined;
}

export default function StatisticsGrid({startDate, data}: TStatisticsGridProps){
 
  const renderDataRows = () => {
    if (!data) return null;

    const result: React.ReactChild[] = [];
    const max = data.length - 1;


    for (let i = 0; i <= 300; i++) {
      const id = max - i;
      const time = addDays(startDate, id);
      const timeTitle = time.toLocaleDateString("uk-UA", { day: '2-digit', month: 'long', year: 'numeric' });

      const item = (
        <tr key={i}>
          <td> {timeTitle}</td>
          <td> {data[id].sickness}</td>
          <td> {data[id].sicknessDiff}</td>
          <td> {data[id].sicknessNew}</td>     
        </tr>
      );

      result.push(item);
    }

    return result;
  }

  return (
    <table className="selected-region-grid">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Хворі</th>
          <th>Різниця хворих</th>
          <th>Нових хворих</th>
        </tr>
      </thead>
      <tbody>
        {renderDataRows()}
      </tbody>
    </table>
  )
}