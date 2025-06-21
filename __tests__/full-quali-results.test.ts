import { getFullQualiResults } from "../src/server";

test("get full quali results", async () => {
    expect(await getFullQualiResults(2008, "Great-Britain")).toMatchSnapshot();
});
