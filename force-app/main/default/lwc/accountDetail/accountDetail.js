import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import { getRecord } from 'lightning/uiRecordApi';

export default class AccountDetail extends LightningElement {
    @api accountId;
    
    @wire(getRecord, { recordId: '$accountId', fields: [ ACCOUNT_ID, ACCOUNT_NAME ] } )
    account

    get accountId_ui() {
        return this.account.data.fields.Id.value;
    }
    get accountName_ui() {
        return this.account.data.fields.Name.value;
    }

    // @track accountId_ui;
    // @track accountName_ui;
    // @wire(getRecord, { recordId: '$accountId', fields: [ ACCOUNT_ID, ACCOUNT_NAME ] } )
    // account({error, data}) {
    //     if (error) {
    //         // TODO: Error handling
    //     } else if (data) {
    //         this.accountId_ui = data.fields.Id.value;
    //         this.accountName_ui = data.fields.Name.value;
    //     }
    // }
}