import { staticLinks } from "../endpoints/endpoints";

import { isFullRaceResult } from "../types/types";
import { getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullRaceResult[]>}
 */

export const getFullRaceResults = async (year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullRaceResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const raceResultsURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length)}`;
        function assignTableValues(driver: string[]): isFullRaceResult {
            return {
                name: driver[2].slice(0, driver[2].length - 3),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                laps: Number(driver[4]),
                time: driver[5],
                points: Number(driver[6]),
                number: Number(driver[1]),
            };
        }

        return getF1Table(raceResultsURL, assignTableValues) as unknown as isFullRaceResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
