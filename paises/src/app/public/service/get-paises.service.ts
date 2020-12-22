import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class GetPaisesService {

  constructor(private httpClient : HttpClient) { }

getPaises(){
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.httpClient.get('https://restcountries.eu/rest/v2/all');   
}

}
