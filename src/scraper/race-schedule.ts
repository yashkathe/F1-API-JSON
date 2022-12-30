import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isRaceSchedule } from "../types/types";

export const getRaceSchedule = async (year: number = new Date().getFullYear()): Promise<isRaceSchedule[]> => {
    try {
        let raceSchedule: isRaceSchedule[] = [];

        const response = await axios(`${dynamicLinks.raceSchedule}/${year}.html`);
        const $ = cheerio.load(response.data);

        $("fieldset").each(function () {
            const round: string = $(this).find("legend:nth-child(1)").text().trim();
            const dateDays: string = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)")
                .text()
                .trim();
            const dateMonth: string = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)")
                .text();
            const raceCountry: string = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)")
                .text()
                .trim();
            const eventTitle: string = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)")
                .text()
                .trim();
            const trackMap: string | undefined = $(this)
                .find("div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > picture:nth-child(1) > img:nth-child(2)")
                .attr("data-src");

            if (round !== undefined && raceCountry !== undefined && eventTitle !== undefined && trackMap !== undefined) {
                const singleSchedule = {
                    round,
                    date: dateDays.concat("", dateMonth),
                    raceCountry,
                    eventTitle,
                    trackMap,
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
