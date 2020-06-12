import { Lightning, Router } from "wpe-lightning-sdk";
import Item from "../item/Item";

export default class List extends Lightning.Component {
  static _template() {
    const cubicBezier = "cubic-bezier(0.20, 1.00, 0.80, 1.00)";

    return {
      Label: {
        y: -50,
        color: 0xff999999,
        text: { text: "", fontSize: 24, fontFace: "SourceSansPro-Bold" }
      },
      Items: {
        y: 120,
        forceZIndexContext: true,
        boundsMargin: [500, 100, 500, 100],
        transitions: {
          x: {
            duration: 0.3,
            timingFunction: "cubic-bezier(0.20, 1.00, 0.80, 1.00)"
          }
        }
      },
      Focus: {
        transitions: {
          scale: {
            duration: 0.1,
            cubicBezier
          },
          alpha: {
            duration: 0.1,
            cubicBezier
          }
        },
        x: -10,
        y: 160,
        colorLeft: 0xff8ecea2,
        colorRight: 0xff03b3e4,
        texture: Lightning.Tools.getRoundRect(
          Item.width + 10,
          Item.height + 10,
          15,
          5,
          0xff8ecea2,
          false,
          0xff03b3e4
        )
      },
      Metadata: {
        Title: {
          color: 0xff20b9d6,
          y: 0,
          text: { text: "", fontSize: 40, fontFace: "SourceSansPro-Black" }
        },
        Genres: {
          y: 50,
          text: { text: "", fontSize: 22, fontFace: "SourceSansPro-Regular" }
        }
      }
    };
  }

  $updateMetadata({ item }) {
    this._selectedItem = item;
    this.patch({
      Metadata: {
        Title: { text: { text: item.title } },
        Genres: { text: { text: item.genres.join(", ") } }
      },
      Focus: {
        smooth: { y: 150, scale: 1.15, alpha: 1 }
      }
    });
  }

  _unfocus() {
    this.patch({
      Focus: {
        smooth: {
          alpha: 0,
          scale: 1
        }
      }
    });
  }

  _init() {
    this._index = 0;
  }

  _handleLeft() {
    this.setIndex(Math.max(0, --this._index));
  }

  _handleRight() {
    this.setIndex(Math.min(++this._index, this.items.length - 1));
  }

  _handleEnter() {
    this.patch({
      Focus: {
        x: -1000
      }
    });
    Router.navigate(`${this._pageRoute}/${this._selectedItem.id}`);
  }

  setIndex(idx) {
    // store new index
    this._index = idx;

    // update position
    this.tag("Items").setSmooth("x", idx * -220);
  }

  set label(text) {
    this._pageRoute = text.toLowerCase();
    this.tag("Label").text.text = text;
  }

  set items(items) {
    this.tag("Items").children = items.map((item, index) => {
      return {
        type: Item,
        item,
        x: index * (Item.width + Item.offset)
      };
    });
  }

  get items() {
    return this.tag("Items").children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _getFocused() {
    return this.activeItem;
  }
}
