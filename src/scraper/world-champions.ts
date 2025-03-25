import axios from "axios";
import cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isHallOfFame } from "../types/types";

export const getWorldChampions = async (): Promise<isHallOfFame[]> => {
    try {
        let worldChampions: isHallOfFame[] = [];

        const response = await axios(staticLinks.hallOfFame);
        const $ = cheerio.load(response.data);

        $("div.grid:nth-child(2) > a").each(function () {

            const name: string = $(this).find("figure:nth-child(1) > figcaption:nth-child(2) > p:nth-child(1)").text().trim();
            const driver_image: string | undefined = $(this).find("figure:nth-child(1) > picture:nth-child(1) > img:nth-child(1)").attr("src")

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
    } catch (error: any) {
        throw new Error(error);
    }
};
