import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { getF1Table, getResultURL } from "../utils/scrapping";
import { assignPropertyIfDefined } from "../utils/common";
import { isFullQualiResult, qualiTimes } from "../types/types";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullQualiResult[]>}
 */

export async function getFullQualiResults(year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullQualiResult[]> {
    try {
        const resultsURL = await getResultURL(year, raceName);

        const qualiResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`;
        function assignTableValues(driver: string[]): isFullQualiResult {
            return {
                position: driver[0],
                number: parseInt(driver[1]),
                name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                times: assignPropertyIfDefined([driver[4], driver[6] ? driver[5] : false, driver[7] ? driver[6] : false], ["q1", "q2", "q3"]) as qualiTimes,
                laps: parseInt(driver[driver.length - 1]),
            };
        }
        return getF1Table(qualiResultsURL, assignTableValues) as unknown as isFullQualiResult[];
    } catch (error: any) {
        throw new Error(error);
    }
}
