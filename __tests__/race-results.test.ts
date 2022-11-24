import { getRaceResults } from "../src/server";

test("get race results", async () => {
    expect(await getRaceResults(2000)).toMatchSnapshot();
});
