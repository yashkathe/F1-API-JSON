import { getFastestLaps } from "../src/server";

test("fastest laps", async () => {
    expect(await getFastestLaps(2024)).toMatchSnapshot();
});
