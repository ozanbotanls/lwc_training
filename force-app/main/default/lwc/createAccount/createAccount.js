import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class CreateAccount extends LightningElement {

    @track accountId;
    accountName;
    
    handleNameChange(event) {
        this.accountName = event.target.value;
    }
    createAccount() {
        if (this.accountName === '') return;
        let fields = {};
        fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
        let accountInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(accountInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Account Created',
                    message: 'You have created an account',
                    variant: 'success'
                }));

                const event = new CustomEvent('accountcreated', { detail: this.accountId }); 
                this.dispatchEvent(event);
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Occurred!',
                    message: error.body.message,
                    variant: 'error'
                }));
            });
    }
}