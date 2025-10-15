import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContactT } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-service';
import { ActivatedRoute, Router } from '@angular/router'; // ⬅️ Agrega ActivatedRoute
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-contact.html',
  styleUrl: './new-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute); // ⬅️ Inyecta ActivatedRoute
  errorEnBack = false;

  // Cambia esto:
  idContacto: string | null = null; // ⬅️ En lugar de input<number>()

  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;
  isEditMode = false; // ⬅️ Nueva propiedad

  async ngOnInit() {
    // Captura el ID de la ruta
    this.idContacto = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.idContacto;

    console.log('ID capturado:', this.idContacto, 'Modo edición:', this.isEditMode);

    if (this.isEditMode && this.idContacto) {
      // Cargar el contacto desde la API
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto);

      console.log('Contacto cargado:', this.contactoOriginal);

      // Pre-llenar formulario con setTimeout más largo
      setTimeout(() => {
        if (this.contactoOriginal && this.form()) {
          console.log('Llenando formulario...');

          // Usa patchValue en lugar de setValue (es más flexible)
          this.form()?.form.patchValue({
            firstName: this.contactoOriginal.firstName || '',
            lastName: this.contactoOriginal.lastName || '',
            number: this.contactoOriginal.number || '',
            email: this.contactoOriginal.email || '',
            isFavourite: this.contactoOriginal.isFavorite || false,
            address: this.contactoOriginal.address || '',
            company: this.contactoOriginal.company || '',
            image: this.contactoOriginal.image || ''
          });

          console.log('Formulario llenado con valores:', this.form()?.form.value);
        }
      }, 200); // Aumenté el timeout
    }
  }
  async handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    const nuevoContacto: NewContactT = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.favorite // ⬅️ Cambia a "favorite"
    }

    this.isLoading = true;
    let res;

    if (this.isEditMode && this.idContacto) {
      res = await this.contactsService.editContact({ ...nuevoContacto, id: this.idContacto });
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }

    this.isLoading = false;

    if (!res) {
      this.errorEnBack = true;
      return;
    }

    this.router.navigate([""]);
  }
}