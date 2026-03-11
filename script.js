

function setDay() {
    let date = new Date()
    let day = date.getDay()
    let d;
    if (day == "1") {
        d = "Monday"
        return d
    } else if (day == "2") {
        d = "Tuesday"
        return d
    } else if (day == "3") {
        d = "Wednesday"
        return d
    } else if (day == "4") {
        d = "Thursday"
        return d
    } else if (day == "5") {
        d = "Friday"
        return d
    } else if (day == "6") {
        d = "Saturday"
        return d
    } else if (day == "7") {
        d = "Sunday"
        return d
    }
}

async function current_temp() {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?key=9e8a87285be44e4188a180754260403&q=Rawalpindi")
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        document.getElementById("city").innerText = data.location.name
        document.getElementById("region").innerText = data.location.region
        document.getElementById("country").innerText = data.location.country
        document.getElementById("date").innerText = data.location.localtime
        document.getElementById("day").innerText = setDay()
        document.getElementById("temp_C").innerText = data.current.temp_c
        document.getElementById("temp_F").innerText = data.current.temp_f
        document.getElementById("visibility").innerText = data.current.condition.text
        document.getElementById("humidity").innerText = data.current.humidity
        document.getElementById("wind_status").innerText = data.current.wind_kph
        document.getElementById("feels_like").innerText = data.current.feelslike_c
        document.getElementById("UV").innerText = data.current.uv
        console.log(data)
    }
    catch (error) {
        console.log(error.message)
    }
}

current_temp()

