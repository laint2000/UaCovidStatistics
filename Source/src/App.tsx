import { off } from 'node:process';
import React, { useEffect, useState } from 'react';
import './App.css';
import Checkbox from './Copmonents/Interface/Checkbox';
import ProgressChart, { TChartData } from './src/ProgressChart/ProgressChart';
import StatisticsGrid from './src/StatisticsGrid/StatisticsGrid';
import UkraineMap from './src/UkraineMap/UkraineMap';
import { TRegionData, initialStatisticData, IStatisticData } from './Types/AppTypes';
import { addDays, CreateStatisticData } from './Types/AppUtils';

function App() {

  const [data, setData] = useState<IStatisticData>(initialStatisticData);
  const [selRegionData, setSelRegionData] = useState<TRegionData | undefined>(undefined);
  const [chartStartFrom, setChartStartFrom] = useState<number>(0);
  const [chartUseAvg, setChartUseAvg] = useState<boolean>(false);

  useEffect(() => {
    fetch("data/ukraine.json")
      .then(response => response.json())
      .then(responseAddToState);
  }, [])

  
  function responseAddToState(response: any) {
    const data = CreateStatisticData(response.regions, response.start_time);
    setData(data);
  }

  const handleRegionClick = (id: string) => {
    const regionData = data.data.find(r => r.id === id);

    setSelRegionData(regionData);
  }

  useEffect(() => {
    if (data.data.length > 0 && !selRegionData) {
      handleRegionClick("lviv");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.data])

  function handleChartLastRecordsClick(p: React.MouseEvent<HTMLAnchorElement, MouseEvent>, chartDaysLimit: number): void {
    p.preventDefault();

    if (!selRegionData) return;

    const startFrom = (chartDaysLimit !== 0) 
      ? selRegionData?.stats?.length - 1 - chartDaysLimit
      : 0;

      setChartStartFrom(startFrom);
  }

  function handleMapOnClick(regionId: string) {
    const regionData = data.data.find(r => r.mapNameId === regionId);
    setSelRegionData(regionData);
  }

  const getMapData = (data: TRegionData[]): [string, number][] => {
    if (!data) return [];

    const result = data.map(r => {
      const lastId = r.stats.length - 1;
      const item: [string, number] = [r.mapNameId, r.stats[lastId].sickness];
      return item;
    });
    return result;
  }

  const charStartFrom = addDays(data.startDate, chartStartFrom);

  const mapData = getMapData(data.data);
  const chartDataToShow = selRegionData?.stats?.slice(chartStartFrom);

  const chartData: TChartData[]= [
    {
      name: 'Захворіло',
      data: chartDataToShow?.map(r => r.sickness) ||  []
    },  
    {
      name: 'Різниця хворих',
      data: chartDataToShow?.map(r => chartUseAvg ? r.sicknessDiffAvg : r.sicknessDiff) ||  []
    },
    {
      name: 'Нових хворих',
      data: chartDataToShow?.map(r => chartUseAvg ? r.sicknessNewAvg : r.sicknessNew) ||  []
    }
  ];

  return (
    <div className="App">
      <h1>Covid Statistics</h1>
      <div className="map-container">
        <UkraineMap dataName="Хворі" data={mapData} onClick={handleMapOnClick}/>
      </div>
      <div className="chart-container">
        <ProgressChart title={selRegionData?.name} data={chartData} startFrom={charStartFrom}/>
        <Checkbox className="chart-checkbx-useAvg"
            label="Використовувати середні значення (Нових Хворих, Різниця Хворих)"
            handleCheckboxChange={setChartUseAvg}
        />
        <div className="chart-limit-container">
          <span className="chart-limit-button"> <a href='#' onClick={(p)=>handleChartLastRecordsClick(p, 0)} > Show All </a> </span>
          <span className="chart-limit-button"> <a href='#' onClick={(p)=>handleChartLastRecordsClick(p, 366)} > Show Last Year </a> </span>
          <span className="chart-limit-button"> <a href='#' onClick={(p)=>handleChartLastRecordsClick(p, 183)} > Show Last 6 Month </a> </span>
          <span className="chart-limit-button"> <a href='#' onClick={(p)=>handleChartLastRecordsClick(p, 93)} > Show Last 3 Month </a> </span>
          <span className="chart-limit-button"> <a href='#' onClick={(p)=>handleChartLastRecordsClick(p, 31)} > Show Last Month </a> </span>
        </div>
      </div>
      <div className="statistics-grid-container">
        <h2 className="header-selected-region">{selRegionData?.name || ""}</h2>
        <StatisticsGrid data={selRegionData?.stats} startDate={data.startDate} />
      </div>
    </div >
  );
}



export default App;






