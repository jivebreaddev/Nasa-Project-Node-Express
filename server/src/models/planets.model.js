const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const planets = require('./planets.mongo');
const { resourceLimits } = require('worker_threads');
const results = [];


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
        }))// Every time loadPlanetData is called in cluster, or restart the server, we will be calling load planet data many times
        // upsert operation is needed
        .on('data', async (data) =>{
            if (isHabitablePlanet(data)){
                // TO DO this has to match the schema
                await savePlanet(data);
            }// if first already exists won't do anything
            // update using upsert
            
        })
        .on('error' , (err)=> {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
    
            resolve();
        });
        
});
    // readable.pipe(writable);
}
// async on odd place make the other parts wait which cause failure 

async function GetAllPlanets(){
    return await planets.find({});
    //filter, projection(only selected fields will show up)
    //age: {$gte:18}
}
// wrong parameter lead to no debugging code at all...
// what a hard time 
async function savePlanet(data){
    try{
        await planets.updateOne({
            kepler_name: data.kepler_name,
        },{
            kepler_name: data.kepler_name,
        },{
            upsert: true,
        });
    } catch(err){
        console.error('Could not save planet');
    }
    
}

module.exports = {
    GetAllPlanets,
    loadPlanetsData,
    
};