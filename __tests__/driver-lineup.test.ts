import { getDriverLineups } from "../src/server";

test("current driver lineup", async () => {
    expect(await getDriverLineups()).toMatchSnapshot();
});
