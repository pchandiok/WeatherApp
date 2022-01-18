document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector("#submit");
    const city = document.querySelector("#city");
    const forecast = document.querySelector("#forecast");

    submit.addEventListener('click', e => {
        e.preventDefault();
        fetch(`http://localhost:3000/?city=${city.value}`, { method: 'POST'})
            .then(res => res.json())
            .then(data => 
                {
                    forecast.innerHTML = `
                    <h2>Weather Condition: ${data.weather[0].description}</h2>
                    <h3>Country: ${data.sys.country}</h3>
                    <h3>City: ${data.name}</h3>
                    <h3>Temperature: <img src="${data.weather[0].icon}"/> ${data.main.temp} degree Celcius</h3>
                    `;
                })
            .catch(error => console.log(error))
    });
});
