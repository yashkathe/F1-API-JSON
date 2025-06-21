import { getFullRaceResults } from "../src/server";

test("get race results", async () => {
    expect(await getFullRaceResults()).toMatchSnapshot();
});
