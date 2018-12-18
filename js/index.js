document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('http://localhost:3000/config');
    const config = await response.json();
    
    const service = new FacebookService(config);
    service.init();

    document.getElementById('login').addEventListener('click', async () => {
        const response = await service.login()
        const accessToken = response.credential.accessToken;
        const userId = response.additionalUserInfo.profile.id;
        const res = await service.api(`/${userId}/picture?height=100&width=100&redirect=false`);

        console.log(accessToken);
        console.log(res);
    })
})



