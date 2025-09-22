export type StdAsphereDefinition = "standard"

export class StdAsphericTerms {
  #definition: StdAsphereDefinition
  #coeffs: number[]

  constructor(coefficients: (number | string)[], definition: StdAsphereDefinition = "standard") {
    // for performance reasons we need to ensure that you have exactly as many coefficients
    // in the array as there are coefficients in the definition, allow users to pass in less,
    // but ensure they are 0 filled for any missing ones

    if (definition !== "standard") throw new Error("Unsupported definition: " + definition)
    this.#definition = definition

    if (coefficients.length > 4) throw new Error("Too many coefficients: " + coefficients.length)
    const coeffs = [...coefficients].map((c) => c || 0) // ensure no undefined values
    while (coeffs.length < 4) coeffs.push(0) // ensure we have 4 coefficients
    this.#coeffs = coeffs.map((c) => (typeof c === "string" ? parseFloat(c) : c))
  }

  get coeffs() {
    return this.#coeffs
  }

  get definition() {
    return this.#definition
  }

  coeffAt(idx: number) {
    return this.#coeffs[idx]
  }

  setCoeffAt(idx: number, value: number) {
    this.#coeffs[idx] = value
  }

  static calcSag(asp: StdAsphericTerms, x: number, y = 0) {
    const hyp = x ** 2 + y ** 2
    switch (asp.#definition) {
      case "standard":
        return (
          asp.#coeffs[0] * hyp ** 2 +
          asp.#coeffs[1] * hyp ** 3 +
          asp.#coeffs[2] * hyp ** 4 +
          asp.#coeffs[3] * hyp ** 5
        )
      default:
        throw new Error("Unknown asphere definition: " + asp.#definition)
    }
  }

  sagAt(x: number, y = 0) {
    return StdAsphericTerms.calcSag(this, x, y)
  }

  toJSON() {
    return {
      definition: this.#definition,
      coeffs: this.#coeffs
    }
  }
}
