import axios from "axios";
import cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { hallOfFame } from "../types/types";

export const getWorldChampions = (): Promise<hallOfFame[]> => {
    try {
        let worldChampions: any = [];

        return new Promise(async (resolve, reject) => {
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
                    const worldChampion: hallOfFame = {
                        name,
                        years,
                    };
                    worldChampions.push(worldChampion);
                }
            });
            resolve(worldChampions);
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
