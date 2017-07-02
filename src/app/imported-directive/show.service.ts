import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class ShowService {
    constructor(private http: Http) { }

    private API_KEY = '87de9079e74c828116acce677f6f255b';
    private BASE_URL = 'http://api.themoviedb.org/3';


    makeRequest(url, params) {
        var requestUrl = this.BASE_URL + '/' + url + '?api_key=' + this.API_KEY;
        for (let i = 0; i < params.lenth - 1; i++) {
            requestUrl = requestUrl + '&' + i + '=' + params[i];
        };

        return this.http.get(requestUrl);
    }
    getPremieres() {
        //Get first day of the current month
        var date = new Date();
        date.setDate(1);
        return this.makeRequest('discover/tv', { 'first_air_date.gte': '', append_to_response: 'genres' })
    }

    get(id) {
        return this.makeRequest('tv/' + id, {});
    }
    getCast(id) {
        return this.makeRequest('tv/' + id + '/credits', {});
    }
    search(query) {
        return this.makeRequest('search/tv', { query: query }).subscribe(
            (response: Response) => {
                return response.json().results;
            });
    }
    getPopular() {
        return this.makeRequest('tv/popular', {}).subscribe(
            (response: Response) => {
                return response.json().results;
            });
    }

    dataServiceError(errorResponse) {
        return errorResponse;
    }
}