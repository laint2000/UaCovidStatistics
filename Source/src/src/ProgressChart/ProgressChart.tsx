import React from "react";
import Highcharts, { AxisLabelsFormatterContextObject, SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { addDays } from "../../Types/AppUtils";
import { formatDate } from "./ProgressChartUtils";

export type TChartData = {
    name: string;
    data: (string | number)[];
}

type ProgressChartProps = {
    title?: string;
    data: TChartData[];
    startFrom: Date,
};

export default function ProgressChart(props: ProgressChartProps) {
    const {title = "", data, startFrom} = props;

    const series: Array<SeriesOptionsType> = data.map(r=> ({
        type: 'area',
        name: r.name,
        data: r.data,
    }));


    const categoriesXAxis = data[0].data.map((r,i)=> formatDate(addDays(startFrom, i)));

    const xAxis = {
        tickInterval: 1,
        categories: categoriesXAxis,
    };

    const plotOptions = {
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
          }
        }
      };

    const options: Highcharts.Options = {
        title: {
            text: `${title}`
        },
        plotOptions,
        series,
        xAxis,
    }
    
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            {...props}
        />
    )
}