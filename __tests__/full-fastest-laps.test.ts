import { getFullFastestLaps } from "../src/server";

test("fastest laps", async () => {
    expect(await getFullFastestLaps(2024)).toMatchSnapshot();
});
