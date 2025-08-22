export default class Airport {
    constructor(name, code) {
      // Validate and assign values
      if (typeof name !== 'string') {
        throw new TypeError('Name must be a string');
      }
      if (typeof code !== 'string') {
        throw new TypeError('Code must be a string');
      }
      
      this._name = name;
      this._code = code;
    }
  
    // Override the default string representation
    toString() {
      return this._code;
    }
  
    // Override the default primitive value (for string coercion)
    get [Symbol.toStringTag]() {
      return this._code;
    }
  }
  