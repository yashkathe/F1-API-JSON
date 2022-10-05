import axios from "axios"
import cheerio from "cheerio"

import { dynamicLinks } from "../endpoints/endpoints"

interface constructorStanding {
    position: number
    team: string
    points: number
}

export const getConstructorStandings = (year: number): Promise<constructorStanding[]> => {

    let constructorStandings: constructorStanding[] = []

    return new Promise((resolve, reject) => {
        axios(`${dynamicLinks.constructorStandings_1}/${year}/${dynamicLinks.constructorStandings_2}`)
            .then(
                response => {
                    const html = response.data
                    const $ = cheerio.load(html)

                    $('tr').each(
                        function () {
                            const position: number = parseInt($(this).find('td:nth-child(2)').text().trim())
                            const team: string = $(this).find('td:nth-child(3)').text().trim()
                            const points: number = parseInt($(this).find('td:nth-child(4)').text().trim())

                            if (position !== NaN && team.length !== 0 && points !== NaN) {
                                const constructorStanding: constructorStanding = {
                                    position,
                                    team,
                                    points
                                }
                                constructorStandings.push(constructorStanding)
                            }
                        })
                    resolve(constructorStandings)
                    return Promise.all(constructorStandings)
                })
            .catch(err => { reject(err) })
    })

}