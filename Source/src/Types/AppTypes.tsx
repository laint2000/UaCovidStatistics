export interface IStatisticData {
    startDate: Date;
    data: IDataItem[];
}

export interface IDataItem {
    id: string,
    mapNameId: string,
    name: string,
    total: number[],
    death: number[],
    recovered: number[],
    sickness: number[];
    sicknessDiff: number[];
    sicknessNew: number[];
}


export const initialStatisticData: IStatisticData = {
    startDate: new Date(),
    data: []
} 