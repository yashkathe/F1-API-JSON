import { getFastestLaps } from "../src/server";

test("fastest laps", async () => {
    expect(await getFastestLaps()).toMatchSnapshot();
});
