import { getFullQualiResults } from "../src/server";

test("get full quali results", async () => {
    expect(await getFullQualiResults(2000, "Great-Britain")).toMatchSnapshot();
});
