import {Router} from "wpe-lightning-sdk";

export default () =>{
    Router.widget("splash")
    Router.widget("movies/:entityId", ["Menu", "Logo"])
    Router.widget("series/:entityId", ["Menu", "Logo"])
    Router.widget("movies", ["Menu", "Logo"])
    Router.widget("series", ["Menu", "Logo"])
}
