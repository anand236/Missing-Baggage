import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';
import { NgComponent } from './ng/ng.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guard/auth.guard';
import { RxjsComponent } from './rxjs/rxjs.component';

export const routes: Routes = [
    // by default it comes with the eagar loading
    // {path:'a', component:HomeComponent},
    // {path:'b', component:PracticeComponent},
    // {path:'', component:NgComponent}


    // this is lazy loading it will load the components on demand

    {path:'a', 
        loadComponent: ()=> import('../app/home/home.component').then((c)=> HomeComponent)
    },

    {
        path:'b',
        loadComponent: ()=> import('./practice/practice.component').then((c)=> PracticeComponent)
    },
    {
        path:'',
        loadComponent: ()=> import('./rxjs/rxjs.component').then((c)=> RxjsComponent)
    },
    {
        path:'n',
        loadComponent:()=> import('./ng/ng.component').then((c)=> NgComponent)
    }

    // {
    //     path:'', redirectTo:'login', pathMatch:'full'
    // },
    // {
    //     path:'login', 
       
    //     component:LoginComponent
    // },
    // {
    //     path:'login/home',
    //     canActivate:[authGuard], component:HomeComponent
    // },
    // {
    //     path:'**', component:NotFoundComponent
    // }
];
