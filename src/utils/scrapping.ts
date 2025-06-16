import axios from "axios";
import { dynamicLinks } from "../endpoints/endpoints";
import * as cheerio from "cheerio";

export async function getResultURL(year: number = new Date().getFullYear(), raceName: string) {
    try {
        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.results}`);

        const $ = cheerio.load(response.data);
        const allResults = $(".f1-table tbody td > p > a")
            .map((i, el) => $(el).attr("href"))
            .get();
        const URL = allResults.find((el) => el.includes(raceName.toLowerCase()));

        if (!URL) throw "No data found";
        return URL;
    } catch (error: any) {
        throw new Error(error);
    }
}
