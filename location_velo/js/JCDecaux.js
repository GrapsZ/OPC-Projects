class JCDecaux
{
    constructor() {
        this.apiKey = '56b77c204faa8c1947186ef3e80af8c817f4cc72';
    }

    getStationsByContract() {
        return ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + ville + "&apiKey=" + this.apiKey);
    }
}