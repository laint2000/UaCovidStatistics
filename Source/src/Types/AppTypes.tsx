export interface IStatisticData {
    startDate: Date;
    data: TRegionData[];
}

export type TRegionData = {
    id: string,
    mapNameId: string,
    name: string,
    stats: TDayStatistics[],
}

export type TDayStatistics = {
    total: number,
    death: number,
    recovered: number,
    sickness: number,
    sicknessDiff: number,
    sicknessNew: number,
    sicknessNewAvg: number,
    sicknessDiffAvg: number,
}


export const initialStatisticData: IStatisticData = {
    startDate: new Date(),
    data: []
} 