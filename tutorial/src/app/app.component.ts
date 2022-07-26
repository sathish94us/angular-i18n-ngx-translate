import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import crowdin, {
  Credentials,
  SourceFilesModel,
} from "@crowdin/crowdin-api-client";

type Language = "en" | "de";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
    translate.setDefaultLang("en");
  }

  switchLanguage = (lang: Language) => {
    this.translate.use(lang);
  };

  ngOnInit(): void {
    // credentials
    const credentials: Credentials = {
      token:
        "97ecbbf8fffa65f1e749bb4104aa834ac532661786ac5d55c25896f1a1cd2a1007b26c80b44270b8",
      organization: "organizationName", // optional
    };
    // initialization of crowdin client
    const { projectsGroupsApi } = new crowdin(credentials);
    const httpClient = projectsGroupsApi.httpClient;
    httpClient
      .get("/projects/529082/strings")
      .then((data) => {
        console.log("data");
        console.log(data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }
}
