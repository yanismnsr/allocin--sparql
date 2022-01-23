// Types file

export interface Movie {
    title: string,
    description: string,
    type?: string,
    director?: string,
    growth?: number,
    producer?: string,
    runtime?: number,
    starring?: Actor[],
    budget?: number,
    wikiId?: number,
    country?: string,
    language?: string,
    releaseYear?: string,
    urlThumbnail?: string,
    ranking?: number
}
export default interface Actor {
    description: string,
    name: string,
    birthDate: string,
    birthPlace: string,
    birthName: string,
    thumbnail: string,
    nationality: string
}