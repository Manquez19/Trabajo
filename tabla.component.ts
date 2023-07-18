import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamenService } from '../examen.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  data: any[] = [];
  registroForm: FormGroup;
  registroEditando: any;

  constructor(private examenService: ExamenService) {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.examenService.getData().subscribe((response: any) => {
      this.data = response;
    });
  }

  submitForm() {
    if (this.registroForm.valid) {
      const nuevoRegistro = {
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        edad: this.registroForm.value.edad
      };

      if (this.registroEditando) {
        // Actualizar registro existente
        this.examenService.actualizarRegistro(this.registroEditando.id, nuevoRegistro)
          .subscribe(() => {
            const index = this.data.findIndex(registro => registro.id === this.registroEditando.id);
            if (index !== -1) {
              this.data[index] = nuevoRegistro;
            }
            this.registroEditando = null;
          });
      } else {
        // Agregar nuevo registro
        this.examenService.agregarRegistro(nuevoRegistro)
          .subscribe(response => {
            this.data.push(response);
          });
      }

      this.registroForm.reset();
    }
  }

  editarRegistro(registro: any) {
    this.registroEditando = registro;
    this.registroForm.patchValue({
      nombre: registro.nombre,
      apellido: registro.apellido,
      edad: registro.edad
    });
  }

  eliminarRegistro(registro: any) {
    this.examenService.eliminarRegistro(registro.id)
      .subscribe(() => {
        const index = this.data.findIndex(reg => reg.id === registro.id);
        if (index !== -1) {
          this.data.splice(index, 1);
        }
      });
  }

  onSort(event: any) {
    // Handle sorting logic here
  }

  filter(value: any, field: string) {
    // Handle filtering logic here
  }
}
