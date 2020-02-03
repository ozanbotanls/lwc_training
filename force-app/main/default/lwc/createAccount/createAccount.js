import { LightningElement, track, api } from 'lwc';
import { createRecord, updateRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ID_FIELD from '@salesforce/schema/Account.Id';
import { showSuccessMessage, showErrorMessage } from "c/showMessageHelper";

export default class CreateAccount extends LightningElement {

    @track accountId;
    accountName;
    @api editedAccountObject;
    
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
                showSuccessMessage('Account Created', 'You have created an account');
                const event = new CustomEvent('accountcreated', { detail: this.accountId }); 
                this.dispatchEvent(event);
            })
            .catch(error => {
                showErrorMessage('Error Occurred!', error.body.message);
            });
    }

    editAccount() {
        if (this.accountName === '' || this.editedAccountObject === '') return;
        let fields = {};
        fields[ID_FIELD.fieldApiName] = this.editedAccountObject.accountId;
        fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
        let accountToUpdate = { fields };
        updateRecord(accountToUpdate)
            .then(updatedAccount => {
                showSuccessMessage('Account Updated', 'You have updated the account');
                const event = new CustomEvent('accountcreated', { detail: updatedAccount.id }); 
                this.dispatchEvent(event);
                //reset edit form and render empty create form
                this.resetForm();
            })
            .catch(error => {
                showErrorMessage('Error Occurred!', error.body.message);
            });
    }

    resetForm = () => {
        this.editedAccountObject = undefined;
        this.accountId = '';
    }

}