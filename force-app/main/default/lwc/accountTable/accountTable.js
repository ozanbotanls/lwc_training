import { LightningElement, track, wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountTableController.getAccounts';
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountTable extends LightningElement {

    @wire(getAccounts, {searchText: '$searchText' }) accountList;
    @track searchText = '';
    @track selectedAccount;

    grabTextChange(event) {
        this.searchText = event.target.value;
    }

    handleSelected(event) {
        this.selectedAccount = event.target.dataset.id;
    }

    handleDeleteRecord(event) {
        let accountToDelete = event.target.dataset.id;
        deleteRecord(accountToDelete)
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Record Deleted',
                    message: 'Account record has been deleted from database',
                    variant: 'error'
                }));
                this.handleAccountCreated();
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Occurred!',
                    message: error.body.message,
                    variant: 'error'
                }));
            })
    }

    handleAccountCreated() {
        this.searchText = '';
        return refreshApex(this.accountList);
    }
}