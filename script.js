const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// User setup
const user = tg.initDataUnsafe.user;
document.getElementById('username').innerText = user ? `${user.first_name}` : "Pro User";

// Points storage
let points = parseInt(localStorage.getItem('userPoints') || 0);
document.getElementById('balance').innerText = points;

// AdsGram setup
const AdController = window.Adsgram.init({ blockId: "23009" });

async function watchAd() {
    const status = document.getElementById('status-bar');
    const btn = document.getElementById('adBtn');
    
    btn.disabled = true;
    status.innerText = "Connecting to Ad Server...";

    try {
        const result = await AdController.show();
        
        // Success Logic
        points += 100;
        localStorage.setItem('userPoints', points);
        document.getElementById('balance').innerText = points;
        
        status.innerText = "✅ Success: +100 Points added";
        tg.showAlert("Congratulations! 100 Points have been added to your balance.");
        
    } catch (error) {
        // Error handling
        status.innerText = "❌ Ad Error or Skipped";
        tg.showAlert("Ad was not completed. Please try again to earn points.");
    } finally {
        btn.disabled = false;
    }
}