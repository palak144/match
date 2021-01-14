import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { OurMissionComponent } from './our-mission/our-mission.component';
import { SalientFeaturesComponent } from './salient-features/salient-features.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { SeekersComponent } from './seekers/seekers.component';
import { DonorsComponent } from './donors/donors.component';
import { SupportersComponent } from './supporters/supporters.component';
import { SignUpSupporterComponent } from './supporters/sign-up-supporter/sign-up-supporter.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { ThankyouSupporterComponent } from './thankyou-supporter/thankyou-supporter.component';
import { SupportersListComponent } from './supporters/supporters-list/supporters-list.component';
import { SuccessfulMatchesComponent } from './success-stories/successful-matches/successful-matches.component';
import { FoundingChampionsWallComponent } from './founding-champions-wall/founding-champions-wall.component';
import { SearchOfferNeedComponent } from './search-offer-need/search-offer-need.component';
import { FAQsComponent } from './faqs/faqs.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { ViewOfferResolve } from './services/view-offer.resolve';
import { ViewNeedComponent } from './view-need/view-need.component';
import { ViewNeedResolve } from './services/view-need.resolve';
import { InterfaceComponentComponent } from './admin-login/interface-component.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { VideoLinksComponent } from './success-stories/video-links/video-links.component';
import { ProjectGuidelinesComponent } from './success-stories/project-guidelines/project-guidelines.component';
import { SeekerNeedFormComponent } from './seeker-need-form/seeker-need-form.component';
import { DonorOfferFormComponent } from './donor-offer-form/donor-offer-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminApplicationsComponent } from './admin-applications/admin-applications.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { BrochureComponent } from './success-stories/brochure/brochure.component';


const routes: Routes = [
  {path :'' , component : LandingScreenComponent},
  {path :'home' , component : LandingScreenComponent},
  {path :'our-mission' , component :OurMissionComponent},
  {path :'salient-features' , component :SalientFeaturesComponent},
  {path :'secure/user-dashboard' , component : UserDashboardComponent},
  {path :'seekers' , component : SeekersComponent},
  {path :'donors' , component : DonorsComponent},
  {path :'supporter-info' , component : SupportersComponent},
  {path :'supporter-sign-up' , component : SignUpSupporterComponent},
  {path :'search' , component : SearchOfferNeedComponent},
  {path :'success-stories' , component : SuccessStoriesComponent},
  {path :'secure/seeker-need-form/:id' , component :SeekerNeedFormComponent},
  {path :'secure/donor-offer-form/:id' , component :DonorOfferFormComponent},
  {path :'home' , component :LandingScreenComponent},
  {path :'our-mission' , component :OurMissionComponent},
  {path :'FAQs' , component :FAQsComponent},
  {path :'salient-features' , component :SalientFeaturesComponent},
  {path :'thank-you' , component :ThankYouComponent},
  {path :'thank-you-supporters' , component :ThankyouSupporterComponent},
  {path:'view-offer', component:ViewOfferComponent,resolve:{         
    offerdata:ViewOfferResolve  }  },
  {path:'view-need', component:ViewNeedComponent,resolve:{         
    needdata:ViewNeedResolve  }  },
   {path :'admin-dashboard' , component : AdminDashboardComponent},
   {path :'admin-applications/:id/:eoiId' , component :AdminApplicationsComponent},
  // {path: 'guidelines' , component: GuidelinesComponent},
   {path: 'create-admin-account', component: AdminAccountComponent},
   {path: 'admin-login', component: InterfaceComponentComponent},
  {path: 'supporters', component: SupportersListComponent},
  {path: 'successful-matches', component: SuccessfulMatchesComponent},
  {path:'our-community', component: FoundingChampionsWallComponent},
  {path:'videos', component: VideoLinksComponent},
  {path:'project-guidelines', component: ProjectGuidelinesComponent},
  {path:'brochure', component: BrochureComponent},
  {path: '404', component: NotFoundComponentComponent},
  {path: '**', redirectTo: '404'}
];

export const AppRoutingModule = RouterModule.forRoot(routes,{ useHash: true , scrollPositionRestoration: 'enabled'})

