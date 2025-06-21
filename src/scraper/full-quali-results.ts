import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { getF1Table, getResultURL } from "../utils/scrapping";
import { assignPropertyIfDefined } from "../utils/common";
import { fullQualiResult, isFullQualiResult, qualiPartResult, qualiTimes } from "../types/types";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullQualiResult[]>}
 */

export async function getFullQualiResults(year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullQualiResult[]> {
    try {
        const resultsURL = await getResultURL(year, raceName);

        let qualiResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`;
        //Before 1996 there was two quali sessions
        if (year < 1996) qualiResultsURL += "/0";

        function assignTableValues(driver: string[]): fullQualiResult {
            const driverDetails: fullQualiResult = {
                position: driver[0],
                number: parseInt(driver[1]),
                name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                times: assignPropertyIfDefined([driver[4], driver.length > 6 ? driver[5] : false, driver.length > 7 ? driver[6] : false], ["q1", "q2", "q3"]) as qualiTimes,
                laps: parseInt(driver[driver.length - 1]),
            };

            return driverDetails;
        }
        const qualiSummary = (await getF1Table(qualiResultsURL, assignTableValues)) as unknown as fullQualiResult[];
        let summarizedQuali: isFullQualiResult[] = [];

        if (year < 1996) {
            //Getting both sessions results
            const quali1ResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying/1`;
            const quali2ResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying/2`;

            function assignOnlyTimeAndNumber(driver: string[]): qualiPartResult {
                return {
                    position: driver[0],
                    time: driver[4],
                    number: parseInt(driver[1]),
                };
            }

            const quali1 = (await getF1Table(quali1ResultsURL, assignOnlyTimeAndNumber)) as unknown as qualiPartResult[];
            const quali2 = (await getF1Table(quali2ResultsURL, assignOnlyTimeAndNumber)) as unknown as qualiPartResult[];

            //Assigning times to driver
            summarizedQuali = qualiSummary.map((qualiSummaryDriver: fullQualiResult): isFullQualiResult => {
                const quali2Times = quali2.find((driver: qualiPartResult) => driver.number === qualiSummaryDriver.number)?.time;
                const quali1Times = quali1.find((driver: qualiPartResult) => driver.number === qualiSummaryDriver.number)?.time;

                const summarizedTimes = assignPropertyIfDefined([quali1Times, quali2Times, qualiSummaryDriver.times.q1], ["quali1", "quali2", "qualiSummary"]);

                return {
                    ...qualiSummaryDriver,
                    times: summarizedTimes,
                };
            });
            return summarizedQuali;
        }
        return qualiSummary;
    } catch (error: any) {
        throw new Error(error);
    }
}
