import * as sparql from "sparqljs"
import { textSpanOverlapsWith } from "typescript";

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

}