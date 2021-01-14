import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';


@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css'],

})
export class SuccessStoriesComponent implements OnInit {

  constructor(
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,

  ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }
  openPDF(id) {
    switch (id) {
      case 0: {
        window.open("assets/images/Article from Ms. Maria Zarraga, Managing Director, ForWaves Consulting WIPO Match contributing to SDGs 20130.pdf");
        break;
      }
      case 1: {
        window.open("assets/images/Article from President Turkish Patent Office Why I Believe in WIPO Match1.pdf");
        break;
      }
      case 2: {
        window.open("assets/images/Article from Ms. Pacyinz Lyfoung PIIPA and Nigeria project.pdf");
        break;
      }
      case 3: {
        window.open("assets/images/Article Mr. Juan Ramon Rangel Silva Innovation and IP Management Professional.pdf");
        break;
      }
      case 4: {
        window.open("assets/images/SmartPatent Article For WIPO copy.pdf");
        break;
      }
      case 5: {
        window.open("assets/images/WIPO 4dlife article.pdf");
        break;
      }
      case 6: {
        window.open("assets/images/WIPO Match_Arctic Innovation.pdf");
        break;
      }
      case 7: {
        window.open("assets/images/WIPO Match-Article final-15.12.19-converted (1).pdf");
        break;
      }
      case 8: {
        window.open("assets/images/WIPO MATCH-SUCCESS STORIES-2410.pdf");
        break;
      }
      case 10: {
        window.open("assets/images/WIPO Match-Article REV Nov29-converted.pdf");
        break;
      }
      case 12: {
        window.open("assets/images/Wipo_Match_Activities.pdf");
        break;
      }
      case 13: {
        window.open("assets/images/FAST_document.pdf");
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

}
