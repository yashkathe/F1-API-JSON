import axios from "axios";
import * as cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isRaceSchedule } from "../types/types";

export const getRaceSchedule = async (year: number = new Date().getFullYear()): Promise<isRaceSchedule[]> => {
    try {
        const raceSchedule: isRaceSchedule[] = [];

        const response = await axios(`${dynamicLinks.raceSchedule}/${year}.html`);
        const $ = cheerio.load(response.data);

        $("a.group").each(function () {
            let round: string = $(this).find("div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)").text().trim();
            let date: string = $(this).find("div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2)").contents().get()[1];
            date = $(date).text();

            let eventTitle: string = $(this).find("div:nth-child(1) > div:nth-child(1) > span:nth-child(3)").text().trim();
            let raceCountry: string = $(this).find("div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > p:nth-child(2)").text().trim();

            //Semantics differ for the next race
            if (round === "") {
                round = $(this).find("div:nth-child(1) > div:nth-child(2) > span:nth-child(1) > span:nth-child(1)").text().trim();
            }

            //Yes four differ semantics
            const dateGetPath: string[] = [
                "div:nth-child(1) > div:nth-child(1) > span:nth-child(4)",
                "div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > span:nth-child(1)",
                "div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > span:nth-child(1)",
            ];
            let i = 0;
            while (date === "") {
                date = $(this).find(dateGetPath[i++]).text().trim();
            }

            //Semantics differ for the next race
            if (eventTitle === "") eventTitle = $(this).find("div:nth-child(1) > div:nth-child(2) > span:nth-child(3)").text().trim();

            //Semantics differ for the next race
            if (raceCountry === "") raceCountry = $(this).find("div:nth-child(1) > div:nth-child(2) > span:nth-child(2) > p:nth-child(2)").text().trim();

            date = date.replaceAll(" ", "");

            //Cross-month
            if (date.length > 8) {
                const dateParts: string[] = [date.slice(0, 2), date.slice(2, 5), date.slice(6, 8), date.slice(8, 13)];
                date = `${dateParts[0]}-${dateParts[2]}${dateParts[1]}-${dateParts[3]}`;
            }

            if (round !== undefined && raceCountry !== undefined && eventTitle !== undefined) {
                const singleSchedule = {
                    round,
                    date,
                    raceCountry,
                    eventTitle,
                };
                raceSchedule.push(singleSchedule);
            }
        });

        if (raceSchedule.length === 0) {
            throw new Error(" No data found");
        }
        return raceSchedule;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
