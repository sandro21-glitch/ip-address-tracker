
async function getIpApi(ip) {
    const res = await fetch(`https://ipapi.co/${ip}/json/`)
    .catch(err => console.log(err))

    if(res) {
        return res.json()
    }

    return res
}

export default getIpApi