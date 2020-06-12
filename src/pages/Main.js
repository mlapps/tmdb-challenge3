import { Lightning, Router } from "wpe-lightning-sdk";
import { List } from "../components";

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Lists: {
        x: 100,
        y: 560,
        zIndex: 3,
        type: List
      }
    };
  }

  _init() {
    this._index = 0;
  }

  set data({ label, items }) {
    this.tag("Lists").items = items;
    this.tag("Lists").label = label;
  }

  _focus() {
    this.patch({
      Lists: {
        smooth: {
          y: [
            560,
            {
              duration: 0.2,
              timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)"
            }
          ]
        }
      }
    });
  }

  _unfocus() {
    this.patch({
      Lists: {
        smooth: { y: [600, { duration: 0.4 }] }
      }
    });
  }

  _active() {
    Router.restoreFocus();
  }

  _getFocused() {
    return this.tag("Lists");
  }

  _handleUp() {
    Router.focusWidget("menu");
  }
}
