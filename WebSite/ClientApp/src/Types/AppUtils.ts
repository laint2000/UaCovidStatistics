import { resourceLimits } from "node:worker_threads";
import { getPopulationValue } from "../Constants/AppConst";
import { idToMapId, idToRegionName } from "../src/UkraineMap/UkraineMapUtils";
import { TRegionData, IStatisticData, TDayStatistics, TLastValues } from "./AppTypes";

export function CreateStatisticData(regions: any[], startDate: string): IStatisticData {

    const data: TRegionData[] | undefined = regions.map(r => {
        const mapNameId = idToMapId(r.name);
        const name = idToRegionName(r.name);
        const stats : TDayStatistics[] = [];
        const itemsCount = r.c.length;

        for (let i=0; i < itemsCount; i++) {
            const item: TDayStatistics = {
                total: r.c[i],
                death: r.d[i],
                recovered: r.r[i],
                sickness: calcSicknessValue(r.c[i], r.d[i], r.r[i]),
                sicknessDiff: 0, //will be calculated later
                sicknessNew: 0,  //will be calculated later
                sicknessNewAvg: 0,  //will be calculated later
                sicknessDiffAvg: 0,  //will be calculated later
           }
           stats.push(item);     
        }

        //calculate additional statistics
        CalculateAdditionalStatistics(stats);

        //calculate additional stat
        const lastValues = calculateLastValues(r.name, stats);


        const result: TRegionData = {
            id: r.name,
            mapNameId,
            name,
            stats,
            lastValues,
        };

        return result;
    });

    return {
        startDate: new Date(startDate),
        data
    };
}

export function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}

function CalculateAdditionalStatistics(st: TDayStatistics[]) {
    for(let i=1; i<st.length; i++){
        st[i].sicknessDiff = calcSicnkessDiff(st[i], st[i-1]);
        st[i].sicknessNew = calcSicnkessNew(st[i], st[i-1]);
    }

    for(let i=6; i<st.length; i++){
        st[i].sicknessNewAvg = calcSicnkessNewAvg([st[i], st[i-1], st[i-2], st[i-3], st[i-4], st[i-5], st[i-6]]);
        st[i].sicknessDiffAvg = calcSicnkessDiffAvg([st[i], st[i-1], st[i-2], st[i-3], st[i-4], st[i-5], st[i-6]]);
    }
}

function calcSicknessValue(total: number, death: number, recovered: number): number {
    return (total - recovered - death);
}
function calcSicnkessDiff(st:TDayStatistics, prevSt: TDayStatistics): number {
    if (!prevSt) return st.sickness;
    return st.sickness - prevSt.sickness;
}

function calcSicnkessNew(st:TDayStatistics, prevSt: TDayStatistics) 
{
    if (!prevSt) return 0;

    const sickDiff = st.sickness - prevSt.sickness;
    const deathDiff = st.death - prevSt.death;
    const recoveredDiff = st.recovered - prevSt.recovered;
    
    return sickDiff + recoveredDiff + deathDiff;
}

function calcSicnkessNewAvg(st:TDayStatistics[]): number {
    if (st.findIndex(r=> !r) > 0) return 0;

    const reducer = (sum: number, item: TDayStatistics) => sum + item.sicknessNew;
    const sum = st.reduce<number>(reducer, 0);
    
    return  Math.round(sum / st.length);
}

function calcSicnkessDiffAvg(st:TDayStatistics[]): number {
    if (st.findIndex(r=> !r) > 0) return 0;

    const reducer = (sum: number, item: TDayStatistics) => sum + item.sicknessDiff;
    const sum = st.reduce<number>(reducer, 0);
    
    return  Math.round(sum / st.length);
}
function calculateLastValues(regionId: string, stats: TDayStatistics[]) : TLastValues {
    const sickness = stats[stats.length-1].sickness;
    const population = getPopulationValue(regionId); 

    const result : TLastValues = {
        sickness,
        sicknessDencity: Math.round(sickness / population.total * 1000000),
        sicknessCityDencity : Math.round(sickness / population.city * 1000000),
    }

    return result;
}

