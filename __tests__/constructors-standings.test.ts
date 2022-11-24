import { getConstructorStandings } from "../src/server";

test("constrcutor standings", async () => {
    expect(await getConstructorStandings()).toMatchSnapshot();
});
