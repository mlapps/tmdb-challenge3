import {Movie} from "./models";

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const getMovies = async()=> {
    const {results = []} = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);

    if(results.length){
        return results.map((data)=>{
            return new Movie(data);
        });
    }

    return [];
};

export const getSeries = async()=> {
    const {results = []} = await get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);

    if(results.length){
        return results.map((data)=>{
            return new Movie(data);
        });
    }

    return [];
};

const get = (url)=> {
    return fetch(url, {
        'Accept': 'application/json'
    }).then(response => {
        return response.json();
    })
};

