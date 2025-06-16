import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isFullRaceResult } from "../types/types";
import { getResultURL } from "../utils/scrapping";
import { validateScrapedResult } from "../utils/validation";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} raceName
 * @returns
 */

export const getFullRaceResults = async (year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullRaceResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);

        const results = await axios(`${staticLinks.fullResults}/${year}/${resultsURL}`);
        const raceResults: isFullRaceResult[] = [];
        const $ = cheerio.load(results.data);
        $(".f1-table > tbody > tr").each(function () {
            const driver = $(this)
                .find("td p")
                .map((_i, el) => $(el).text())
                .get();

            if (!validateScrapedResult(driver)) throw Error("Data cannot be scraped");
            raceResults.push({
                name: driver[2].slice(0, driver[2].length - 3),
                driverCode: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                laps: Number(driver[4]),
                time: driver[5],
                points: Number(driver[6]),
                number: Number(driver[1]),
            });
        });
        return raceResults;
    } catch (error: any) {
        throw new Error(error);
    }
};
