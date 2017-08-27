import {User} from './user';

export interface Incident{
	$key?: any,
    posted_by?: User;
	date_taken: string;
	comment?:String,
	path?: String;
	icon?: String;
	location: {
		latitude:  Number,
		longitude: Number
	};
}