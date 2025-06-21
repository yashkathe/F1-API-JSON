import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { getResultURL } from "../utils/scrapping";

export async function getFullQualiResults(year: number = new Date().getFullYear(), raceName: string = "Australia") {
    try {
        const resultsURL = await getResultURL(year, raceName);
        console.log(`${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`);
        const results = await axios(`${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`);
        // const raceResults: isFullRaceResult[] = [];
        const $ = cheerio.load(results.data);
        $(".f1-table > tbody > tr").each(function () {
            const driver = $(this)
                .find("td p")
                .map((_i, el) => $(el).text())
                .get();
        });
    } catch (error: any) {
        throw new Error(error);
    }
}
