import { Component, OnInit } from '@angular/core';
import { ApiInvestigacionService } from './services/api-investigacion.service';
import { Mueble } from './models/mueble';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'investigacion-ng';
  muebles: Mueble[] = [];
  mueble: Mueble = {} as Mueble;
  result = "Resultado";
  muebleDialog: boolean;
  submitted: boolean;

  constructor(
    private apiInvestigacionService: ApiInvestigacionService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiInvestigacionService.getAll().subscribe(res => {
      this.muebles = res;
    });
  }

  save() {
    this.submitted = true;
    this.muebles = [];
    // Editar
    if (this.mueble.codigo) {
      this.apiInvestigacionService.update(this.mueble).subscribe(res => {
        this.result = "Mueble actualizado correctamente";
        this.muebleDialog = false;
        this.mueble = {} as Mueble;
        this.getAll();
      });
    // Crear
    } else {
      this.apiInvestigacionService.create(this.mueble).subscribe(res => {
        this.result = "Mueble creado correctamente";
        this.muebleDialog = false;
        this.mueble = {} as Mueble;
        this.getAll();
      });
    }
  }

  update() {
    this.apiInvestigacionService.update(this.mueble).subscribe(res => {
      this.result = "Mueble actualizado correctamente";
    });
  }

  delete(id: string) {
    this.apiInvestigacionService.delete(id).subscribe(res => {
      this.result = `Mueble con código ${id} eliminado correctamente`;
      this.muebles = [];
      this.getAll();
    });
  }

  new() {
    this.mueble = {} as Mueble;
    this.submitted = false;
    this.muebleDialog = true;
  }

  editMueble(mueble: Mueble) {
    this.mueble = {...mueble};
    this.muebleDialog = true;
  }

  deleteMueble(mueble: Mueble) {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar el mueble: ' + mueble.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(mueble.codigo);
      }
    });
  }

  hideDialog() {
    this.muebleDialog = false;
    this.submitted = false;
}
}
