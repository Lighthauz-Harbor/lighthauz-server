import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PageNotFoundComponent } from 
    "./components/not-found/not-found.component";

import { UsersListComponent } from
    "./components/users-list/users-list.component";
import { UserDetailsComponent } from
    "./components/user-details/user-details.component";
import { CreateUserComponent } from
    "./components/user-create/user-create.component";
import { UpdateUserComponent } from
    "./components/user-update/user-update.component";
import { UserIdeasComponent } from
    "./components/user-ideas/user-ideas.component";
import { UserConnectionsComponent } from 
    "./components/user-connections/user-connections.component";
import { UserRequestsComponent } from 
    "./components/user-requests/user-requests.component";
import { DeactivateUserComponent } from
    "./components/user-deactivate/user-deactivate.component";

import { IdeasListComponent } from
    "./components/ideas-list/ideas-list.component";
import { IdeaDetailsComponent } from
    "./components/idea-details/idea-details.component";
import { CreateIdeaComponent } from
    "./components/idea-create/idea-create.component";
import { UpdateIdeaComponent } from
    "./components/idea-update/idea-update.component";
import { IdeaResponsesComponent } from
    "./components/idea-responses/idea-responses.component";
import { IdeaPartnersComponent } from
    "./components/idea-partners/idea-partners.component";

import { ReportsListComponent } from
    "./components/reports-list/reports-list.component";
import { ViewReportComponent } from
    "./components/report-view/report-view.component";
import { ReplyToReportComponent } from
    "./components/report-reply/report-reply.component";

import { AuthenticationGuard } from "./services/authentication.guard";

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [ AuthenticationGuard ]
    },
    {
        path: "users",
        canActivate: [ AuthenticationGuard ],
        children: [
            {
                path: "",
                component: UsersListComponent
            },
            {
                path: "create",
                component: CreateUserComponent
            },
            {
                path: ":id",
                children: [
                    {
                        path: "",
                        component: UserDetailsComponent
                    },
                    {
                        path: "update",
                        component: UpdateUserComponent
                    },
                    {
                        path: "ideas",
                        component: UserIdeasComponent
                    },
                    {
                        path: "connections",
                        component: UserConnectionsComponent
                    },
                    {
                        path: "requests",
                        component: UserRequestsComponent
                    },
                    {
                        path: "deactivate",
                        component: DeactivateUserComponent
                    }
                ]
            },
        ]
    },
    {
        path: "ideas",
        canActivate: [ AuthenticationGuard ],
        children: [
            {
                path: "",
                component: IdeasListComponent
            },
            {
                path: "create",
                component: CreateIdeaComponent
            },
            {
                path: ":id",
                children: [
                    {
                        path: "",
                        component: IdeaDetailsComponent
                    },
                    {
                        path: "update",
                        component: UpdateIdeaComponent
                    },
                    {
                        path: "responses",
                        component: IdeaResponsesComponent
                    },
                    {
                        path: "partners",
                        component: IdeaPartnersComponent
                    }
                ]
            },
        ]
    },
    {
        path: "reports",
        canActivate: [ AuthenticationGuard ],
        children: [
            {
                path: "",
                component: ReportsListComponent
            },
            {
                path: ":id",
                children: [
                    {
                        path: "",
                        component: ViewReportComponent
                    },
                    {
                        path: "reply",
                        component: ReplyToReportComponent
                    }
                ]
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {

}