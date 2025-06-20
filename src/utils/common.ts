/**
 *
 * @param {unknown[]} values
 * @param {string[]} keys
 * @returns {object} - object with properties from keys and values
 */
export function assignPropertyIfDefined(values: unknown[], keys: string[]): object {
    if (values.length !== keys.length) throw Error("values.length and keys.length muss be the same");
    const resultObj: Record<string, unknown> = {};
    values.forEach((value: unknown, index: number) => {
        if (value && value !== "") resultObj[keys[index]] = value;
    });
    return resultObj;
}
