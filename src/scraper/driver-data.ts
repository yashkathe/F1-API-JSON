import axios from 'axios'
import cheerio from 'cheerio'

import { links } from '../links/links'

interface drivers {
    name: string
    team: string
    rank: number
    points: number
    nationalityImage: string | undefined
    driverImage: string | undefined
}

export function driverData() {

    let driversArray: drivers[] = []

    axios(links.drivers).then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('fieldset').each(
            function () {
                const firstName: string = $(this).find('.container > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)').text().trim()
                const secondName: string = $(this).find('.container > div:nth-child(1) > div:nth-child(1) > span:nth-child(2)').text().trim()
                const team: string = $(this).find(' p:nth-child(3)').text()
                const rank: number = parseInt($(this).find('.rank').text())
                const points: number = parseInt($(this).find('.points > div:nth-child(1)').text())
                const nationalityImage: string | undefined = $(this).find('.container > .row.justify-content-between.align-items-center.listing-item--head > .col-xs-4.country-flag > picture:nth-child(1) > img:nth-child(2)').attr('data-src')
                const driverImage: string | undefined = $(this).find(' div:nth-child(4) > picture:nth-child(1) > img:nth-child(2)').attr('data-src')

                if (firstName.length !== 0 && secondName.length !== 0 && team.length !== 0 && rank !== NaN && points !== NaN) {
                    const driversObj: drivers = {
                        name: firstName.concat(" ", secondName),
                        team,
                        rank,
                        points,
                        nationalityImage,
                        driverImage
                    }

                    driversArray.push(driversObj)

                }
            }
        )

        console.log(driversArray)

    })
}