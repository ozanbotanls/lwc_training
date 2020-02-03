import { LightningElement, track } from 'lwc';

export default class ChartApp extends LightningElement {
    @track percentage = 10;

    handlePercentageChange(event) {
        this.percentage = event.target.value;
    }
}