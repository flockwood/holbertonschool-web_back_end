import Building from './5-building';

export default class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    // Call parent constructor with sqft
    super(sqft);
    
    // Validate and assign floors
    if (typeof floors !== 'number') {
      throw new TypeError('Floors must be a number');
    }
    
    this._floors = floors;
  }

  // Getter for floors
  get floors() {
    return this._floors;
  }

  // Override evacuationWarningMessage
  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors`;
  }
}
