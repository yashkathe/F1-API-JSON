import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isConstructorStanding } from "../types/types";

export const getConstructorStandings = async (year: number = new Date().getFullYear()): Promise<isConstructorStanding[]> => {
    try {
        let constructorStandings: isConstructorStanding[] = [];

        const response = await axios(`${dynamicLinks.constructorStandings_1}/${year}/${dynamicLinks.constructorStandings_2}`);
        const $ = cheerio.load(response.data);

        $("tr").each(function () {
            const position: number = parseInt($(this).find("td:nth-child(2)").text().trim());
            const team: string = $(this).find("td:nth-child(3)").text().trim();
            const points: number = parseInt($(this).find("td:nth-child(4)").text().trim());

            if (!Number.isNaN(position) && team.length !== 0 && !Number.isNaN(points)) {
                const constructorStanding: isConstructorStanding = {
                    position,
                    team,
                    points,
                };
                constructorStandings.push(constructorStanding);
            }
        });
        return constructorStandings;
    } catch (error: any) {
        throw new Error(error);
    }
};
