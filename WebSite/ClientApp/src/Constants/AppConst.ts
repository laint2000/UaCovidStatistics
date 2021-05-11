export const getPopulationValue = (id: string): TRegionPopulation => {
    return regionPopulationMap.get(id?.toLowerCase()) || emptyValue
}

const emptyValue : TRegionPopulation = {total : 0, city : 0}; 

type TRegionPopulation = {
    total : number,
    city : number,
}

const regionNames: [string, TRegionPopulation][] = [
    ["crimea", { total: 1968550, city: 1234470}],
    ["vinnytsya", { total: 1545416, city: 799385}],
    ["volyn", { total: 1031421, city: 539179}],
    ["dnipropetrovsk", { total: 3176648, city: 2668744}],
    ["donetsk", { total: 4131808, city: 3754349}],
    ["zhytomyr", { total: 1208212, city: 716457}],
    ["transcarpathia", { total: 1253791, city: 465904}],
    ["zaporizhzhya", { total: 1687401, city: 1306231}],
    ["ivanofrankivsk", { total: 1368097, city: 606764}],	
    ["kiev", { total: 1781044, city: 1105383}],
    ["kirovohrad", { total: 933109, city: 591944}],
    ["luhansk", { total: 2135913, city: 1859590}],
    ["lviv", { total: 2512084, city: 1534040}],
    ["mykolayiv", { total: 1119862, city: 768022}],
    ["odessa", { total: 2377230, city: 1597062}],
    ["poltava", { total: 1386978, city: 867201}],
    ["rivne", { total: 1152961, city: 548088}],
    ["sumy", { total: 1068247, city: 741430}],
    ["ternopil", { total: 1038695, city: 473727}],
    ["kharkiv", { total: 2658461, city: 2158121}],
    ["kherson", { total: 1027913, city: 631317}],
    ["khmelnytskyy", { total: 1254702, city: 720752}],
    ["cherkasy", { total: 1192137, city: 678682}],
    ["chernivtsi", { total: 901632, city: 390551}],
    ["chernihiv", { total: 991294, city: 649063}],
    ["kievcity", { total: 2967360, city: 2967360}],
    ["sevastopol", { total: 385998, city: 385998}],
];

const regionPopulationMap = new Map<string, TRegionPopulation>(regionNames);

