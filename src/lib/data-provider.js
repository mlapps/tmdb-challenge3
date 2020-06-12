import { Router } from "wpe-lightning-sdk";
import {
  getMovies,
  getSeries,
  getDetailedMovie,
  getDetailedSerie
} from "./api";

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
 */
export default () => {
  Router.boot(async () => Router.navigate("splash"));

  Router.before(
    "movies",
    async ({ page }) => {
      page.data = {
        label: "Movies",
        items: await getMovies()
      };
    },
    10 * 60 /* expires */
  );

  Router.before(
    "movies/:entityId",
    async ({ page, entityId }) => {
      page.data = await getDetailedMovie(entityId);
    },
    10 * 60 /* expires */
  );

  Router.before(
    "series",
    async ({ page }) => {
      page.data = {
        label: "Series",
        items: await getSeries()
      };
    },
    10 * 60 /* expires */
  );

  Router.before(
    "series/:entityId",
    async ({ page, entityId }) => {
      page.data = await getDetailedSerie(entityId);
    },
    10 * 60 /* expires */
  );
};
