import { Lightning, Router } from "wpe-lightning-sdk";
import { List } from "../components";
import { getImgUrl } from "../lib/tools";

export default class Detailed extends Lightning.Component {
  static _template() {
    return {
      Poster: {
        x: 100,
        y: 350
      },
      Metadata: {
        x: 450,
        y: 345,
        w: 500,
        Year: {
          color: 0xffeeeeee,
          text: { text: "", fontSize: 30, fontFace: "SourceSansPro-Regular" }
        },
        Title: {
          y: 50,
          color: 0xffffffff,
          text: { text: "", fontSize: 64, fontFace: "SourceSansPro-Black" }
        },
        Description: {
          color: 0xff999999,
          y: 150,
          text: {
            wordWrapWidth: 1000,
            text: "",
            fontSize: 28,
            fontFace: "SourceSansPro-Regular",
            lineHeight: 50
          }
        }
      }
    };
  }

  set data({ poster, overview, title, releaseDate }) {
    this.patch({
      Poster: {
        src: getImgUrl(poster, 300)
      },
      Metadata: {
        Year: { text: releaseDate.split('-')[0] },
        Title: { text: title },
        Description: { text: overview }
      }
    });
  }

  _handleUp() {
    Router.focusWidget("menu");
  }
}
