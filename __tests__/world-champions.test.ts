import { getWorldChampions } from "../src/server";

test("hall of fame", async () => {
    expect(await getWorldChampions()).toMatchSnapshot();
});
