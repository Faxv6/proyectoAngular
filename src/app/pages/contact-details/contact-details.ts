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
  contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);
  route = inject(ActivatedRoute);

  async ngOnInit() {
    this.routeId = this.route.snapshot.paramMap.get('id');
    if (this.routeId) {
      this.cargandoContacto = true;

      if (this.contactService.contacts.length === 0) {
        await this.contactService.getContacts();
      }
      this.contacto = this.contactService.contacts.find(contacto =>
        contacto.id.toString() === this.routeId
      );


      if (!this.contacto) {
        try {
          const res = await this.contactService.getContactById(this.routeId);

          if (res) {
            this.contacto = res;
          }
        } catch (error) {
          console.error('Error al cargar contacto:', error);
        }
      }
      this.cargandoContacto = false;
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