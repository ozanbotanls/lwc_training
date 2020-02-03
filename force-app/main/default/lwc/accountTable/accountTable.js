import { LightningElement, track, wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountTableController.getAccounts';
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from 'lightning/uiRecordApi';
import { showSuccessMessage, showErrorMessage } from "c/showMessageHelper";

export default class AccountTable extends LightningElement {

    @wire(getAccounts, {searchText: '$searchText' }) accountList;
    @track searchText = '';
    @track selectedAccount;
    @track editedAccountWrapper;

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
                showSuccessMessage('Record Deleted', 'Account record deleted');
                this.handleAccountCreated();
            })
            .catch(error => {
                showErrorMessage('Error Occurred!', error.body.message);
            })
    }

    handleAccountCreated() {
        this.searchText = '';
        return refreshApex(this.accountList);
    }

    handleAccountEdit(event) {
        this.editedAccountWrapper = event.detail;
    }
}