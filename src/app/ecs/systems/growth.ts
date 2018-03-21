import {System} from "../system";
import {Entity} from "../Entity";
import {FrameData} from "../../frame-data";
import {GrowingQuantity} from "../components/growingQuantity";
import {IteratorUtils} from "../../IteratorUtils";

export class Growth implements System {

  private lastUpdate: number = 0;

  /**
   * Milliseconds that should pass before an update to an entity should occur.
   * @type {number}
   */
  private updateInterval: number = 1000;

  process(frameData: FrameData, entries: IterableIterator<Entity>): void {
    let lastupdateSeconds: number = frameData.currentTFrame - this.lastUpdate;

    if (Math.floor(frameData.currentTFrame) % 123 === 0) {
      console.debug(`lastUpdate: ${this.lastUpdate}`);
      console.debug(`currentTFrame: ${frameData.currentTFrame}`);
      console.debug(`lastUpdateSeconds: ${lastupdateSeconds}`);
    }
    if(lastupdateSeconds > 1000) {
      let itr = IteratorUtils.nonNullIterator(
        IteratorUtils.mapIterator(entries, item => item.getComponent(GrowingQuantity)));
      let result: IteratorResult<GrowingQuantity> = itr.next();
      // console.debug(entries);
      while (!result.done) {
        let gq = result.value;
        // console.debug(gq);
        // gq.quantity += gq.ratePerSecond;
        // gq.quantity += 1;
        // console.debug(gq.quantity);
        result = itr.next();
      }
      this.lastUpdate = frameData.currentTFrame;
    }
  }

  components(): string[] {
    return null;
  }
}
