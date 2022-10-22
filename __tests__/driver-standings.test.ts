import { getDriverStandings } from "../src/scraper/driver-standings";

test("driver standings", async () => {
    expect(await getDriverStandings()).toMatchSnapshot();
});
