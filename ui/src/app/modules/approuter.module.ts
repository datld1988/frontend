import { UserNonSystemComponent } from './../components/Layout/user-non-system.component';
import { EditNewWorkComponent } from './../components/NewWork/edit-new-work/edit-new-work.component';
import { NewWorkComponent } from './../components/NewWork/new-work.component';
import { ResetPasswordComponent } from './../components/Register/reset-password.component';
import { ForgotPasswordComponent } from './../components/Register/forgot-password.component';
import { CommonErrorComponent } from './../components/Layout/common-error.component';
import { OfficeHomeComponent } from './../components/Office/office-home.component';
import { NewsComponent } from './../components/Layout/news.component';
import { AboutComponent } from './../components/Layout/about.component';
import { UserComponent } from './../components/User/user.component';
import { ArticleEditComponent } from './../components/Article/article-edit/article-edit.component';
import { ArticleDetailComponent } from './../components/Article/article-detail/article-detail.component';
import { ArticleComponent } from './../components/Article/article.component';
import { WorkEditComponent } from './../components/Works/work-edit/work-edit.component';
import { WorkDetailComponent } from './../components/Works/work-detail/work-detail.component';
import { WorkRegisterComponent } from './../components/Works/work-register.component';
import { ProfileComponent } from './../components/User/profile.component';
import { MainLayoutComponent } from './../components/Layout/main-layout.component';
import { RegisterQuickComponent } from './../components/Register/register-quick.component';
import { RegisterComponent } from './../components/Register/register.component';

import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from '../components/index.component';
import { SearchComponent } from "app/components/Layout/search.component";

const ortherRoutes: Routes = [
	{ path: 'about/:tab', component: AboutComponent },
	{ path: 'news', component: NewsComponent },
	{ path: 'search/:condition', component: SearchComponent },
	{ path: 'chi-tiet-co-so/:id', component: OfficeHomeComponent },
	{ path: 'error/:detail', component: CommonErrorComponent },
	{ path: 'thong-tin-nguoi-dung/:username', component: UserNonSystemComponent }
];

const workRegisterRoutes: Routes = [
	{ path: 'dang-ky-de-tai', component: WorkRegisterComponent },
	{ path: 'dang-ky-de-tai-moi', component: NewWorkComponent },
	{ path: 'chi-tiet-de-tai/:id', component: WorkDetailComponent },
	{ path: 'chinh-sua-de-tai/:id', component: WorkEditComponent },
	{ path: 'chinh-sua-de-tai-moi/:id', component: EditNewWorkComponent }
];

const articleRoutes: Routes = [
	{ path: 'dang-ky-bai-bao', component: ArticleComponent },
	{ path: 'chi-tiet-bai-bao/:id', component: ArticleDetailComponent },
	{ path: 'chinh-sua-bai-bao/:id', component: ArticleEditComponent },
];

const registerRoutes: Routes = [
	{ path: 'dang-ky', component: RegisterComponent },
	{ path: 'dang-ky-nhanh', component: RegisterQuickComponent },
	{ path: 'quen-mat-khau', component: ForgotPasswordComponent },
	{ path: 'reset-mat-khau/:username/:code', component: ResetPasswordComponent },
];
const normalRoutes: Routes = [
	{ path: '', component: IndexComponent },

];

const userRoutes: Routes = [
	{ path: 'profile/:username/:tab', component: ProfileComponent },
	{ path: 'profile/:username', component: ProfileComponent },
	{ path: 'home-profile/:username', component: UserComponent },
	
];

const appRoutes = [
	{ path: '', component: MainLayoutComponent, children: normalRoutes },
	{ path: '',canActivate: [AuthGuard], component: MainLayoutComponent, children: userRoutes },
	{ path: '', component: MainLayoutComponent, children: registerRoutes },
	{ path: '',canActivate: [AuthGuard], component: MainLayoutComponent, children: workRegisterRoutes },
	{ path: '',canActivate: [AuthGuard], component: MainLayoutComponent, children: articleRoutes },
	{ path: '', component: MainLayoutComponent, children: ortherRoutes},
];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRouterModule { }
