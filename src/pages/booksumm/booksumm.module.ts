import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksummPage } from './booksumm';

@NgModule({
  declarations: [
    BooksummPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksummPage),
  ],
})
export class BooksummPageModule {}
