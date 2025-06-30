import axios from "axios";
import * as cheerio from "cheerio";

import { staticLinks } from "../endpoints/endpoints";

import { isTeam } from "../types/types";

export const getTeamLineup = async (): Promise<isTeam[]> => {
    try {
        let teams: isTeam[] = [];
        const response = await axios(staticLinks.teams);
        const $ = cheerio.load(response.data);

        async function getTeamPoints(): Promise<Array<[string, number]>> {
            const response = await axios(staticLinks.teamsPoints);
            const $ = cheerio.load(response.data);

            const teamPoints: Array<[string, number]> = [];
            $(".f1-table tbody tr").each(function () {
                const teamName = $(this).find("td:nth-child(2)").text().trim();
                const points = $(this).find("td:nth-child(3)").text().trim();
                teamPoints.push([teamName, Number(points)]);
            });
            return teamPoints;
        }
        const teamsPoints = await getTeamPoints();

        $('a[data-f1rd-a7s-click="team_card_click"]').each(function () {
            const name: string = $(this).find("span:nth-child(3) > span > span:nth-child(1) > p").text().trim();
            const driver1_0: string = $(this).find("span:nth-child(3) > span > span:nth-child(1) > span > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)").text().trim();
            const driver1_1: string = $(this).find("span:nth-child(3) > span > span:nth-child(1) > span > span:nth-child(1) > span:nth-child(2) > span:nth-child(2)").text().trim();
            const driver2_0: string = $(this).find("span:nth-child(3) > span > span:nth-child(1) > span > span:nth-child(2) > span:nth-child(2) > span:nth-child(1)").text().trim();
            const driver2_1: string = $(this).find("span:nth-child(3) > span > span:nth-child(1) > span > span:nth-child(2) > span:nth-child(2) > span:nth-child(2)").text().trim();
            const driver1 = driver1_0.concat(" ", driver1_1);
            const driver2 = driver2_0.concat(" ", driver2_1);
            const drivers: string[] = [driver1, driver2];

            const carLogo: string | undefined = $(this).find("span:nth-child(3) > span > span:nth-child(2) > img").attr("src");
            const carImage: string | undefined = $(this).find("span:nth-child(3) > span:nth-child(2) > img").attr("src");

            const foundedPoints = teamsPoints.find((teamPoints) => teamPoints[0] === name);
            const points: number | undefined = foundedPoints ? foundedPoints[1] : 0;

            if (name.length !== 0) {
                const team: isTeam = {
                    name,
                    points,
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
