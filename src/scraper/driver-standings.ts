import axios from "axios"
import cheerio from "cheerio"

import { dynamicLinks } from "../links/links"

interface driverStanding {
    position: number
    driver: string
    nationality: string
    car: string
    points: number
}

export function getDriverStandings(year: number) {

    let driverStandingArray: driverStanding[] = []

    axios(`${dynamicLinks.driverStanding_1}/${year}/${dynamicLinks.driverStanding_2}`).then(
        response => {
            const html = response.data
            const $ = cheerio.load(html)
            // 
            $('tr').each(
                function () {
                    const position: number = parseInt($(this).find(' td:nth-child(2) ').text())

                    const firstName: string = $(this).find(' a.dark.bold.ArchiveLink > span:nth-child(1)').text()
                    const lastName: string = $(this).find(' a.dark.bold.ArchiveLink > span:nth-child(2)').text()

                    const driver = firstName.concat(" ", lastName)
                    const nationality: string = $(this).find(' td.dark.semi-bold.uppercase').text()
                    const car: string = $(this).find('td:nth-child(5) > a.grey.semi-bold.uppercase.ArchiveLink').text()
                    const points: number = parseInt($(this).find(' td:nth-child(6) ').text())

                    if (position !== NaN && points !== NaN && driver.length !== 0 && nationality.length !== 0 && car.length !== 0) {
                        const driverStandingsObj: driverStanding = {
                            position,
                            driver,
                            nationality,
                            car,
                            points
                        }
                        driverStandingArray.push(driverStandingsObj)
                    }
                })
            console.log(driverStandingArray)
        })
}