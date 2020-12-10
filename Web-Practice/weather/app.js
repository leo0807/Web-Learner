

window.addEventListener("load",() =>{
    
    let long;
    let lat;
    let pm25 = document.querySelector('.pm25');
    let temperatureDegree = document.querySelector('.temperature-degree h2');
    let locationTimezone = document.querySelector('.location-degree');
    let tempUnit = document.querySelector('.temperature-degree span');

    let degreeDiv = document.querySelector('.degree-section');
    let tempSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const apiKeys = "N3P6cA16WWKhO1SSCfem29r8gqFZfxsC";
            const api = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${long}&unit_system=us&fields=temp%2Cweather_code%2Cpm25&apikey=${apiKeys}`;
            fetch(api).then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const temperature = data.temp.value;
                const unit = data.temp.units;
                temperatureDegree.textContent = temperature;
                pm25.textContent = data.pm25.value + ' ' + data.pm25.units;
                let celsius = (temperature - 32) * 5 / 9;
                console.log(temperature);
                degreeDiv.addEventListener('click', ()=>{
                    if(tempSpan.textContent === 'F'){
                        tempSpan.textContent = 'C';
                        temperatureDegree.textContent = celsius;
                    }else{
                        tempSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }
});