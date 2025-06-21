import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isHallOfFame } from "../types/types";

export const getWorldChampions = async (): Promise<isHallOfFame[]> => {
    try {
        const worldChampions: isHallOfFame[] = [];

        const response = await axios(staticLinks.hallOfFame);
        const $ = cheerio.load(response.data);

        $("div.grid:nth-child(2) > span").each(function () {
            const name: string = $(this).find("span:nth-child(2) > a > span").text().trim();
            const driver_image: string | undefined = $(this).find("span:nth-child(1) > span > img").attr("src");

            if (name.length !== 0 && driver_image?.length !== 0) {
                const worldChampion: isHallOfFame = {
                    name,
                    driver_image,
                };
                worldChampions.push(worldChampion);
            }
        });
        if (worldChampions.length === 0) {
            throw new Error(" No data found");
        }
        return worldChampions;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
