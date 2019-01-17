const baseUrl = "http://localhost:8080/products"
let service;

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/config');
    const config = await response.json();

    service = new FacebookService(config);
    service.init();

    document.getElementById('login').addEventListener('click', async () => {
        const user = await login();

        showOverlay();

        /* get fb interests */
        const interests = await getUserInterests(user);
        await wait(5000)
        const animal = getAnimal(interests);

        /* animate fly out */
        document.getElementById('animal-wrapper').classList.add('flyout');
        await wait(1000)
        document.getElementById('animal-wrapper').hidden = true;

        /* show animal */
        const showAnimal = document.getElementById('chosen-animal');
        document.getElementById("animal-image").src = `img/icons/${animal}.svg`;
        showAnimal.hidden = false;
        document.getElementById("animal-image").classList.add('fadeIn');
        await wait(3000)

        /* redirect to webpage */
        window.location.href = `/products/${animal}.html`;
    })
})

function showOverlay() {
    const overlay = document.getElementById('overlay');
    const background = document.getElementById('background');
    const animals = document.getElementById('animal-wrapper');
    overlay.hidden = false;
    background.classList.add('fadeIn');
    animals.classList.add('fadeIn2');
}

async function getUserInterests(user) {
    return await service.api("me", {
        access_token: user.accessToken,
        fields: "id,name,movies{name},music{name},inspirational_people,television{name},sports"
    });
}

async function login() {
    const response = await service.login()
    const accessToken = response.credential.accessToken;
    const userId = response.additionalUserInfo.profile.id;

    return {
        userId,
        accessToken
    }

}

function getAnimal(data) {
    const animals = ["vigor", "clarity", "reason", "resolve"]
    let index = 0;

    index += data.name.split().reduce((acc, curr) => curr.charCodeAt(0), 0);

    index %= animals.length;
    return animals[index];
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

