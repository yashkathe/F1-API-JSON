import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isDriverStanding } from "../types/types";

export const getDriverStandings = async (year: number = new Date().getFullYear()): Promise<isDriverStanding[]> => {
    try {
        let driverStandings: isDriverStanding[] = [];

        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.driverStandings}`);
        const $ = cheerio.load(response.data);

        $(".f1-table > tbody:nth-child(2) > tr").each(function () {
            const position: number = parseInt($(this).find("td:nth-child(1) > p:nth-child(1)").text());
            const driver_1: string = $(this).find("td:nth-child(2) > p:nth-child(1) > a:nth-child(1) > span:nth-child(1)").text();
            const driver_2: string = $(this).find("td:nth-child(2) > p:nth-child(1) > a:nth-child(1) > span:nth-child(2)").text();
            const driver: string = driver_1.concat(" ", driver_2)
            const nationality: string = $(this).find(" td:nth-child(3) > p:nth-child(1)").text();
            const team: string = $(this).find("td:nth-child(4) > p:nth-child(1) > a:nth-child(1)").text();
            const points: number = parseInt($(this).find(" td:nth-child(5) > p:nth-child(1) ").text());

            if (!Number.isNaN(position) && !Number.isNaN(points) && driver.length !== 0 && nationality.length !== 0 && team.length !== 0) {
                const driverStanding: isDriverStanding = {
                    position,
                    driver,
                    nationality,
                    team,
                    points,
                };
                driverStandings.push(driverStanding);
            }
        });
        if (driverStandings.length === 0) {
            throw new Error(" No data found");
        }
        return driverStandings;
    } catch (error: any) {
        throw new Error(error);
    }
};
