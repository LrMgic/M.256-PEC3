import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { CategoriesListComponent } from './Category/components/categories-list/categories-list.component';
import { CategoryFormComponent } from './Category/components/category-form/category-form.component';
import { HomeComponent } from './Post/components/home/home.component';
import { PostFormComponent } from './Post/components/post-form/post-form.component';
import { PostsListComponent } from './Post/components/posts-list/posts-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'HomePage' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'RegisterPage' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'HomePage' },
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard],
    data: { animation: 'PostPage' },
  },
  {
    path: 'user/post/:id',
    component: PostFormComponent,
    canActivate: [AuthGuard],
    data: { animation: 'PostIDPage' },
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
    data: { animation: 'CategoriesPage' },
  },
  {
    path: 'user/category/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
    data: { animation: 'CategoriesIdPage' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'PerfilePage' },
  },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
