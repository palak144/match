import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {HttpClientModule} from '@angular/common/http';
import { SeekersComponent } from './seekers/seekers.component';
import { DonorsComponent } from './donors/donors.component';
import { SupportersComponent } from './supporters/supporters.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { SignUpSupporterComponent } from './supporters/sign-up-supporter/sign-up-supporter.component';
import { SearchOfferNeedComponent } from './search-offer-need/search-offer-need.component';
import { SeekerNeedFormComponent } from './seeker-need-form/seeker-need-form.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { FAQsComponent } from './faqs/faqs.component';
import { SalientFeaturesComponent } from './salient-features/salient-features.component';
import { FoundingChampionsWallComponent } from './founding-champions-wall/founding-champions-wall.component';
import { DonorOfferFormComponent } from './donor-offer-form/donor-offer-form.component'; 
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { ViewNeedComponent } from './view-need/view-need.component';
import {ViewOfferResolve} from 'src/app/services/view-offer.resolve';
import { ThankYouComponent } from './thank-you/thank-you.component'
import {ViewNeedResolve} from 'src/app/services/view-need.resolve';

//admin
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminApplicationsComponent } from './admin-applications/admin-applications.component';
import { AdminUnprocessedApplicationComponent } from './admin-unprocessed-application/admin-unprocessed-application.component';
import { AdminProcessedApplicationComponent } from './admin-processed-application/admin-processed-application.component';
import { AdminApprovedApplicationComponent } from './admin-approved-application/admin-approved-application.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { AdminPublishedApplicationComponent } from './admin-published-application/admin-published-application.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {CookieService} from 'src/app/services/cookieService'

//toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { InterfaceComponentComponent } from './admin-login/interface-component.component';
import { SupportersListComponent } from './supporters/supporters-list/supporters-list.component';
import { SuccessfulMatchesComponent } from './success-stories/successful-matches/successful-matches.component';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './translate.pipe';
import { ThankyouSupporterComponent } from './thankyou-supporter/thankyou-supporter.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { VideoLinksComponent } from './success-stories/video-links/video-links.component';
import { ProjectGuidelinesComponent } from './success-stories/project-guidelines/project-guidelines.component';
import { BrochureComponent } from './success-stories/brochure/brochure.component';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}
@NgModule({
  declarations: [
    AppComponent,
    LandingScreenComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    SeekersComponent,
    DonorsComponent,
    SupportersComponent,
    SuccessStoriesComponent,
    SignUpSupporterComponent,
    SearchOfferNeedComponent,
    SeekerNeedFormComponent,
    OurMissionComponent,
    FAQsComponent,
    SalientFeaturesComponent,
    FoundingChampionsWallComponent,
    DonorOfferFormComponent,
    ViewOfferComponent,
    ViewNeedComponent,
    ThankYouComponent,
    AdminApplicationsComponent,
    AdminUnprocessedApplicationComponent,
    AdminProcessedApplicationComponent,
    AdminApprovedApplicationComponent,
    GuidelinesComponent,
    AdminPublishedApplicationComponent,
    NotFoundComponentComponent,
    AdminAccountComponent,
    InterfaceComponentComponent,
    SupportersListComponent,
    SuccessfulMatchesComponent,  
    TranslatePipe, ThankyouSupporterComponent, VideoLinksComponent, ProjectGuidelinesComponent, BrochureComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,  
    HttpClientModule, 
    ModalModule.forRoot(),
    NgxPaginationModule,
    Ng4LoadingSpinnerModule,
    PdfViewerModule,
    AngularMultiSelectModule,
    TabsModule.forRoot() ,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    CKEditorModule
  ],
  providers: [ViewOfferResolve,ViewNeedResolve,CookieService,TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
