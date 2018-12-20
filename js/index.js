const urls = ["/html/vigor.html", "/html/clarity.html", "/html/reason.html", "/html/resolve.html"]

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/config');
    const config = await response.json();

    const service = new FacebookService(config);
    service.init();

    document.getElementById('login').addEventListener('click', async () => {
        const response = await service.login()
        const accessToken = response.credential.accessToken;
        const userId = response.additionalUserInfo.profile.id;

        const index = userId % urls.length;
        const choice = urls[index];

        window.location += choice;
    })
})



