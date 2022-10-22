import { getDriverData } from "../src/scraper/driver-data";

test("current driver lineup", async () => {
    expect(await getDriverData()).toMatchSnapshot();
});
