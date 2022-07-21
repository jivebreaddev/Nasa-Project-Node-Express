const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');

const { resourceLimits } = require('worker_threads');
const results = [];
const habitablePlanets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition' ] === 'CONFIRMED' 
     && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
     && planet['koi_prad'] < 1.6;
  
}
/*
const promise = new Promise((resolve, reject) => {
    resolve(42);
});
promise.then((result) => {

});
const result = await promise;
*/

function loadPlanetsData(){
    return new Promise((resolve,reject) => {
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
        .pipe(parse({
            comment: "#",
            columns: true,
        }))
        .on('data', (data) =>{
            if (isHabitablePlanet(data)){
                habitablePlanets.push(data);
            }
            
        })
        .on('error' , (err)=> {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
        
            console.log(`${habitablePlanets.length}`);
            console.log('done');
            resolve();
        });
        
});
    // readable.pipe(writable);
}
// async on odd place make the other parts wait which cause failure 

function GetAllPlanets(){
    return habitablePlanets;
}

module.exports = {
    GetAllPlanets,
    loadPlanetsData,
    
};