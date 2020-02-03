import { LightningElement, api } from 'lwc';

export default class BarComponent extends LightningElement {
    @api percentage;
    
    get style() {
        return `width: ${this.percentage}%`;
    }
}