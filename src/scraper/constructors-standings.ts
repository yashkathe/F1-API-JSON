import axios from "axios";
import * as cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { isConstructorStanding } from "../types/types";

export const getConstructorStandings = async (year: number = new Date().getFullYear()): Promise<isConstructorStanding[]> => {
    try {
        const constructorStandings: isConstructorStanding[] = [];

        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.constructorStandings}`);
        const $ = cheerio.load(response.data);
        $(".f1-table > tbody:nth-child(2) > tr").each(function () {
            const position: number = parseInt($(this).find("td:nth-child(1) > p:nth-child(1)").text().trim());
            const team: string = $(this).find("td:nth-child(2) > p:nth-child(1)").text().trim();
            const points: number = parseInt($(this).find("td:nth-child(3) > p:nth-child(1)").text().trim());

            if (!Number.isNaN(position) && team.length !== 0 && !Number.isNaN(points)) {
                const constructorStanding: isConstructorStanding = {
                    position,
                    team,
                    points,
                };
                constructorStandings.push(constructorStanding);
            }
        });
        if (constructorStandings.length === 0) {
            throw new Error(" No data found");
        }
        return constructorStandings;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
