import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetails } from './pages/contact-details/contact-details';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "contacts",
        component: ContactsPage
    },
        {
        path: "contact-details/:id",
        component: ContactDetails
    },
];
