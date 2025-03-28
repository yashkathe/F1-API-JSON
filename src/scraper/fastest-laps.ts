import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isFastestLap } from "../types/types";

export const getFastestLaps = async (year: number = new Date().getFullYear()): Promise<isFastestLap[]> => {
    try {
        let fastestLaps: isFastestLap[] = [];

        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.fastestLap}`);
        const $ = cheerio.load(response.data);

        $(".f1-table > tbody:nth-child(2) > tr").each(function () {
            const grandPrix: string = $(this).find("td:nth-child(1) > p:nth-child(1)").text().trim();
            const driverFirstName: string = $(this).find("td:nth-child(2) > p:nth-child(1) > span:nth-child(1)").text().trim();
            const driverLastName: string = $(this).find("td:nth-child(2) > p:nth-child(1) > span:nth-child(2)").text().trim();
            const car: string = $(this).find("td:nth-child(3) > p:nth-child(1)").text().trim();
            const time: string = $(this).find("td:nth-child(4) > p:nth-child(1)").text().trim();

            const driver: string = driverFirstName.concat(" ", driverLastName);

            console.log(driver, grandPrix, car, time);

            if (driver.length !== 0 && grandPrix.length !== 0 && car.length !== 0 && time.length !== 0) {
                const fastestLap: isFastestLap = {
                    driver,
                    grandPrix,
                    car,
                    time,
                };

                fastestLaps.push(fastestLap);
            }
        });

        if (fastestLaps.length === 0) {
            throw new Error("No data found");
        }

        return fastestLaps;
    } catch (error: any) {
        throw new Error(error);
    }
};
