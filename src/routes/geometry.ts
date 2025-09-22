import { StdAsphericTerms } from "./AsphericDefinition";

export const GEOMETRY_TYPES = [
  { value: "plane", label: "PlaneGeometry" },
  { value: "sphere", label: "SphereGeometry" },
  { value: "standardasphere", label: "StandardAsphereGeometry" },
  { value: "cylinder", label: "CylinderGeometry" },
  { value: "axicon", label: "AxiconGeometry" },
] as const

export interface Geometry {
  kind: string
  sag(x: number, y: number): number
}

export class PlaneGeometry implements Geometry {
  constructor(public width: number, public height: number) {}
  kind = "plane"

  // hopefully this doesn't get called 
  sag(): number { return 0 }
}

export class SphereGeometry implements Geometry {
  constructor(
    public radius: number, 
    public conic = 0, 
  ) {}

  kind = "sphere"

  sag(x: number, y: number) {
    const r2 = x * x + y * y
    const c = this.radius === 0 ? 0 : 1 / this.radius
    const sqrtvalue = 1 - (1 + this.conic) * c * c * r2
    return sqrtvalue < 0
      ? 0
      : (c * r2) / (1 + Math.sqrt(sqrtvalue)) 
  }

}

export class StandaradAsphereGeomtry implements Geometry {
  constructor(
    public radius: number, 
    public conic = 0, 
    public asphericTerms = new StdAsphericTerms([])
  ) {}

  kind = "standard asphere"

  sag(x: number, y: number) {
    const r2 = x * x + y * y
    const c = this.radius === 0 ? 0 : 1 / this.radius
    const sqrtvalue = 1 - (1 + this.conic) * c * c * r2
    return sqrtvalue < 0
      ? 0
      : (c * r2) / (1 + Math.sqrt(sqrtvalue)) + this.asphericTerms.sagAt(x, y)
  }

}

export class CylinderGeometry implements Geometry {
  constructor(public radiusX: number, public radiusY: number) {}
  kind = "cylinder"

  sag(x: number, y: number) {
    return (x * x) / (2 * this.radiusX) + (y * y) / (2 * this.radiusY)
  }

}

export class AxiconGeometry implements Geometry {
  constructor(public coneAngle: number) {}
  kind = "axicon"

  sag(x: number, y: number) {
    return Math.sqrt(x * x + y * y) * Math.tan(this.coneAngle)
  }

}

/* schemas for each geometry class */

export const geometrySchemas = {
  "plane": { 
    no_parameters: { label: "No Parameters", type: "string", default: "none" }
  },
  
  "sphere": {
    radius: { label: "Radius", type: "number", default: 10 },
    conic: { label: "Conic Constant", type: "number", default: 0 }
  },

  "standard asphere": {
    radius: { label: "Radius", type: "number", default: 10 },
    conic: { label: "Conic Constant", type: "number", default: 0 },
    asphericTerms: { label: "Aspheric Terms", type: "array", default: [] }
  },

  "cylinder": {
    radiusX: { label: "Radius X", type: "number", default: 10 },
    radiusY: { label: "Radius Y", type: "number", default: 10 }
  },

  "axicon": {
    coneAngle: { label: "Cone Angle (radians)", type: "number", default: 0.1 }
  }

} as const;