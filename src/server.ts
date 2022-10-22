import { getDriverData } from './scraper/driver-data';
export { getDriverData } from "./scraper/driver-data";
export { getTeamsData } from "./scraper/team-data";
export { getDriverStandings } from "./scraper/driver-standings";
export { getConstructorStandings } from './scraper/constructors-standings';
export { getWorldChampions } from './scraper/world-champions'

const fun = async () => {
    const a = await getDriverData()
    console.log(a)
}

fun()