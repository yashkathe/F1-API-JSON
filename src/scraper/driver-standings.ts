import axios from "axios"
import cheerio from "cheerio"

import { dynamicLinks } from "../endpoints/endpoints"

type driverStanding = {
    position: number
    driver: string
    nationality: string
    team: string
    points: number
}

export const getDriverStandings = (year: number = new Date().getFullYear()): Promise<driverStanding[]> => {

    let driverStandings: driverStanding[] = []

    return new Promise((resolve, reject) => {
        axios(`${dynamicLinks.driverStandings_1}/${year}/${dynamicLinks.driverStandings_2}`)
            .then(
                response => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    $('tr').each(
                        function () {
                            const position: number = parseInt($(this).find(' td:nth-child(2) ').text())

                            const firstName: string = $(this).find(' a.dark.bold.ArchiveLink > span:nth-child(1)').text()
                            const lastName: string = $(this).find(' a.dark.bold.ArchiveLink > span:nth-child(2)').text()

                            const driver = firstName.concat(" ", lastName)
                            const nationality: string = $(this).find(' td.dark.semi-bold.uppercase').text()
                            const team: string = $(this).find('td:nth-child(5) > a.grey.semi-bold.uppercase.ArchiveLink').text()
                            const points: number = parseInt($(this).find(' td:nth-child(6) ').text())

                            if (!Number.isNaN(position) && !Number.isNaN(points) && driver.length !== 0 && nationality.length !== 0 && team.length !== 0) {
                                const driverStanding: driverStanding = {
                                    position,
                                    driver,
                                    nationality,
                                    team,
                                    points
                                }
                                driverStandings.push(driverStanding)
                            }
                        })
                    resolve(driverStandings)
                })
            .catch(err => { reject(err) })
    })
}