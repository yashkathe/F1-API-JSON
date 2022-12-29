import { getDriverLineup } from "../src/server";

test("current driver lineup", async () => {
    expect(await getDriverLineup()).toMatchSnapshot();
});
