import { urgentAndImportantColor, urgentColor, importantColor, normalColor } from "../assets/jss/colors";
import { FLAG_URGENT,FLAG_IMPORTANT, FLAG_UNI } from "../assets/conf/tasks";


export function isFieldValid(field) {
	if (field.errorText !== '') return false;
	if (field.validation.required === true && !field.touched) return false;
	return true;
}

export function checkValidity(value, rules) {

	if (!rules) {
		return '';
	}

	if (rules.required && value.trim() === '') {
		return 'Please fill in this field';
	}

	if (rules.minLength && value.length < rules.minLength) {
		return 'Too short';
	}

	if (rules.maxLength && value.length > rules.minLength) {
		return 'Too long';
	}

	if (rules.regexp && !rules.regexp.test(value)) {
		return 'Invalid format';
	}

	return ''
}

export function getImportanceColor(value) {
	if (FLAG_UNI & value === FLAG_UNI) { // Urgent and important
		return urgentAndImportantColor;
	}
	if (FLAG_URGENT & value) { // Urgent 
		return urgentColor;
	}
	if (FLAG_IMPORTANT & value) { // Important 
		return importantColor;
	}
	return normalColor;
}

/* STOCK */

// An example of deep comparison, thanks to: https://gist.github.com/nicbell/6081098

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (let p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] !== obj2[p]) return false;
		}
	}

	//Check object 2 for any extra properties
	for (let p2 in obj2) {
		if (typeof (obj1[p2]) === 'undefined') return false;
	}
	return true;
};

