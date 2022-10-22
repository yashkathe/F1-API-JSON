import { getWorldChampions } from "../src/scraper/world-champions";

test("hall of fame", async () => {
    expect(await getWorldChampions()).toMatchSnapshot();
});
