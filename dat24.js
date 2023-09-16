const fs = require('fs');
const readline = require('readline');
const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];
  const strcities = JSON.stringify(cities)
async function createinput(){
     fs.writeFileSync('input.txt', strcities,(err)=>{
        if(err) console.log('error ');
    });
}
async function fetchdata(lat,lng){
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
    const data = await response.json();
    return data;
    }
let dataobj;
    fs.readFile('input.txt',(err,data)=>{
        if(err){
            console.log("error while fetching data from input.txt");
            return;
        }
            dataobj = JSON.parse(data)
            
    })

async function getinput(){
    rl.question(`Enter the city you want to search for : `, async (cityName) => {
        console.log("you chose " + cityName);
        let cityFound = false;
    
        for (let i = 0; i < dataobj.length; i++) {
            let current = dataobj[i];
            if (current.name.toLowerCase() === cityName.toLowerCase()) {
                console.log(current.name);
                const d = await fetchdata(current.lat, current.lng);
                console.log("Name is : " + current.name + " Weather : " + JSON.stringify(d));
                cityFound = true;
                fs.writeFile(`${current.name}.txt`,JSON.stringify(d),(err)=>{
                    if(!err)console.log("file created successfully")
                    else{console.log('error while creating file')}
                });
                break;  
            }
        }
    
        if (!cityFound) {
            console.log("Enter correct city");
        }
    });
    }
getinput();