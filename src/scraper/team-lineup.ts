import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isTeam } from "../types/types";

export const getTeamLineup = async (): Promise<isTeam[]> => {
    try {
        let teams: isTeam[] = [];

        const response = await axios(staticLinks.teams);
        const $ = cheerio.load(response.data);

        $("a.group").each(function() {
            const name: string = $(this).find("div > div:nth-child(3) > div:nth-child(1) > span:nth-child(1)").text();
            const driver1_0: string = $(this).find("div > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)").text();
            const driver1_1: string = $(this).find("div > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)").text();
            const driver2_0: string = $(this).find("div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)").text();
            const driver2_1: string = $(this).find("div > div:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)").text();
            const driver1 = driver1_0.concat(" ", driver1_1);
            const driver2 = driver2_0.concat(" ", driver2_1);
            const drivers: string[] = [driver1, driver2];

            const carLogo: string | undefined = $(this).find("div > div:nth-child(3) > img:nth-child(2)").attr("src");
            const carImage: string | undefined = $(this).find("div > div:nth-child(6) > img:nth-child(1)").attr("src");

            const points: string | undefined = $(this).find("div> div:nth-child(1) > div:nth-child(2) > p:nth-child(1)").text();

            if (name.length !== 0) {
                const team: isTeam = {
                    name,
                    points: parseInt(points),
                    drivers,
                    carLogo,
                    carImage,
                };
                teams.push(team);
            }
        });
        if (teams.length === 0) {
            throw new Error(" No data found");
        }
        return teams;
    } catch (error: any) {
        throw new Error(error);
    }
};
