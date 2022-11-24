import { getDriverData } from "../src/server";

test("current driver lineup", async () => {
    expect(await getDriverData()).toMatchSnapshot();
});
