import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'observation-section/:id',
    loadChildren: () => import('./observation-section/observation-section.module').then( m => m.ObservationSectionPageModule)
  },
  {
    path: 'observation/:id',
    loadChildren: () => import('./observation/observation.module').then( m => m.ObservationPageModule)
  },
  {
    path: 'observation-child/:id',
    loadChildren: () => import('./observation-child/observation-child.module').then( m => m.ObservationChildPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'assing',
    loadChildren: () => import('./assing/assing.module').then( m => m.AssingPageModule)
  },
  {
    path: 'inspector',
    loadChildren: () => import('./inspector/inspector.module').then( m => m.InspectorPageModule)
  },
  {
    path: 'observation-resume',
    loadChildren: () => import('./observation-resume/observation-resume.module').then( m => m.ObservationResumePageModule)
  },
  {
    path: 'detail-photo/:photo',
    loadChildren: () => import('./detail-photo/detail-photo.module').then( m => m.DetailPhotoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
