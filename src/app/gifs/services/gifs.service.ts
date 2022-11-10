import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gift.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_Key: string = '0tDjmQ4H382yofAfJcARuuUgE5XTYRMo'
  private _historial: string[] = [];
  //TODO: cambiar tipo
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient ) {}

  async buscarGifs( query: string ) {

    query = query.trim().toLocaleLowerCase()
    
    
    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query )
    }

    this._historial = this._historial.splice(0, 10)
    
    console.log(this._historial)

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=0tDjmQ4H382yofAfJcARuuUgE5XTYRMo&q=${ query }&limit=10`)
             .subscribe(( resp ) => {
              console.log( resp.data )
              this.resultados = resp.data
             })
    
  }

}
