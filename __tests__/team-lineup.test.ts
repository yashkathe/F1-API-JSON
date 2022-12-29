import { getTeamLineup } from "../src/server";

test("current teams data", async () => {
    expect(await getTeamLineup()).toMatchSnapshot();
});
