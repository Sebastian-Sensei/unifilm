import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class PeliculaService {

    private peliculaUrl: string;
    constructor( private http: Http ) {
        //this.usuarioUrl = urljoin(environment.apiUrl, 'usuarios');
        this.peliculaUrl = environment.apiUrl + 'peliculas';

    }
    getPeliculas(): Promise<void | Pelicula[]> {
        console.log('url: desde getPelicula() = ' + this.peliculaUrl);

        return this.http.get(this.peliculaUrl)
                .toPromise()
                .then( response => response.json() as Pelicula[] )
                .catch(this.handleError);
    }

    getPelicula(id): Promise<void | Pelicula> {
        //const url = urljoin(this.usuarioUrl, id);
        const url =   this.peliculaUrl + '/' + id;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Pelicula)
            .catch(this.handleError);
    }

    addPelicula(pelicula: Pelicula) {
        const body = JSON.stringify(pelicula);
        const headers = new Headers({ 'Content-Type': 'application/json'});

        return this.http.post(this.peliculaUrl, body , {headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? error.status + '-' +  error.statusText : 'Error de Servidor' ;
        console.log(errMsg);
    }
}