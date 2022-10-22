export type constructorStanding = {
    position: number
    team: string
    points: number
}

export type drivers = {
    name: string
    team: string
    rank: number
    points: number
    nationalityImage: string | undefined
    driverImage: string | undefined
}

export type driverStanding = {
    position: number
    driver: string
    nationality: string
    team: string
    points: number
}

export type teams = {
    name: string
    drivers: string[]
    points: number
    rank: number
    carLogo: string | undefined
    carImage: string | undefined
}

export type hallOfFame = {
    name: string
    years: number[]
}