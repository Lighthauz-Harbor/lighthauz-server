import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Idea } from "../../models/idea.model.app";

import { IdeasService } from "../../services/ideas.service";

@Component({
    selector: "idea-update",
    templateUrl: "./idea-update.component.html",
    styles: [ require("./idea-update.component.css").toString() ]
})
export class UpdateIdeaComponent implements OnInit {

    private id: string;
    private title: string;
    private oldCategory: string; // category before changed
    private category: string;
    private oldAuthor: string; // author before changed
    private author: string; // username or email
    private description: string;
    private visibility: string;
    private visibilityChoices: string[] = ["Not published", "Exclusive", "Public"];
    private background: string;
    private problem: string;
    private solution: string;
    private extraLink: string;
    private strengths: string;
    private weaknesses: string;
    private opportunities: string;
    private threats: string;
    private valueProposition: string;
    private customerSegments: string;
    private customerRelationships: string;
    private channels: string;
    private keyActivities: string;
    private keyResources: string;
    private keyPartners: string;
    private costStructure: string;
    private revenueStreams: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ideasService: IdeasService) {

    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.id = params["id"];
            this.ideasService.getSingleIdea(this.id)
                .subscribe((json: any) => {
                    if (json.fail) {
                        alert(json.fail);
                        this.router.navigate(["/ideas"]);
                    } else {
                        this.oldAuthor = json.author;
                        this.author = json.author;

                        this.oldCategory = json.category;
                        this.category = json.category;

                        this.visibility = this.visibilityChoices[json.visibility];

                        this.title = json.idea.title;
                        this.description = json.idea.description;
                        this.background = json.idea.background;
                        this.problem = json.idea.problem;
                        this.solution = json.idea.solution;
                        this.extraLink = json.idea.extraLink;

                        this.strengths = json.idea.strengths;
                        this.weaknesses = json.idea.weaknesses;
                        this.opportunities = json.idea.opportunities;
                        this.threats = json.idea.threats;

                        this.valueProposition = json.idea.valueProposition;
                        this.customerSegments = json.idea.customerSegments;
                        this.customerRelationships = json.idea.customerRelationships;
                        this.channels = json.idea.channels;
                        this.keyActivities = json.idea.keyActivities;
                        this.keyResources = json.idea.keyResources;
                        this.keyPartners = json.idea.keyPartners;
                        this.costStructure = json.idea.costStructure;
                        this.revenueStreams = json.idea.revenueStreams;
                    }
                });
        });
    }

    onSubmitIdea(): void {
        if (this.isValidInput()) {
            // assign visibility to a number flag
            let visibilityFlag = this.visibilityChoices
                .indexOf(this.visibility);

            // create the idea, checking whether the author exists already occurs
            // in the server schema
            this.ideasService.updateIdea({
                id: this.id,
                title: this.title,
                oldCategory: this.oldCategory,
                category: this.category,
                oldAuthor: this.oldAuthor,
                author: this.author,
                description: this.description,
                visibility: visibilityFlag,
                background: this.background,
                problem: this.problem,
                solution: this.solution,
                extraLink: this.extraLink || "",
                strengths: this.strengths,
                weaknesses: this.weaknesses,
                opportunities: this.opportunities,
                threats: this.threats,
                valueProposition: this.valueProposition,
                customerSegments: this.customerSegments,
                customerRelationships: this.customerRelationships,
                channels: this.channels,
                keyActivities: this.keyActivities,
                keyResources: this.keyResources,
                keyPartners: this.keyPartners,
                costStructure: this.costStructure,
                revenueStreams: this.revenueStreams,
            }).subscribe((result: any) => {
                alert(result.message);
                this.router.navigate(["/ideas"]);
            });
        }
    }

    isValidInput(): boolean {
        // credits to Diego Perini for the URL regex 
        // reference: https://gist.github.com/dperini/729294
        let urlRegex = new RegExp(
            "^" +
                "(?:(?:https?|ftp)://)?" +
                "(?:\\S+(?::\\S*)?@)?" +
                "(?:" +
                    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
                    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
                    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
                    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
                "|" +
                    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
                    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
                    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
                    "\\.?" +
                ")" +
                "(?::\\d{2,5})?" +
                "(?:[/?#]\\S*)?" +
            "$", "i"
        );

        if (this.extraLink && !this.extraLink.match(urlRegex)) {
            alert("Extra link is not a valid URL. Please try again.");
            return false;
        }

        return true;
    }
}