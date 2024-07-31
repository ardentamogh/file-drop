import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'file-drop';
  selectedLanguage: string = 'en';
  languages: { code: string, label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' }
  ];

  constructor(private translate: TranslateService,private router:Router) {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.router.navigate(['/files']);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }
}
