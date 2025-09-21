import { type Geometry } from "./geometry"

export class Surface {

  constructor(public ap: number, public geometry: Geometry) {}

  sagAt(x: number, y = 0) {
    return this.geometry.sag(x, y)
  }

  get type(): string {
    return this.geometry.kind
  }

}

