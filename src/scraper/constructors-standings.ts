import axios from "axios"
import cheerio from "cheerio"

import { dynamicLinks } from "../endpoints/endpoints"

import {constructorStanding} from "../types/types"

export const getConstructorStandings = (year: number = new Date().getFullYear()): Promise<constructorStanding[]> => {

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

                            if (!Number.isNaN(position) && team.length !== 0 && !Number.isNaN(points)) {
                                const constructorStanding: constructorStanding = {
                                    position,
                                    team,
                                    points
                                }
                                constructorStandings.push(constructorStanding)
                            }
                        })
                    resolve(constructorStandings)
                })
            .catch(err => { reject(err) })
    })

}