const baseUrl = "http://localhost:5500/products"
let service;

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/config');
    const config = await response.json();

    service = new FacebookService(config);
    service.init();

    document.getElementById('login').addEventListener('click', async () => {
        const data = await getUserData();
        window.location = getUrl(data);
    })
})

async function getUserData() {
    const response = await service.login()
    const accessToken = response.credential.accessToken;
    const userId = response.additionalUserInfo.profile.id;

    return await service.api("me", {
        access_token: accessToken,
        fields: "id,name,movies{name},music{name},inspirational_people,television{name},sports"
    });
}

function getUrl(data) {
    const urls = ["/vigor.html", "/clarity.html", "/reason.html", "/resolve.html"]
    let index = 0;

    for (let artist of data.music.data) {
        index += artist.name.split().reduce((acc, curr) => curr.charCodeAt(0), 0);
    }

    index %= urls.length;

    const choice = urls[index];
    return `${baseUrl}${choice}`;
}



