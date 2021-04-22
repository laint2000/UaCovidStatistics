import { idToMapId, idToRegionName } from "../src/UkraineMap/UkraineMapUtils";
import { IDataItem, IStatisticData } from "./AppTypes";

export function CreateStatisticData(regions: any[], startDate: string): IStatisticData {

    const data: IDataItem[] | undefined = regions.map(r => {
        const sickness = createSicknessArray(r.c, r.d, r.r);
        const sicknessDiff = createSicnkessDiff(sickness);
        const sicknessNew = createSicnkessNew(sickness, r.d, r.r);
        const mapNameId = idToMapId(r.name);
        const name = idToRegionName(r.name);

        const result: IDataItem = {
            id: r.name,
            mapNameId,
            name,
            total: r.c,
            death: r.d,
            recovered: r.r,
            sickness,
            sicknessDiff,
            sicknessNew,
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

function createSicknessArray(total: number[], death: number[], recovered: number[]): number[] {
    var result: number[] = [];

    for (let i = 0; i < recovered.length; i++) {
        result[i] = total[i] - recovered[i] - death[i];
    }

    return result;
}
function createSicnkessDiff(sick: number[]): number[] {
    var result: number[] = [];
    result[0] = 0;

    for (let i = 1; i < sick.length; i++) {
        result[i] = sick[i] - sick[i - 1];
    }

    return result;
}

function createSicnkessNew(sick: number[], death: number[], recovered: number[]) {
    var result: number[] = [];
    result[0] = 0;

    for (let i = 1; i < sick.length; i++) {
        const sickDiff = sick[i] - sick[i - 1];
        const deathDiff = death[i] - death[i - 1];
        const recoveredDiff = recovered[i] - recovered[i - 1];
        
        result[i] = sickDiff + recoveredDiff + deathDiff;
    }

    return result;
}

