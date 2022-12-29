import axios from "axios";
import cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isHallOfFame } from "../types/types";

export const getWorldChampions = async (): Promise<isHallOfFame[]> => {
    try {
        let worldChampions: isHallOfFame[] = [];

        const response = await axios(staticLinks.hallOfFame);
        const $ = cheerio.load(response.data);

        $("article").each(function () {
            const years: number[] = [];

            const name: string = $(this).find("section > h4").text().trim().split("-")[0];
            $(this)
                .find("section > h4")
                .text()
                .trim()
                .split("-")[1]
                .split(",")
                .forEach((x) => {
                    if (x) {
                        const year: number = parseInt(x);
                        years.push(year);
                    }
                });

            if (name.length !== 0 && years.length !== 0) {
                const worldChampion: isHallOfFame = {
                    name,
                    years,
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
