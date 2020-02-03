import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showSuccessMessage = (title, message) => {
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message: message,
        variant: 'success'
    }));
}

const showErrorMessage = (title, message) => {
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message: message,
        variant: 'error'
    }));
}

const showMessage = (type = 'success', title, message) => {
    this.dispatchEvent(new ShowToastEvent({
        title: title,
        message: message,
        variant: type
    }));
}

export { showSuccessMessage, showErrorMessage, showMessage }