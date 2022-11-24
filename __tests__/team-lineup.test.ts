import { getTeamsData } from "../src/server";

test("current teams data", async () => {
    expect(await getTeamsData()).toMatchSnapshot();
});
