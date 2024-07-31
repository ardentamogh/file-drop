import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackEndService } from './services/back-end.service';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomLoader } from './translate-loader';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    FileDropComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [BackEndService],
  bootstrap: [AppComponent]
})
export class AppModule { }
