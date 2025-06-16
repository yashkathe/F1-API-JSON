import axios from "axios";
import * as cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isRaceSchedule } from "../types/types";

export const getRaceSchedule = async (year: number = new Date().getFullYear()): Promise<isRaceSchedule[]> => {
    try {
        let raceSchedule: isRaceSchedule[] = [];

        const response = await axios(`${dynamicLinks.raceSchedule}/${year}.html`);
        const $ = cheerio.load(response.data);

        $("a.outline-offset-4").each(function () {
            const round: string = $(this).find("a.outline-offset-4 > fieldset:nth-child(1) > legend:nth-child(1) > p:nth-child(1)").text().trim();
            const dateDays1: string = $(this).find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1)").text().trim();
            const dateDays2: string = $(this).find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1) > span:nth-child(1)").text().trim();
            const dateMonth1: string = $(this).find("div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1) > span:nth-child(1)").text().trim();
            const dateMonth2: string = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1) > span:nth-child(1)")
                .text()
                .trim();
            const raceCountry: string = $(this)
                .find("a.outline-offset-4 > fieldset:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1)")
                .text()
                .trim();
            const eventTitle: string = $(this)
                .find("a.outline-offset-4 > fieldset:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > p:nth-child(1)")
                .text()
                .trim();

            const dateDays = dateDays1 || dateDays2;
            const dateMonth = dateMonth1 || dateMonth2;

            if (round !== undefined && raceCountry !== undefined && eventTitle !== undefined) {
                const singleSchedule = {
                    round,
                    date: dateDays.concat("", dateMonth),
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
    } catch (error: any) {
        throw new Error(error);
    }
};

getRaceSchedule(2024);
