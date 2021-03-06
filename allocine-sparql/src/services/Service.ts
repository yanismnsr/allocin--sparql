import * as sparql from 'sparqljs'
import * as imdb from 'imdb-api'
import { textSpanOverlapsWith } from 'typescript'
import { trackPromise } from 'react-promise-tracker'

export class Service {
    private static instance: Service

    // Sparql service classes
    private sparqlGenerator: sparql.SparqlGenerator
    private sparqlParser: sparql.SparqlParser

    private constructor() {
        this.sparqlGenerator = new sparql.Generator()
        this.sparqlParser = new sparql.Parser()
    }

    public static GetInstance() {
        if (!Service.instance) {
            Service.instance = new Service()
        }
        return Service.instance
    }

    public async fetchMovie(q: any, p: any) {
        const prefixes: string[] = [
            'PREFIX dbo: <http://dbpedia.org/ontology/>',
            'PREFIX dbpedia2: <http://dbpedia.org/property/>',
            'PREFIX dct: <http://purl.org/dc/terms/>',
            'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>',
            'PREFIX dbpedia: <http://dbpedia.org/resource/>',
            'PREFIX dbt: <http://dbpedia.org/datatype/>',
        ]

        const query =
            prefixes.join('\n') +
            'SELECT *  WHERE {' +
            '?movie a <http://dbpedia.org/ontology/Film> .' +
            setCriterias(q) +
            movieParameters() +
            '}' +
            setPaginations(p)

        console.log(query)
        const parsedQuery = this.sparqlParser.parse(query)

        const stringQuery = this.sparqlGenerator.stringify(parsedQuery)
        console.log(stringQuery)

        // Make request to dbpedia
        const response = await trackPromise(
            fetch(
                `http://dbpedia.org/sparql?query=${encodeURIComponent(
                    stringQuery
                )}&format=json`
            )
        )
        const json = await response.json()
        console.log(json)

        return json
    }

    public async fetchActor(q: any, p: any) {
        const prefixes: string[] = [
            'PREFIX dbo: <http://dbpedia.org/ontology/>',
            'PREFIX dbpedia2: <http://dbpedia.org/property/>',
            'PREFIX dbr: <http://dbpedia.org/resource/>',
            'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>',
            'PREFIX dbpedia: <http://dbpedia.org/resource/>',
        ]

        const query =
            prefixes.join('\n') +
            'SELECT *  WHERE {' +
            '?actor ?x dbr:Actor. ' +
            setActorCriterias(q) +
            actorParameters() +
            '}' +
            setPaginations(p)

        const parsedQuery = this.sparqlParser.parse(query)
        console.log(parsedQuery)
        const stringQuery = this.sparqlGenerator.stringify(parsedQuery)
        console.log(stringQuery)

        // Make request to dbpedia
        const response = await trackPromise(
            fetch(
                `http://dbpedia.org/sparql?query=${encodeURIComponent(
                    stringQuery
                )}&format=json`
            )
        )
        const json = await response.json()

        return json
    }

    public async fetchMovieApi(q: any) {
        const client = new imdb.Client({ apiKey: 'fcdb092d' })
        if (q.id) {
            return client
                .get({ id: q.id }, { apiKey: 'fcdb092d' })
                .then((result) => {
                    return result
                })
        } else {
            return client
                .search(
                    { name: q.title, reqtype: q.reqtype, year: q.year },
                    q.page
                )
                .then((search) => {
                    console.log(search.results)
                    return search.results
                })
        }
    }
}

const setActorCriterias = (criterias: any) => {
    let criteria = ``
    if (criterias.name) {
        let mots = criterias.name.split(' ')
        if (mots.length > 1) {
            criterias.name = '(?=.*' + mots.join('.*).*(?=.*') + '.*).* '
            criteria += `?actor dbo:birthName ?name. 
                       FILTER(regex(?name,\'${criterias.name}\', 'i') && langMatches(lang(?description),'en')) . `
        } else {
            criteria += `?movie dbo:birthName ?name. 
                       FILTER(regex(?name,'.*${criterias.name}.*', 'i') && langMatches(lang(?description),'en')) . `
        }
    }
    return criteria
}

const setCriterias = (criterias: any) => {
    let criteria = ``
    if (criterias.country) {
        criteria += `?movie dbpedia2:country ?country. FILTER(?country = '${criterias.country}'@en) . `
    }
    if (criterias.lessRuntime) {
        criteria += `?movie dbo:runtime ?lessRuntime. FILTER(?lessRuntime <= ${criterias.lessRuntime}) . `
    }
    if (criterias.moreRuntime) {
        criteria += `?movie dbo:runtime ?moreRuntime. FILTER(?moreRuntime > ${criterias.moreRuntime}) . `
    }
    if (criterias.lessGross) {
        criteria += `?movie dbo:gross ?lessGross. FILTER(?lessGross <= \"${criterias.lessGross}\") . `
    }
    if (criterias.moreGross) {
        criteria += `?movie dbo:gross ?moreGross. FILTER(?moreGross > \"${criterias.moreGross}\") . `
    }
    if (criterias.beforeYear) {
        // criteria += `?movie dbpedia2:released ?beforeYear. FILTER(?beforeYear > ${criterias.beforeYear} && isNumeric(?beforeYear)). `
    }
    if (criterias.afterYear) {
        // criteria += `?movie dbpedia2:released ?afterYear. FILTER(?afterYear < ${criterias.afterYear} && isNumeric(?afterYear)). `
    }
    if (criterias.released) {
        criteria += `?movie dbpedia2:released ?released. FILTER(?released = ${criterias.released}). `
    }
    if (criterias.director) {
        criteria += `?movie dbpedia2:director ?director. FILTER(?director = ${criterias.director}). `
    }
    if (criterias.type) {
        criteria += `?movie dbpedia2:type ?type. FILTER(?type <= ${criterias.type}). `
    }
    if (criterias.starring) {
        // criteria += `?movie dbpedia2:starring ?starring. FILTER(?starring <= ${criterias.starring}).`
    }
    if (criterias.language) {
        criteria += `?movie dbpedia2:language ?language. FILTER(?language <= ${criterias.language}). `
    }
    if (criterias.producer) {
        criteria += `?movie dbpedia2:producer ?producer. FILTER(?producer <= ${criterias.producer}). `
    }
    if (criterias.music) {
        criteria += `?movie dbpedia2:music ?music. FILTER(?music <= ${criterias.music}). `
    }
    if (criterias.title) {
        let mots = criterias.title.split(' ')
        if (mots.length > 1) {
            criterias.title = '(?=.*' + mots.join('.*).*(?=.*') + '.*).* '
            criteria += `?movie rdfs:label ?title. 
                     FILTER(regex(?title,\'${criterias.title}\', 'i') && langMatches(lang(?title),'en')) . `
        } else {
            criteria += `?movie rdfs:label ?title. 
                     FILTER(regex(?title,'.*${criterias.title}.*', 'i') && langMatches(lang(?title),'en')) . `
        }
    } else {
        criteria += `?movie rdfs:label ?title. FILTER(langMatches(lang(?title),'en')) . `
    }
    if (criterias.category) {
        let mots = criterias.category.split(' ')
        criterias.category = '(?=.*' + mots.join('.*).*(?=.*') + '.*).*'
        criteria += `?movie dct:subject ?s. FILTER(regex(?s, \'${criterias.category}\', 'i')) . `
    }
    return criteria
}

const setPaginations = (p: any) => {
    let page = ``
    if (p.size) {
        page += `LIMIT ${p.size} `
    }
    if (p.page && p.page > 0) {
        page += `OFFSET ${p.size * (p.page - 1)}`
    }
    return page
}

const actorParameters = () => {
    let res = ``
    // description
    res += `OPTIONAL {?actor dbo:abstract ?description. 
          Filter(langMatches(lang(?description),'en')).} `
    // urlThumbnail
    res += `OPTIONAL {?actor dbo:thumbnail ?thumbnail.} `
    // name
    res += `OPTIONAL {?actor dbo:birthName ?name.
                    Filter(langMatches(lang(?name),'en')).} `
    // birthDate
    res += `OPTIONAL {?actor dbo:birthDate ?birthDate.} `
    // birthPlace
    res += `OPTIONAL {?actor dbo:birthPlace ?birthPlace.} `
    // birthName
    res += `OPTIONAL {?actor dbo:birthName ?birthName.} `
    // nationality
    res += `OPTIONAL {?actor dbo:thumbnail ?thumbnail.} `
    return res
}

const movieParameters = () => {
    let res = ``
    // description
    res += `OPTIONAL {?movie dbo:abstract ?description. 
          Filter(langMatches(lang(?description),'en')).} `
    // type
    res += `OPTIONAL {?movie dbpedia2:type ?type.} `
    // director
    // res += `OPTIONAL {?movie dbo:director ?director.} `
    // growth
    res += `OPTIONAL {?movie dbo:gross ?growth. FILTER(DATATYPE(?growth)=dbt:usDollar)} `
    // producer
    // res += `OPTIONAL {?movie dbo:producer ?producer.}`
    // runtime
    res += `OPTIONAL {?movie dbo:runtime ?runtime.} `
    // starring
    // res += `OPTIONAL {?movie dbo:starring ?starring.}`
    // budget
    res += `OPTIONAL {?movie dbpedia2:budget ?budget. FILTER(DATATYPE(?budget)=dbt:usDollar)} `
    // wikiId
    res += `?movie dbo:wikiPageID ?wikiId.`
    // country
    // res += `OPTIONAL {?movie dbpedia2:country ?country.} `
    // language
    res += `{ ?movie dbpedia2:language ?language FILTER(?language="English"@en) } UNION { ?movie dbpedia2:language dbpedia:English_language. } `
    // releaseYear
    res += `OPTIONAL {?movie dbpedia2:releaseYear ?releaseYear. FILTER(isNumeric(?releaseYear)).} `
    // urlThumbnail
    res += `OPTIONAL {?movie dbo:thumbnail ?urlThumbnail.} `
    // ranking
    return res
}
