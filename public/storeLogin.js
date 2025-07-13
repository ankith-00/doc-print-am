// STORE LOGIN
let alertBox = document.getElementById('alert-box')
let alertContent = document.getElementById('alert-content')

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    
    try {
        let response = await fetch('/logto-dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                store_ID: document.querySelector("[name='store_ID']").value,
                password: document.querySelector("[name='password']").value
            })
        });

        let data = await response.json();

        if (!response.ok) throw new Error(`Error: ${data.message || response.status}`);

        if(!data.loginStatus){
            
            // ALERT BOX CSS 
            alertBox.style.backgroundColor = '#FEE';
            alertContent.style.color = '#ff3838';
            alertBox.style.border = '1px solid #ff3838';
            alertContent.textContent = `⭕ ${data.message}`;
            document.querySelector("form").reset();
        
        }

        if (data.loginStatus) {

            // ALERT BOX CSS
            alertBox.style.backgroundColor = '#EFE';
            alertContent.style.color = '#2ec946';
            alertBox.style.border = '1px solid #2ec946';
            alertContent.textContent = '✅ LOGED IN';
            
            // REDIRECT TO DASHBOARD AFTER : '1.5 SEC'
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);   
        }
        
    } catch (error){
        console.log(error);
        
        alertBox.style.backgroundColor = '#FEE';
        alertContent.style.color = '#ff3838';
        alertBox.style.border = '1px solid #ff3838';
        alertContent.textContent = `⭕ ${error.message}`;
        document.querySelector("form").reset();
        document.querySelector("form").reset();
    }
});