import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ROUTES } from "src/app/config/constants";
import { FilmModel } from "src/app/models/film.model";
import { FilmService } from "../films.service";
import { BaseComponent } from "src/app/Shared/common/base.component";
import { customLink } from "src/app/Shared/common/utils";

@Component({
  selector: "app-film",
  templateUrl: "film.component.html",
})
export class FilmComponent extends BaseComponent implements OnInit {
  filmsUrl = `/${ROUTES.FILMS}`;
  film: FilmModel;

  UIMapping = [
    { label: "description", key: "opening_crawl" },
    { label: "episode", key: "episode_id" },
    { label: "director", key: "director" },
    { label: "producer", key: "producer" },
    { label: "Release Date", key: "release_date" },
    { label: "species", key: "species", list: true, customURL: ROUTES.SPECIES },
    { label: "starships", key: "starships", list: true },
    { label: "vehicles", key: "vehicles", list: true },
    { label: "characters", key: "characters", list: true },
    { label: "planets", key: "planets", list: true },
    { label: "url", key: "url" },
    { label: "created", key: "created" },
    { label: "edited", key: "edited" },
  ];

  constructor(
    private filmService: FilmService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id && params.id !== "0") {
          this.fetchFilm(params.id);
        }
      })
    );
  }

  fetchFilm(filmId: string): void {
    this.subscriptions.push(
      this.filmService.getFilm(filmId).subscribe((resp: FilmModel) => {
        this.film = resp;
        const customURLItems = this.UIMapping.filter((el) => el.customURL);
        customURLItems.forEach((item) => {
          const list: string[] = this.film[item.key];
          this.film[item.key] = list.map((str) => {
            return customLink(str, item.customURL);
          });
        });
      })
    );
  }
}
