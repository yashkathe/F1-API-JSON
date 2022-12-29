import { getTeamLineups } from "../src/server";

test("current teams data", async () => {
    expect(await getTeamLineups()).toMatchSnapshot();
});
