/**
 *
 * @param {number | string} stringToValidate
 * @returns {boolean} true if data passed a test and false if not
 */
export function numberValidation(stringToValidate: string | number): boolean {
    return !Number.isNaN(stringToValidate);
}

/**
 *
 * @param {string} stringToValidate - data to be validated
 * @param {string} allowedChars- chars that are not allowed, default = ^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$
 * @returns {boolean} - true if data passed a test and false if not
 */
export function stringValidation(stringToValidate: string, allowedChars: string = "^[a-zA-Z0-9 .,!?()&@#$%^*_-]+$"): boolean {
    const specialChars = new RegExp(allowedChars);
    return validationWithRegex(stringToValidate, specialChars);
}

/**
 *
 * @param stringToValidate - data to be validated
 * @param regex - regex pattern to validate a string
 * @returns {boolean} - true if data passed a test and false if not
 */
export function validationWithRegex(stringToValidate: string, regex: RegExp): boolean {
    if (regex.test(stringToValidate) === true) return true;
    return false;
}

/**
 *
 * @param result - array with result values
 * @returns {boolean} true if everything is ok
 */
export function validateScrapedResult(result: string[]) {
    const stringIndexes: number[] = [2, 3, 5];
    const numberIndexes: number[] = [6, 1];

    const strValResult = stringIndexes.every((index: number) => stringValidation(result[index].trim().normalize("NFKC"), "^[a-zA-Z0-9.:+ ]+$"));
    const numValResult = numberIndexes.every((index: number) => numberValidation(result[index]));

    return strValResult && numValResult;
}
