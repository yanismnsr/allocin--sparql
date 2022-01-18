import * as sparql from "sparqljs"

export class Service {

    private static instance : Service;

    // Sparql service classes
    private sparqlGenerator : sparql.SparqlGenerator;
    private sparqlParser : sparql.SparqlParser;


    private constructor() {
        this.sparqlGenerator = new sparql.Generator();
        this.sparqlParser = new sparql.Parser();
    }

    public static GetInstance() {
        if (!Service.instance) {
            Service.instance = new Service();
        }
        return Service.instance;
    }

    public async getMovie (movieString: string) {
        const prefixes : string [] = [
            'PREFIX dbo: <http://dbpedia.org/ontology/>',
            'PREFIX dbpedia2: <http://dbpedia.org/property/>'
        ]

        const query = prefixes.join("\n") +
        'SELECT * WHERE {' +
            '?movie a <http://dbpedia.org/ontology/Film> ;'+
                'dbpedia2:title ?title;' +
                'dbo:director ?director.'+
                '?movie dbo:wikiPageID ?wikiPageID.'+
                '?movie <http://dbpedia.org/ontology/genre> ?genre . '+
                '?movie <http://dbpedia.org/ontology/thumbnail> ?thumbnail .'+
                '?movie <http://dbpedia.org/ontology/releaseDate> ?releaseDate .' +
                '?movie <http://dbpedia.org/ontology/starring> ?starring .' +
            '}' +
            "limit 50";

        const parsedQuery = this.sparqlParser.parse(query);

        const stringQuery = this.sparqlGenerator.stringify(parsedQuery);
        console.log(stringQuery);
        console.log(parsedQuery);

        // Make request to dbpedia
        const response = await fetch(`http://dbpedia.org/sparql?query=${encodeURIComponent(stringQuery)}&format=json`);
        const json = await response.json();
        console.log(json);

    }

    public async fetchMovie (q: any, p: any) {
        const prefixes : string [] = [
            'PREFIX dbo: <http://dbpedia.org/ontology/>',
            'PREFIX dbpedia2: <http://dbpedia.org/property/>'
        ]

        const query = prefixes.join("\n") +
        'SELECT *  WHERE {' +
            '?movie a <http://dbpedia.org/ontology/Film> .'+
                '?movie dbo:wikiPageID ?wikiPageID .'+
                'OPTIONAL { ?movie <http://dbpedia.org/ontology/genre> ?genre . }'+
                'OPTIONAL { ?movie <http://dbpedia.org/ontology/thumbnail> ?thumbnail . }'+
                'OPTIONAL { ?movie <http://dbpedia.org/ontology/releaseDate> ?releaseDate . }' +
                'OPTIONAL { ?movie <http://dbpedia.org/ontology/starring> ?starring . }' +
                setCriterias(q) +
            '}' +
            setPaginations(p);

        console.log(query);
        const parsedQuery = this.sparqlParser.parse(query);

        const stringQuery = this.sparqlGenerator.stringify(parsedQuery);
        console.log(parsedQuery);

        // Make request to dbpedia
        const response = await fetch(`http://dbpedia.org/sparql?query=${encodeURIComponent(stringQuery)}&format=json`);
        const json = await response.json();
        console.log(json);

    }

}

const setCriterias = (criterias: any) => {
    let criteria = ``;
    if(criterias.country){
        criteria += `OPTIONAL { ?movie dbpedia2:country ?country. FILTER(?country like '%${criterias.country}%') . }`
    }
    if(criterias.lessRuntime){
        criteria += `OPTIONAL { ?movie dbo:runtime ?lessRuntime. FILTER(?lessRuntime <= ${criterias.lessRuntime}) . }`
    }
    if(criterias.moreRuntime){
        criteria += `OPTIONAL { ?movie dbo:runtime ?moreRuntime. FILTER(?moreRuntime > ${criterias.moreRuntime}) . }`
    }
    if(criterias.lessGross){
        criteria += `OPTIONAL { ?movie dbo:gross ?lessGross. FILTER(?lessGross <= ${criterias.lessGross}) . }`
    }
    if(criterias.moreGross){
        criteria += `OPTIONAL { ?movie dbo:gross ?moreGross. FILTER(?moreGross > ${criterias.moreGross}) . }`
    }
    if(criterias.beforeYear){
        criteria += `OPTIONAL { ?movie dbpedia2:recorded ?beforeYear. FILTER(?beforeYear > ${criterias.beforeYear}). }`
    }
    if(criterias.afterYear){
        criteria += `OPTIONAL { ?movie dbpedia2:recorded ?afterYear. FILTER(?afterYear <= ${criterias.afterYear}). }`
    }
    if(criterias.title){
        criteria += `?movie dbpedia2:title ?movietitle . FILTER(regex(?movietitle,'.*${criterias.title}.*', 'i')) .`
    }
    return criteria;
}

const setPaginations = (p: any) => {
    let page = ``;
    if(p.size){
        page += `LIMIT ${p.size} `
    }
    if(p.page && p.page>0){
        page += `OFFSET ${p.size*(p.page-1)}`
    }
    return page;
}
