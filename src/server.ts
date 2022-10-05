import { getDriverData } from "./scraper/driver-data";
import { getTeamsData } from "./scraper/team-data";
import { getDriverStandings } from "./scraper/driver-standings";
import { getConstructorStandings } from './scraper/constructors-standings';

const printDriverData = async (): Promise<void> => {
    const f1Drivers = await getConstructorStandings(2003)
    console.log(f1Drivers)
}

printDriverData()

export {
    getDriverData,
    getTeamsData,
    getDriverStandings,
    getConstructorStandings
}