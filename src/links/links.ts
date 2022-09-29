interface staticLinks {
    drivers: string
    teams: string
}

interface dynamicLinks {
    driverStanding_1: string
    driverStanding_2: string
}

export const staticLinks: staticLinks = {
    drivers: "https://www.formula1.com/en/drivers.html",
    teams: "https://www.formula1.com/en/teams.html",
}

export const dynamicLinks: dynamicLinks = {
    driverStanding_1: "https://www.formula1.com/en/results.html",
    driverStanding_2: "drivers.html"
}