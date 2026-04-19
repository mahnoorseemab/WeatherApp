//Global variables
let boxesdata
let boxes



async function default_temp() {
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
        document.getElementById("temp_C").innerText = data.current.temp_c + " " + "°C"
        document.getElementById("temp_F").innerText = data.current.temp_f + " " + "F"
        document.getElementById("visibility").innerText = data.current.condition.text
        document.getElementById("humidity").innerText = data.current.humidity + " " + "%"
        document.getElementById("wind_status").innerText = data.current.wind_kph + " " + "kph"
        document.getElementById("feels_like").innerText = data.current.feelslike_c + " " + "°C"
        document.getElementById("heatindex_c").innerText = data.current.heatindex_c + " " + "°C"
        document.getElementById("lat").innerText = data.location.lat + "°"
        document.getElementById("lon").innerText = data.location.lon + "°"
        console.log(data)
    }
    catch (error) {
        console.log(error.message)
    }
}
default_temp()//bydefault rawalpindi ka hi show ho gaaa

let input = document.getElementById("search_input")
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        current_temp()
    }
})


async function current_temp() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9e8a87285be44e4188a180754260403&q=${document.getElementById("search_input").value}`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        document.getElementById("city").innerText = data.location.name
        document.getElementById("region").innerText = data.location.region
        document.getElementById("country").innerText = data.location.country
        document.getElementById("date").innerText = data.location.localtime
        document.getElementById("day").innerText = setDay()
        document.getElementById("temp_C").innerText = data.current.temp_c + " " + "°C"
        document.getElementById("temp_F").innerText = data.current.temp_f + " " + "F"
        document.getElementById("visibility").innerText = data.current.condition.text
        document.getElementById("humidity").innerText = data.current.humidity + " " + "%"
        document.getElementById("wind_status").innerText = data.current.wind_kph + " " + "kph"
        document.getElementById("feels_like").innerText = data.current.feelslike_c + " " + "°C"
        document.getElementById("heatindex_c").innerText = data.current.heatindex_c + " " + "°C"
        document.getElementById("lat").innerText = data.location.lat + "°"
        document.getElementById("lon").innerText = data.location.lon + "°"
        console.log(data)
    }
    catch (error) {
        console.log(error.message)
    }
}


//By-default rawalpindi's data will be displayed
async function default_forecast_temp() {
    try {
        const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=9e8a87285be44e4188a180754260403&q=Rawalpindi&days=14")
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        let forecast_wrapper = document.createElement("div")
        forecast_wrapper.classList.add("forecast_wrapper0")
        let arr = data.forecast.forecastday

        for (let index = 0; index < arr.length; index++) {
            let forecast0 = document.createElement("div")
            forecast0.classList.add("forecast_section0")
            forecast0.innerHTML =
                `<div class="forecast_section1">
            <span class ="forecast_day"></span>
            <span class ="forecast_date"></span>
            <span class ="forecast_icon">
            <img class="icon" src="" alt=""</img>
            </span>
            <span class ="forecast_temp"></span>   
            <button class ="btn" data-index="${index}">View Hourly Conditions</button>                      
            </div>`
            forecast_wrapper.appendChild(forecast0)
            let newright = document.getElementsByClassName("right")
            newright[0].appendChild(forecast_wrapper)
            console.log(forecast0)

            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            forecast0.querySelector(".forecast_day").innerText = dayNames[new Date(arr[index].date).getDay()]
            forecast0.querySelector(".forecast_date").innerText = arr[index].date.split("-")[2]
            forecast0.querySelector(".forecast_temp").innerText = arr[index].day.maxtemp_c + " " + "°C"
            forecast0.querySelector(".icon").src = arr[index].day.condition.icon
            console.log(arr[index])
        }
        console.log(data)

        //for displaying hourly weather.....
        let hourly = document.createElement("div")
        hourly.classList.add("hourly_weather")
        let newright = document.getElementsByClassName("right")
        newright[0].appendChild(hourly)

        //create boxes
        for (let index = 0; index < 24; index++) {
            boxes = document.createElement("div")
            boxes.classList.add("hourly_box")
            hourly.appendChild(boxes)
            boxes.innerHTML =
                `<div class="time_temp">
            <span id="boxtime"></span>
            <span id = "boxicon">
            <img class = "boxiconimg" src="" alt="">
            </span>
            <span id="boxtemp"></span>
            </div>`
        }
        let buttons = document.querySelectorAll(".btn")
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                let indexofbtn = event.target.dataset.index
                boxesdata = arr[indexofbtn].hour

                let boxesarr = document.querySelectorAll(".hourly_box")
                for (let index = 0; index < boxesarr.length; index++) {
                    boxesarr[index].querySelector("#boxtemp").innerText = boxesdata[index].temp_c + " " + "°C"
                    boxesarr[index].querySelector("#boxtime").innerText = twelvehrsformat(boxesdata[index].time.split(" ")[1].split(":")[0])
                    boxesarr[index].querySelector(".boxiconimg").src = boxesdata[index].condition.icon
                }
            })
        })
    }
    catch (error) {
        console.log(error)
    }
}

default_forecast_temp()


function setDay() {
    let date = new Date()
    let day = date.getDay()
    let d;
    if (day == "0") {
        d = "Sunday"
        return d
    } else if (day == "1") {
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
    }
    console.log(d)
}


function twelvehrsformat(hour) {
    let time;
    if (hour == "00") {
        time = "12" + "AM"
        return time
    } else if (hour > "00" && hour < 12) {
        time = hour + "AM"
        return time
    } else if (hour == 12) {
        time = hour + "PM"
        return time
    } else if (hour > 12 && hour < 24) {
        time = parseInt(hour) - 12 + "PM"
        return time
    }
}
