import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isRaceResult } from "../types/types";

export const getRaceResults = async (year: number = new Date().getFullYear()): Promise<isRaceResult[]> => {
    try {
        let raceResults: isRaceResult[] = [];

        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.results}`);
        const $ = cheerio.load(response.data);

        $(".f1-table > tbody:nth-child(2) > tr").each(function() {
            const grandPrix: string = $(this).find("td:nth-child(1) > p:nth-child(1) > a:nth-child(1)").text().trim();
            const raceDate: string = $(this).find("td:nth-child(2) > p:nth-child(1)").text().trim();
            const driverFirstName: string = $(this).find("td:nth-child(3) > p:nth-child(1) > span:nth-child(1)").text().trim()
            const driverLastName: string = $(this).find("td:nth-child(3) > p:nth-child(1) > span:nth-child(2)").text().trim()
            const winner: string = driverFirstName.concat(" ", driverLastName);
            const car: string = $(this).find("td:nth-child(4) > p:nth-child(1)").text().trim();
            const laps: number = parseInt($(this).find("td:nth-child(5) > p:nth-child(1)").text().trim());
            const time: string = $(this).find("td:nth-child(6) > p:nth-child(1)").text().trim();

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
