import { getTeamsData } from "../src/scraper/team-data"

test('current teams data' , async () => {
    expect(
        await getTeamsData()
    ).toMatchSnapshot()
})