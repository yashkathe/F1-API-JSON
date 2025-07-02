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
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}

export async function getF1Table(url: string, callback: (driver: string[]) => object): Promise<Array<object>> {
    try {
        const results = await axios(url);
        const resultTable: Array<object> = [];
        const $ = cheerio.load(results.data);
        $(".f1-table > tbody > tr").each(function () {
            const driver = $(this)
                .find("td p")
                .map((_i, el) => $(el).text())
                .get();

            if (driver.length < 2) throw Error("Data from table can't be loaded");

            resultTable.push(callback(driver));
        });
        return resultTable;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
