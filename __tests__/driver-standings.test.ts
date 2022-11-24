import { getDriverStandings } from "../src/server";

test("driver standings", async () => {
    expect(await getDriverStandings()).toMatchSnapshot();
});
