import { staticLinks } from "../endpoints/endpoints";
import { isFullFastestLaps } from "../types/types";
import { getF1Table, getResultURL } from "../utils/scrapping";

export async function getFullFastestLaps(year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullFastestLaps[]> {
    try {
        const resultsURL = await getResultURL(year, raceName);

        const fastestLapsURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}fastest-laps`;

        function assignTableValues(driver: string[]): isFullFastestLaps {
            const driverData: isFullFastestLaps = {
                position: driver[0],
                number: Number(driver[1]),
                code: driver[2].slice(driver[2].length - 3),
                name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
                team: driver[3],
                lap: Number(driver[4]),
                timeOfDay: driver[5],
                time: driver[6],
                avgSpeed: driver[7],
            };
            //Check https://www.formula1.com/en/results/1997/races/654/australia/fastest-laps
            if (year < 1998) {
                delete driverData.timeOfDay;
                delete driverData.avgSpeed;
                driverData.time = driver[5];
            }
            //Check https://www.formula1.com/en/results/2013/races/879/australia/fastest-laps
            else if (year < 2014) {
                delete driverData.timeOfDay;
                driverData.time = driver[5];
                driverData.avgSpeed = driver[6];
            }
            return driverData;
        }

        return getF1Table(fastestLapsURL, assignTableValues) as unknown as isFullFastestLaps[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
