import axios from "axios";
import cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { drivers } from "../types/types";

export const getDriverData = (): Promise<drivers[]> => {
    try {
        let drivers: drivers[] = [];

        return new Promise(async (resolve, reject) => {
            const response = await axios(staticLinks.drivers);
            const $ = cheerio.load(response.data);

            $("fieldset").each(function () {
                const firstName: string = $(this).find(".container > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)").text().trim();
                const secondName: string = $(this).find(".container > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)").text().trim();
                const team: string = $(this).find(" p:nth-child(3)").text();
                const rank: number = parseInt($(this).find(".rank").text());
                const points: number = parseInt($(this).find(".points > div:nth-child(1)").text());
                const nationalityImage: string | undefined = $(this)
                    .find(".container > .row.justify-content-between.align-items-center.listing-item--head > .col-xs-4.country-flag > picture:nth-child(1) > img:nth-child(2)")
                    .attr("data-src");
                const driverImage: string | undefined = $(this).find(" div:nth-child(4) > picture:nth-child(1) > img:nth-child(2)").attr("data-src");

                if (firstName.length !== 0 && secondName.length !== 0 && team.length !== 0 && !Number.isNaN(rank) && !Number.isNaN(points)) {
                    const driver: drivers = {
                        name: firstName.concat(" ", secondName),
                        team,
                        rank,
                        points,
                        nationalityImage,
                        driverImage,
                    };
                    drivers.push(driver);
                }
            });
            resolve(drivers);
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
