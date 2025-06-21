import { Router } from "express";

import { driverLineUp, teamLineUp, driverStandings, constructorStandings, worldChampions, raceResults, raceSchedule, fullRaceResults } from "./endpoints-api";

const router = Router();

router.get("/getDriverLineup", driverLineUp);

router.get("/getTeamLineup", teamLineUp);

router.get("/getDriverStandings/:year", driverStandings);
router.get("/getDriverStandings", driverStandings);

router.get("/getConstructorStandings/:year", constructorStandings);
router.get("/getConstructorStandings", constructorStandings);

router.get("/getWorldChampions", worldChampions);

router.get("/getRaceResults/:year", raceResults);
router.get("/getRaceResults/", raceResults);

router.get("/getRaceSchedule/:year", raceSchedule);
router.get("/getRaceSchedule", raceSchedule);
router.get("/getFullRaceResults/:year", fullRaceResults);

export default router;
