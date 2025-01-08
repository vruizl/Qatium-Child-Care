import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateParserFormatter {
  parse(value: string): NgbDateStruct
  {
    if (!value)
      return null
     let parts=value.split('/');
     return {day:+parts[0],month:+parts[1],year:+parts[2]} as NgbDateStruct

  }
  format(date: NgbDateStruct): string
  {
    return date?date.day+"/"+('0'+date.month).slice(-2)+"/"+('0'+date.year).slice(-4):null
  }
}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '/';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
        return date?date.day+"/"+('0'+date.month).slice(-2)+"/"+('0'+date.year).slice(-4):null
	}
}
