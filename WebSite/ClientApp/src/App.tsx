import { off } from 'node:process';
import React, { MouseEvent, useEffect, useState } from 'react';
import './App.css';
import Checkbox from './Copmonents/Interface/Checkbox';
import ProgressChart, { TChartData } from './src/ProgressChart/ProgressChart';
import StatisticsGrid from './src/StatisticsGrid/StatisticsGrid';
import UkraineMap from './src/UkraineMap/UkraineMap';
import { TRegionData, initialStatisticData, IStatisticData, eMapDataType } from './Types/AppTypes';
import { addDays, CreateStatisticData } from './Types/AppUtils';

function App() {

  const [data, setData] = useState<IStatisticData>(initialStatisticData);
  const [selRegionData, setSelRegionData] = useState<TRegionData | undefined>(undefined);
  const [chartStartFrom, setChartStartFrom] = useState<number>(0);
  const [chartUseAvg, setChartUseAvg] = useState<boolean>(false);
  const [mapDataType, setMapDataType] = useState<eMapDataType>(eMapDataType.total);

  useEffect(() => {
    fetch("https://covidstatisticsstorage.blob.core.windows.net/covid-stats/ukraine.json")
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


  function handleChartLastRecordsClick(p: any, chartDaysLimit: number): any {
    p.preventDefault();

    if (!selRegionData) return;

    const startFrom = (chartDaysLimit !== 0) 
      ? selRegionData?.stats?.length - 1 - chartDaysLimit
      : 0;

      setChartStartFrom(startFrom);
  }

  function handleMapTypeClick(p: any, mapType : eMapDataType): any {
      p.preventDefault();
      setMapDataType(mapType);
  }

  function handleMapOnClick(regionId: string) {
    const regionData = data.data.find(r => r.mapNameId === regionId);
    setSelRegionData(regionData);
  }

  const getMapData = (data: TRegionData[]): [string, number][] => {
    if (!data) return [];

    const result = data.map(r => {
      const lastId = r.stats.length - 1;
      const value = 
        (mapDataType == eMapDataType.total) ? r.lastValues.sickness :   
        (mapDataType == eMapDataType.dencity) ? r.lastValues.sicknessDencity :   
        (mapDataType == eMapDataType.cityDencity) ? r.lastValues.sicknessCityDencity : 
        0;   

      const item: [string, number] = [r.mapNameId, value];
      return item;
    });
    return result;
  }

  const charStartFrom = addDays(data.startDate, chartStartFrom);

  const mapData = getMapData(data.data);
  const chartDataToShow = selRegionData?.stats?.slice(chartStartFrom);

  const chartData: TChartData[]= [
    {
      name: 'Кількість хворих',
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
      <h1>Розширена Covid статистика по областях</h1>
      Дивитися оригінальні дані <a href="https://www.pravda.com.ua/cdn/covid-19/cpa/"> www.pravda.ua </a>
      <div className="map-container">
       
        <div className="linkswitch-container">
            <span className="linkswitch-button"> 
                <a href='#none' onClick={(p)=>handleMapTypeClick(p, eMapDataType.total)} > 
                    Хворі 
                </a> 
            </span>
            <span className="linkswitch-button"> 
                <a href='#none' onClick={(p)=>handleMapTypeClick(p, eMapDataType.dencity)} > 
                    Хворі на 1 млн. населення 
                </a> 
            </span>
        </div>

        <UkraineMap dataName="Кількість хворих" data={mapData} onClick={handleMapOnClick}/>
        Для показу детальної статистики по певній області натисніть на потрібну область на карті
      </div>

      <div className="chart-container">
        <ProgressChart title={selRegionData?.name} data={chartData} startFrom={charStartFrom}/>
        <Checkbox className="chart-checkbx-useAvg"
            label="Використовувати середні значення (Нових Хворих, Різниця Хворих)"
            handleCheckboxChange={setChartUseAvg}
        />
        <div className="linkswitch-container">
          <span className="linkswitch-button"> <a href='#none' onClick={(p)=>handleChartLastRecordsClick(p, 0)} > Show All </a> </span>
          <span className="linkswitch-button"> <a href='#none' onClick={(p)=>handleChartLastRecordsClick(p, 366)} > Show Last Year </a> </span>
          <span className="linkswitch-button"> <a href='#none' onClick={(p)=>handleChartLastRecordsClick(p, 183)} > Show Last 6 Month </a> </span>
          <span className="linkswitch-button"> <a href='#none' onClick={(p)=>handleChartLastRecordsClick(p, 93)} > Show Last 3 Month </a> </span>
          <span className="linkswitch-button"> <a href='#none' onClick={(p)=>handleChartLastRecordsClick(p, 31)} > Show Last Month </a> </span>
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








