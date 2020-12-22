import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class GetPaisesService {

  constructor(private httpClient : HttpClient) { }

getPaises(){
      return this.httpClient.get('https://restcountries.eu/rest/v2/all');   
}

}
