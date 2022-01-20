import * as sparql from "sparqljs"
import { textSpanOverlapsWith } from "typescript";
import {trackPromise} from "react-promise-tracker";

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
            'PREFIX dbpedia2: <http://dbpedia.org/property/>',
            'PREFIX dct: <http://purl.org/dc/terms/>'
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
            'PREFIX dbpedia2: <http://dbpedia.org/property/>',
            'PREFIX dct: <http://purl.org/dc/terms/>'
        ]

        const query = prefixes.join("\n") +
            '\nSELECT *  WHERE {' +
            '?movie a dbo:Film . \n'+
            '?movie dbo:thumbnail ?thumbnail .\n' +
            '?movie dbpedia2:title ?movietitle.\n' +
            '?movie dbpedia2:released ?released.\n' +
            setCriterias(q) +
            '}' +
            setPaginations(p);

        console.log(query);
        const parsedQuery = this.sparqlParser.parse(query);

        const stringQuery = this.sparqlGenerator.stringify(parsedQuery);
        console.log(stringQuery);

        // Make request to dbpedia
        const response = await trackPromise(fetch(`http://dbpedia.org/sparql?query=${encodeURIComponent(stringQuery)}&format=json`));
        const json = await response.json();

        return json;

    }

}

const setCriterias = (criterias: any) => {
    let criteria = ``;
    if (criterias.country) {
        criteria += `?movie dbpedia2:country ?country. FILTER(?country = '${criterias.country}'@en) .`
    }
    if (criterias.lessRuntime) {
        criteria += `?movie dbo:runtime ?lessRuntime. FILTER(?lessRuntime <= ${criterias.lessRuntime}) .`
    }
    if (criterias.moreRuntime) {
        criteria += `?movie dbo:runtime ?moreRuntime. FILTER(?moreRuntime > ${criterias.moreRuntime}) .`
    }
    if (criterias.lessGross) {
        criteria += `?movie dbo:gross ?lessGross. FILTER(?lessGross <= \"${criterias.lessGross}\") .`
    }
    if (criterias.moreGross) {
        criteria += `?movie dbo:gross ?moreGross. FILTER(?moreGross > \"${criterias.moreGross}\") .`
    }
    if (criterias.beforeYear){
        criteria += `?movie dbpedia2:released ?beforeYear. FILTER(?beforeYear > ${criterias.beforeYear}).`
    }
    if(criterias.afterYear){
        criteria += `?movie dbpedia2:released ?afterYear. FILTER(?afterYear < ${criterias.afterYear}).`
    }
    if(criterias.released){
        criteria += `?movie dbpedia2:released ?released. FILTER(?released = ${criterias.released}).`
    }
    if (criterias.director){
        criteria += `?movie dbpedia2:director ?director. FILTER(?director = ${criterias.director}).`
    }
    if (criterias.type){
        criteria += `?movie dbpedia2:type ?type. FILTER(?type <= ${criterias.type}).`
    }
    if (criterias.starring){
        criteria += `?movie dbpedia2:starring ?starring. FILTER(?starring <= ${criterias.starring}).`
    }
    if (criterias.language){
        criteria += `?movie dbpedia2:language ?language. FILTER(?language <= ${criterias.language}).`
    }
    if (criterias.producer){
        criteria += `?movie dbpedia2:producer ?producer. FILTER(?producer <= ${criterias.producer}).`
    }
    if (criterias.music){
        criteria += `?movie dbpedia2:music ?music. FILTER(?music <= ${criterias.music}).`
    }
    if(criterias.title){
        criteria += `?movie dbpedia2:title ?movietitle. FILTER(regex(?movietitle,'.*${criterias.title}.*', 'i')) .`
    }
    if (criterias.category){
        let mots = criterias.category.split(" ");
        criterias.category = '(?=.*'+ mots.join('.*).*(?=.*') + '.*).*';
        criteria += `?movie dct:subject ?s. FILTER(regex(?s, \'${criterias.category}\', 'i')) .`
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
