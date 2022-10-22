import { getConstructorStandings } from "../src/scraper/constructors-standings";

test("constrcutor standings", async () => {
    expect(await getConstructorStandings()).toMatchSnapshot();
});
