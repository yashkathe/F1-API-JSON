import axios from "axios";
import cheerio from "cheerio"

import { links } from "../links/links"

interface teams {
    name: string
    drivers: string[]
    points: number
    rank: number
    carLogo: string | undefined
    carImage: string | undefined
}

export function getTeamsData() {

    let teamsArray: teams[] = []

    axios(links.teams).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('fieldset').each(
            function () {
                const name: string = $(this).find(' div:nth-child(1) > .listing-info > .name.f1-bold--m > .f1-color--black').text()
                const points: number = parseInt($(this).find('.points > div:nth-child(1)').text())
                const rank: number = parseInt($(this).find('.rank').text())

                const driver1_0: string = $(this).find(' div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text()
                const driver1_1: string = $(this).find(' div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)').text()
                const driver2_0: string = $(this).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)').text()
                const driver2_1: string = $(this).find('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2)').text()
                const driver1 = driver1_0.concat(" ", driver1_1)
                const driver2 = driver2_0.concat(" ", driver2_1)
                const drivers: string[] = [driver1, driver2]

                const carLogo: string | undefined = $(this).find('div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > picture:nth-child(1) > img:nth-child(2)').attr('data-src')
                const carImage: string | undefined = $(this).find('div:nth-child(1) > div:nth-child(4) > picture:nth-child(1) > img:nth-child(5)').attr('data-src')

                if (name.length !== 0 && points !== NaN && rank !== NaN) {
                    const teamObj: teams = {
                        name,
                        drivers,
                        points,
                        rank,
                        carLogo,
                        carImage,
                    }
                    teamsArray.push(teamObj)
                }
            })
        console.log(teamsArray)
    })
}