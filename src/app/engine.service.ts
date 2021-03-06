import {Injectable} from '@angular/core';
import {StateService} from "./state.service";
import {SystemsService} from "./ecs/systems.service";
import {System} from "./ecs/system";
import {EntityService} from "./ecs/entity.service";
import {Entity} from "./ecs/Entity";
import {GameWorldService} from "./game-world.service";
import {FrameData} from "./frame-data";

@Injectable()
export class EngineService {

  frameCount: number = 0;
  currentPendingFrame: number = -1;
  private lastTFrame: number = 0;
  private currentFrameData: FrameData = null;

  constructor(private systemsService: SystemsService, private entityService: EntityService, private gameWorldService: GameWorldService) {
    console.debug("constructing EngineService");
  }

  public start() {
    console.debug("starting world");
    this.gameWorldService.initWorld();
    this.gameLoop();
  }

  /**
   *
   * @param {number} tFrame
   */
  private gameLoop(tFrame?: number) {
    this.currentPendingFrame = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.currentFrameData = new FrameData(this.lastTFrame, tFrame, this.frameCount++);
    this.lastTFrame = tFrame;
    this.doBeforeSystemLogger();
    this.callSystems();
    this.doAfterSystemLogger();
  }

  private doBeforeSystemLogger() {

  }

  private callSystems() {
    this.systemsService.systems.forEach(
      (s: System) => {
        s.process(this.currentFrameData, this.entityService.all());
      });
  }

  private doAfterSystemLogger() {

  }

  public stop() {
    console.debug("stopped");
    window.cancelAnimationFrame(this.currentPendingFrame);
  }

}
