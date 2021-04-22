import React from "react";
import Highcharts, { SeriesClickEventObject } from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { hightchartOptions } from "../../Copmonents/Highchart/hightchartOptions";
import mapDataUaAll from "../../Copmonents/Highchart/mapDataUaAll";

require('highcharts/modules/map')(Highcharts);

type UkraineMapProps = {
    dataName: string; 
    data: (string | number)[][];
    onClick?: (regionId: string) => void;
};

export default function UkraineMap(props: UkraineMapProps) {
    
    const chartClick = (e:any) => {
        if (!props.onClick) return;

        const regionId = e.point["hc-key"];
        if (regionId && regionId !== "")
            props.onClick(regionId);
    };
    
    const chartOptions = {
        ...hightchartOptions,
        plotOptions: {
            series: {
                events: {
                    click: chartClick
                }
            }
        },

        colorAxis: {
            minColor: '#efecf3',
            maxColor: '#990041',
        },
        series: [{
            mapData: mapDataUaAll,
            data: props.data,
            name: props.dataName,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true
            }
        }]
    };

    return (
        <HighchartsReact
            options={chartOptions}
            constructorType={'mapChart'}
            highcharts={Highcharts}
        />
    );

}