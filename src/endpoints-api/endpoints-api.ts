import { getDriverLineup } from "../scraper/driver-lineup";
import { getTeamLineup } from "../scraper/team-lineup";
import { getDriverStandings } from "../scraper/driver-standings";
import { getConstructorStandings } from "../scraper/constructors-standings";
import { getWorldChampions } from "../scraper/world-champions";
import { getRaceResults } from "../scraper/race-results";
import { getRaceSchedule } from "../scraper/race-schedule";
import { getFastestLaps } from "../scraper/fastest-laps";

import { Request, Response } from "express";
import { getFullRaceResults } from "../server";

export const driverLineUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getDriverLineup();
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const teamLineUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getTeamLineup();
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const driverStandings = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;
        const data = await getDriverStandings(parseInt(year));
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const constructorStandings = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;
        const data = await getConstructorStandings(parseInt(year));
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const worldChampions = async (req: Request, res: Response) => {
    try {
        const data = await getWorldChampions();
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const raceResults = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;

        const data = await getRaceResults(parseInt(year));
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const raceSchedule = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;

        const data = await getRaceSchedule(parseInt(year));
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const fastestLaps = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;

        const data = await getFastestLaps(parseInt(year));
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};

export const fullRaceResults = async (req: Request, res: Response) => {
    try {
        const { year } = req.params;
        const raceName = req.query.raceName as string;

        if (!raceName || !year)
            res.status(400).json({
                error: "The year must be greater than 1950 and less than or equal to the current year. The race name must be listed in the official calendar.",
            });

        const data = await getFullRaceResults(parseInt(year), raceName);
        res.json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message.toString() });
    }
};
