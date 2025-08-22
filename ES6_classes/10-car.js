export default class Car {
    constructor(brand, motor, color) {
      this._brand = brand;
      this._motor = motor;
      this._color = color;
    }
  
    // Use Symbol.species to ensure cloneCar returns the correct class type
    static get [Symbol.species]() {
      return this;
    }
  
    cloneCar() {
      const Species = this.constructor[Symbol.species];
      return new Species();
    }
  }
