import { staticLinks } from "../endpoints/endpoints";
import { getResultURL } from "../utils/scrapping";

export async function getFullFastestLaps(year: number = new Date().getFullYear(), raceName: string = "Australia") {
    const resultsURL = await getResultURL(year, raceName);

    const fastestLapsURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`;
    console.log();
}
