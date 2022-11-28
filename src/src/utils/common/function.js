import { getMessageCatlogValue } from 'atp-multilingual';
// import { checkWithIdm } from 'atp-casbin';

export function objectValueFinder(theme, key) {
    if (!theme || !key) return null;
    try {
        const json = JSON.parse(theme);
        const keys = key.split(" ");
        const lastKey = keys.pop();
        const lastObj = keys.reduce((json, key) => {
            return (json[key] = json[key] ?? {});
        }, json);

        if (lastObj[lastKey]) {
            return lastObj[lastKey]
        } else {
            return undefined
        }
    } catch (e) {
        console.log('invalid json');
        return undefined
    }
}


export const messageCatalogGetter = (title) => {
    let result = getMessageCatlogValue(title, localStorage.language ?? "English");
    if (result.length > 0) {
        return result;
    } else {
        return null;
    }
}