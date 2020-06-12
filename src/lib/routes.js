import {Router} from "wpe-lightning-sdk";

/**
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 */

import {
     Main, Splash, Detailed
} from '../pages';

export default () =>{

    // define where the browser should point to on boot
    Router.root('splash', Splash);
    Router.root('exit', Splash);
    Router.route('movies/:entityId', Detailed);
    Router.route('series/:entityId', Detailed);
    Router.route('movies', Main);
    Router.route('series', Main);

    Router.start();
}
