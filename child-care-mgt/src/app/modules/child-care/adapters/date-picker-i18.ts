import {  inject, Injectable } from '@angular/core';
import {  NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { } from '@angular/forms';

//This translations could be define in the translation files
//We define them here in sake of the clarity of the adapter.
const I18N_VALUES = {
	de: {
		weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
		shortMonths: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        Months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
	},
	en: {
		weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
		shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	},
};

// Define a service holding the language. 
@Injectable()
export class I18n {
	language = navigator.language.split("-")[0] == 'de' ? 'de' : 'en';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	private _i18n = inject(I18n);

	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	}
	
	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].shortMonths[month - 1];
	}
	getMonthFullName(month: number): string {
		return I18N_VALUES[this._i18n.language].Months[month - 1];
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}