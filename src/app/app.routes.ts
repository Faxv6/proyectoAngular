import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetails } from './pages/contact-details/contact-details';
import { RegisterPage } from './pages/register-page/register-page';
import { LoggedLayout } from './logged-layout/logged-layout';

export const routes: Routes = [
    {
        path: "login",
        component: LoginPage
    },

    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "",
        component: LoggedLayout,
        children: [
            {
                path: "contacts",
                component: ContactsPage
            },
            {
                path: "contact-details/:id",
                component: ContactDetails
            },
        ]
    }
];

