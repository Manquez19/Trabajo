import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://api.dev.liberasoft.com.ar/api/examen';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.apiUrl);
  }

  agregarRegistro(registro: any) {
    return this.http.post(this.apiUrl, registro);
  }

  actualizarRegistro(id: string, registro: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, registro);
  }

  eliminarRegistro(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
