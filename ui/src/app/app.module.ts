import { CommonErrorComponent } from './components/Layout/common-error.component';
import { OfficeHomeComponent } from './components/Office/office-home.component';
import { OperationsService } from './services/operations.service';
import { PaginationComponent } from './components/Layout/pagination.component';
import { FilesService } from './services/files.service';
import { WorksService } from './services/works.service';
import { ProfileComponent } from './components/User/profile.component';
import { LoginComponent } from './components/Layout/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AutofocusDirective } from './directive/myautofocus.directive';
import { RemoveHostDirective } from './directive/remove-host.directive';
import { UtilService } from './services/utils.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './modules/approuter.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index.component';
import { FooterComponent } from './components/Layout/footer.component';
import { HeaderComponent } from './components/Layout/header.component';
import { MainLayoutComponent } from './components/Layout/main-layout.component';
import { RegisterComponent } from './components/Register/register.component';
import { RegisterQuickComponent } from './components/Register/register-quick.component';
import { UserinfoComponent } from './components/User/userinfo/userinfo.component';
import { WorkplaceinfoComponent } from './components/User/workplaceinfo/workplaceinfo.component';
import { TeachinfoComponent } from './components/User/teachinfo/teachinfo.component';
import { ChangepasswordComponent } from './components/User/changepassword/changepassword.component';
import { WorkRegisterComponent } from './components/Works/work-register.component';
import { WorkDetailComponent } from './components/Works/work-detail/work-detail.component';
import { WorkEditComponent } from './components/Works/work-edit/work-edit.component';
import { ArticleComponent } from './components/Article/article.component';
import { ArticleDetailComponent } from './components/Article/article-detail/article-detail.component';
import { ArticleEditComponent } from './components/Article/article-edit/article-edit.component';
import { UserComponent } from './components/User/user.component';
import { AboutComponent } from './components/Layout/about.component';
import { SearchComponent } from './components/Layout/search.component';
import { NewsComponent } from './components/Layout/news.component';
import { UserReportComponent } from './components/User/user-report.component';
import { ForgotPasswordComponent } from './components/Register/forgot-password.component';
import { ResetPasswordComponent } from './components/Register/reset-password.component';
import { AvatarComponent } from './components/User/avatar.component';
import { NewWorkComponent } from './components/NewWork/new-work.component';
import { EditNewWorkComponent } from './components/NewWork/edit-new-work/edit-new-work.component';
import { UserNonSystemComponent } from './components/Layout/user-non-system.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    MainLayoutComponent,
    RegisterComponent,
    RegisterQuickComponent,
    RemoveHostDirective,
    AutofocusDirective,
    ProfileComponent,
    UserinfoComponent,
    WorkplaceinfoComponent,
    TeachinfoComponent,
    ChangepasswordComponent,
    WorkRegisterComponent,
    WorkDetailComponent,
    WorkEditComponent,
    ArticleComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    PaginationComponent,
    UserComponent,
    AboutComponent,
    SearchComponent,
    NewsComponent,
    UserReportComponent,
    OfficeHomeComponent,
    CommonErrorComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AvatarComponent,
    NewWorkComponent,
    EditNewWorkComponent,
    UserNonSystemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule
  ],
  providers: [UserService, UtilService, AuthGuard, WorksService, FilesService, OperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
