import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { User } from "../../models/user.model.app";

import { UsersService } from "../../services/users.service";

@Component({
    selector: "user-details",
    templateUrl: "./user-details.component.html",
    styles: [ require("./user-details.component.css").toString() ]
})
export class UserDetailsComponent implements OnInit {

    private user: User = new User();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UsersService) {

    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params["id"];
            this.usersService.getSingleUser(id)
                .subscribe((json: any) => {
                    if (json.fail) {
                        alert(json.fail);
                        this.router.navigate(["/users"]);
                    } else {
                        this.user = new User(
                            json.id, json.username, json.role,
                            json.name, json.bio, json.profilePic,
                            new Date(json.dateOfBirth),
                            new Date(json.createdAt));
                    }
                });
        });
    }

}