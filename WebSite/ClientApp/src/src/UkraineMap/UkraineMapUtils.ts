const mapId: [string, string][] = [
    ['odessa', 'ua-my'],
    ['kherson', 'ua-ks'],
    ['kievcity', 'ua-kc'],
    ['zhytomyr', 'ua-zt'],
    ['sumy', 'ua-sm'],
    ['donetsk', 'ua-dt'],
    ['dnipropetrovsk', 'ua-dp'],
    ['kharkiv', 'ua-kk'],
    ['luhansk', 'ua-lh'],
    ['poltava', 'ua-pl'],
    ['zaporizhzhya', 'ua-zp'],
    ['sevastopol', 'ua-sc'],
    ['crimea', 'ua-kr'],
    ['chernihiv', 'ua-ch'],
    ['rivne', 'ua-rv'],
    ['chernivtsi', 'ua-cv'],
    ['ivanofrankivsk', 'ua-if'],
    ['khmelnytskyy', 'ua-km'],
    ['lviv', 'ua-lv'],
    ['ternopil', 'ua-tp'],
    ['transcarpathia', 'ua-zk'],
    ['volyn', 'ua-vo'],
    ['cherkasy', 'ua-ck'],
    ['kirovohrad', 'ua-kh'],
    ['kiev', 'ua-kv'],
    ['mykolayiv', 'ua-mk'],
    ['vinnytsya', 'ua-vi'],
];

const RegionNames: [string, string][] = [
    ['odessa', 'Одесська обл.'],
    ['kherson', 'Херсонська обл.'],
    ['kievcity', 'м. Київ'],
    ['zhytomyr', 'Житомирьска обл.'],
    ['sumy', 'Сумська обл.'],
    ['donetsk', 'Донецька обл.'],
    ['dnipropetrovsk', 'Дніпропетровська обл.'],
    ['kharkiv', 'Харківська обл.'],
    ['luhansk', 'Луганська обл.'],
    ['poltava', 'Полтавська обл.'],
    ['zaporizhzhya', 'Запоріжська обл.'],
    ['sevastopol', 'м. Севастополь'],
    ['crimea', 'Крим'],
    ['chernihiv', 'Чернігівська обл.'],
    ['rivne', 'Рівенська обл.'],
    ['chernivtsi', 'Чернівецька обл.'],
    ['ivanofrankivsk', 'Івано-Франківська обл.'],
    ['khmelnytskyy', 'Хмельницька обл.'],
    ['lviv', 'Львівська обл.'],
    ['ternopil', 'Тернопільська обл.'],
    ['transcarpathia', 'Закарпатська обл.'],
    ['volyn', 'Волинська обл.'],
    ['cherkasy', 'Черкаська обл.'],
    ['kirovohrad', 'Кіровоградська обл.'],
    ['kiev', 'Київська обл.'],
    ['mykolayiv', 'Миколаївська обл.'],
    ['vinnytsya', 'Вінницька обл.'],
];


const mapIdNameMap = new Map<string, string>(mapId);

const mapRegionNames = new Map<string, string>(RegionNames);

export const idToMapId = (id: string): string => {
    return mapIdNameMap.get(id?.toLowerCase()) || "";
}

export const idToRegionName = (id: string): string => {
    return mapRegionNames.get(id?.toLowerCase()) || "";
}