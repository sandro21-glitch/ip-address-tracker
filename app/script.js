
import getIpApi from "./fetch.js";
import {    
    ipEl,
    locationEl,
    utcEl,
    ispEl,
    formSubmit,
    snapEl,
    btnClose,
    spinnerEl,
    mainContainer,
    userContainer
}
from "./htmlImports.js"

let map;

function leafletDisplay(lat, lng, ip) {

    const latitude = lat
    const longitude = lng
    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([latitude, longitude]).addTo(map)
    .bindPopup(`<strong>IP: ${ip}</strong>`)
    .openPopup();
}
btnClose.addEventListener('click', () => {
    snapEl.classList.add('hidden')
    window.location.reload()
})
async function getFullData(userIp) {
    try {
        snapEl.classList.add('hidden')
        const data = await getIpApi(userIp)
        // console.log(data)
        spinnerEl.classList.add('hidden')
        mainContainer.classList.remove('hidden')
        const { ip, city, region, country_name, org, latitude, longitude, utc_offset } = data
        
        ipEl.innerText = ip
        locationEl.innerText = `${city}, ${region}, ${country_name}`
        utcEl.innerText = utc_offset
        ispEl.innerText = org

        leafletDisplay(latitude, longitude, ip)

    }
    catch {
        mainContainer.classList.add('invisible')
        snapEl.classList.remove('hidden')
        snapEl.classList.add('flex')
        console.log('err')
        userContainer.classList.add('hidden')
    }   
}

const input = document.getElementById("input")
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()
    const ipValue = input.value
    getFullData(ipValue)
    if(map) { 
        map = map.off(); 
        map = map.remove();
    }
    input.value = null
})

function locationOnLoad() {
    fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => getFullData(data.ip))
}


window.addEventListener("DOMContentLoaded", locationOnLoad)