// STORE REGISTRATION 
let alertContainer = document.getElementById('alert-container')
let alertBox = document.getElementById('alert-box')
let alertContent = document.getElementById('alert-content')

let formDiv = document.getElementById('formDiv')


document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    try {
        let response = await fetch('/store-registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                storeName: document.querySelector("[name='storeName']").value,
                storeAddress: document.querySelector("[name='storeAddress']").value,
                ownerName: document.querySelector("[name='ownerName']").value,
                email: document.querySelector("[name='email']").value,
                phoneNumber: document.querySelector("[name='phoneNumber']").value,
                password: document.querySelector("[name='password']").value
            })
        });

        let data = await response.json();
        if (!response.ok) throw new Error(`Error: ${data.message || response.status}`);

        if(data.registrationStatus){
            alertContainer.style.marginLeft = '0em'
            alertBox.style.backgroundColor = '#EFE';
            alertContainer.style.color = '#2ec946';
            alertBox.style.border = '1px solid #2ec946';
            alertContent.textContent = '✅ Store registered, redirecting to login page. . .';

            document.querySelector("form").reset();
            
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
    } catch (error){
        alertContainer.style.marginLeft = '0em'
        alertBox.style.backgroundColor = '#FEE';
        alertContainer.style.color = '#ff3838';
        alertBox.style.border = '1px solid #ff3838';
        alertContent.textContent = '⭕ Internal server error';
    }
});