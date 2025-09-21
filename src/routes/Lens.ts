import { Surface } from "./surface"

export class Lens {
  constructor(
    public diameter: number, 
    public thickness: number, 
    public material: string, 
    public surf1: Surface, 
    public surf2: Surface ) {}
}