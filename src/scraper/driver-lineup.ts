import axios from "axios";
import cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isDriver } from "../types/types";

export const getDriverLineup = async (): Promise<isDriver[]> => {
    try {
        let drivers: isDriver[] = [];

        const response = await axios(staticLinks.drivers);
        const $ = cheerio.load(response.data);

        $("a.outline").each(function () {
            const firstName: string = $(this).find("div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > h4:nth-child(1) > div:nth-child(1) > p:nth-child(1)").text().trim();
            const secondName: string = $(this).find("div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > h4:nth-child(1) > div:nth-child(1) > p:nth-child(2)").text().trim();
            const team: string = $(this).find("div:nth-child(1) > div:nth-child(1) > p:nth-child(5)").text();
            const rank: string | undefined = $(this).find("div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)").text().trim();
            const nationalityImage: string | undefined = $(this).find("div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > img:nth-child(2)").attr("src");
            const driverImage: string | undefined = $(this).find("div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > img:nth-child(2)").attr("src");

            if (firstName.length !== 0 && secondName.length !== 0 && team.length !== 0) {
                const driver: isDriver = {
                    name: firstName.concat(" ", secondName),
                    team,
                    rank,
                    nationalityImage,
                    driverImage,
                };
                drivers.push(driver);
            }
        });
        if (drivers.length === 0) {
            throw new Error("No data found");
        }
        return drivers;
    } catch (error: any) {
        throw new Error(error);
    }
};
