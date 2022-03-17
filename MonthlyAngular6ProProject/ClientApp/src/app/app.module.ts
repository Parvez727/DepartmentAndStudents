import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MyRedDirective } from './red.directive';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DepartmentStudentAngularComponentComponent } from './department-student-angular-component/department-student-angular-component.component';
import { DepartmentComponentComponent } from './department-component/department-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentAndStudentsComponentComponent } from './department-and-students-component/department-and-students-component.component';
import { from } from 'rxjs';
 


@NgModule({
  declarations: [
    AppComponent,
    MyRedDirective,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DepartmentStudentAngularComponentComponent,
    DepartmentComponentComponent,
    DepartmentAndStudentsComponentComponent,
    
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'deptstudent', component: DepartmentAndStudentsComponentComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
