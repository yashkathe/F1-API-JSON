import { getRaceSchedule } from "../src/server";

test("get race schedule", async () => {
    expect(await getRaceSchedule()).toMatchSnapshot();
});
