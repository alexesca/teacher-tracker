import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidatorsService {

    constructor() { }

    //Validator functions
    emailValidator(c: FormControl) {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!EMAIL_REGEXP.test(c.value) && c.value !== "") {
            return { "incorrectMailFormat": true };
        }
        return null;
    }

    //Only letters Validators
    onlyLettersValidator(c: FormControl) {
        var LETTERS_REGEXP = /^[a-zA-Z ]+$/;
        if (!LETTERS_REGEXP.test(c.value)) {
            return { "incorrectValueFormat": true };
        }
        return null;
    }

    //Only numbers Validators
    onlyNumbersValidator(c: FormControl) {
        if (c.value !== "") {
            let NUMBERS_REGEX = /^[0-9]*$/;
            if (!NUMBERS_REGEX.test(c.value)) {
                return { "incorrectValueFormat": true };
            }
            return null;
        }
        return null;
    }
}