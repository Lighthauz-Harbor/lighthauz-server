import {Component, OnInit} from "@angular/core";
import {Report} from "../../models/report.model.app";
import {UserService} from "../../services/user.service";
import {IdeaService} from "../../services/idea.service";
import {ReportService} from "../../services/report.service";

@Component({
    selector: "dashboard",
    templateUrl: "./dashboard.component.html",
    styles: [ require("./dashboard.component.css").toString() ]
})
export class DashboardComponent implements OnInit {

    private message: string = "";

    private userActivity: number = 0;
    private totalUsers: number = 0;
    private ideasToday: number = 0;
    private totalIdeas: number = 0;
    private reportsList: Report[] = [];

    constructor(
        private userService: UserService,
        private ideaService: IdeaService,
        private reportService: ReportService) {

    }

    ngOnInit(): void {
        this.getUserInfo();
        this.getIdeaInfo();
        this.loadRecentReports();
    }

    private getUserInfo(): void {
        this.userService.getNewUsersCount()
            .subscribe((json: any) => {
                this.userActivity = json.count;
            });

        this.userService.getTotalUsersCount()
            .subscribe((json: any) => {
                this.totalUsers = json.count;
            });
    }

    private getIdeaInfo(): void {
        this.ideaService.getTodayCount()
            .subscribe((json: any) => {
                this.ideasToday = json.count;
            });

        this.ideaService.getTotalIdeasCount()
            .subscribe((json: any) => {
                this.totalIdeas = json.count;
            });
    }

    private loadRecentReports(): void {
        this.reportService.getRecent().subscribe((json: any) => {
            if (json.fail) {
                this.message = json.fail;
            } else if (json.list.length === 0) {
                this.message = "There are no unsolved reports, so far.";
            } else {
                json.list.map((record: any) => {
                    let reportObj: Report = new Report();
                    reportObj.id = record.report.id;
                    reportObj.title = record.report.title;
                    reportObj.createdAt = new Date(record.createdAt);
                    (reportObj as any).author = {
                        id: record.author.id,
                        name: record.author.name,
                        email: record.author.email
                    };
                    this.reportsList.push(reportObj);
                });
            }
        });
    }
}