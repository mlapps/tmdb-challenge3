import Movie from './Movie';

export default class Series extends Movie {
    constructor(obj, genres) {
        super(obj, genres);
        this._title = obj.name;
    }
}
