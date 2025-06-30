interface staticLinks {
    drivers: string;
    teams: string;
    hallOfFame: string;
    teamsPoints: string;
}

interface dynamicLinks {
    rootLink: string;
    driverStandings: string;
    constructorStandings: string;
    results: string;
    fastestLap: string;
    raceSchedule: string;
}

export const staticLinks: staticLinks = {
    drivers: "https://www.formula1.com/en/drivers.html",
    teams: "https://www.formula1.com/en/teams.html",
    teamsPoints: `https://www.formula1.com/en/results/${new Date().getFullYear()}/team`,
    hallOfFame: "https://www.formula1.com/en/drivers/hall-of-fame.html",
};

export const dynamicLinks: dynamicLinks = {
    rootLink: "https://www.formula1.com/en/results.html",
    driverStandings: "drivers.html",
    constructorStandings: "team.html",
    results: "races.html",
    fastestLap: "fastest-laps.html",
    // raceSchedule: "https://www.formula1.com/en/racing/2022.html",
    raceSchedule: "https://www.formula1.com/en/racing",
};
