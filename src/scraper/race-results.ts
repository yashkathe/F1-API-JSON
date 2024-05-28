import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isRaceResult } from "../types/types";

export const getRaceResults = async (year: number = new Date().getFullYear()): Promise<isRaceResult[]> => {
    try {
        let raceResults: isRaceResult[] = [];

        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.results}`);
        const $ = cheerio.load(response.data);

        $("tr").each(function () {
            const grandPrix: string = $(this).find("td:nth-child(2) > a:nth-child(1)").text().trim();
            const raceDate: string = $(this).find("td:nth-child(3)").text().trim();
            const winner: string = $(this).find("td:nth-child(4) > span:nth-child(2)").text().trim();
            const car: string = $(this).find("td:nth-child(5)").text().trim();
            const laps: number = parseInt($(this).find("td:nth-child(6)").text().trim());
            const time: string = $(this).find("td:nth-child(7)").text().trim();

            if ((grandPrix.length !== 0 && raceDate.length !== 0 && winner.length !== 0, car.length !== 0, !Number.isNaN(laps), time.length !== 0)) {
                const raceResult: isRaceResult = {
                    grandPrix,
                    date: new Date(raceDate),
                    winner,
                    car,
                    laps,
                    time,
                };
                raceResults.push(raceResult);
            }
        });
        if (raceResults.length === 0) {
            throw new Error(" No data found");
        }
        return raceResults;
    } catch (error: any) {
        throw new Error(error);
    }
};
