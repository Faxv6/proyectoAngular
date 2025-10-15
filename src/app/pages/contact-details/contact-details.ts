import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts-service';
import { Contact } from '../../interfaces/contact';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})

export class ContactDetails implements OnInit {
  idContacto = input.required<string>();
  routeId: string | null = null;
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {
    console.log('DEBUGGING - URL actual:', this.router.url);
    console.log('DEBUGGING - Parámetros de ruta:', this.route.snapshot.params);
    console.log('DEBUGGING - ParamMap:', this.route.snapshot.paramMap.keys);

    // Captura el ID de la ruta
    this.routeId = this.route.snapshot.paramMap.get('id');
    console.log('DEBUGGING - ID capturado:', this.routeId);
    if (this.routeId) {
      this.cargandoContacto = true;

      // Primero asegúrate de que los contactos estén cargados
      if (this.contactService.contacts.length === 0) {
        console.log('Cargando todos los contactos primero...');
        await this.contactService.getContacts();
      }

      // Busca el contacto en el array local primero
      this.contacto = this.contactService.contacts.find(contacto =>
        contacto.id.toString() === this.routeId
      );

      console.log('Contacto encontrado en local:', this.contacto);

      // Si no lo encuentra en local, o quieres datos frescos, llama a la API
      if (!this.contacto) {
        console.log('Contacto no encontrado en local, llamando a getContactById...');
        try {
          const res = await this.contactService.getContactById(this.routeId);
          console.log('Respuesta de getContactById:', res);

          if (res) {
            this.contacto = res;
          }
        } catch (error) {
          console.error('Error al cargar contacto:', error);
        }
      }
      this.cargandoContacto = false;
      console.log('Contacto final:', this.contacto);
    }
  }


  async toggleFavorite() {
    if (this.contacto) {
      const res = await this.contactService.setFavourite(this.contacto.id);
      if (res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
  }

  async deleteContact() {
    if (this.contacto) {
      const res = await this.contactService.deleteContact(this.contacto.id);
      if (res) this.router.navigate(['/']);
    }
  }
}