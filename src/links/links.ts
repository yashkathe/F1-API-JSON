interface staticLinks {
    drivers: string
    teams: string
}

interface dynamicLinks {
    driverStandings_1: string
    driverStandings_2: string
    constructorStandings_1: string
    constructorStandings_2: string
}

export const staticLinks: staticLinks = {
    drivers: "https://www.formula1.com/en/drivers.html",
    teams: "https://www.formula1.com/en/teams.html",
}

export const dynamicLinks: dynamicLinks = {
    driverStandings_1: "https://www.formula1.com/en/results.html",
    driverStandings_2: "drivers.html",
    constructorStandings_1: "https://www.formula1.com/en/results.html",
    constructorStandings_2: "team.html"
}