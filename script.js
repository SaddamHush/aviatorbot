// Initialize Telegram Web App
let tg = window.Telegram.WebApp;

// Initialize the app
tg.ready();
tg.expand();

// Set the main button text and show it
tg.MainButton.setText('SHARE PREDICTION');
tg.MainButton.show();

// Get user info from Telegram
const user = tg.initDataUnsafe?.user;
if (user) {
  console.log('User:', user.first_name, user.last_name);
}

function getRandomMultiplier() {
  return (Math.random() * 9 + 1).toFixed(2) + 'x';
}

function sharePrediction(multiplier) {
  const shareText = `🚁 Aviator Prediction: ${multiplier}\n\nTry the Aviator Predictor Mini App!`;
  
  // Share via Telegram
  if (tg.isVersionAtLeast('6.1')) {
    tg.showPopup({
      title: 'Share Prediction',
      message: shareText,
      buttons: [
        {id: 'share', type: 'share', text: 'Share'},
        {id: 'close', type: 'close', text: 'Close'}
      ]
    });
  } else {
    // Fallback for older versions
    tg.sendData(JSON.stringify({
      action: 'share',
      multiplier: multiplier,
      text: shareText
    }));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Aviator-specific code (only run if on Aviator page)
  if (document.querySelector('.progress-ring__arc')) {
    const multiplierSpan = document.getElementById('multiplier');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.querySelector('.progress-ring__bar');
    const arc = document.querySelector('.progress-ring__arc');
    const circleProgress = document.querySelector('.circle-progress');
    const RADIUS = 110;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    // Set up the SVG rotating arc as a partial segment (e.g., 120°)
    const ARC_LENGTH = CIRCUMFERENCE * (120 / 360); // 120 degree arc
    arc.style.strokeDasharray = `${ARC_LENGTH} ${CIRCUMFERENCE}`;
    arc.style.strokeDashoffset = 0;
    arc.style.transform = 'rotate(-90deg)';
    arc.style.transformOrigin = '50% 50%';

    // Set up the SVG progress bar as a full arc
    progressBar.style.strokeDasharray = CIRCUMFERENCE;
    progressBar.style.strokeDashoffset = CIRCUMFERENCE;
    progressBar.style.transform = 'rotate(-90deg)';
    progressBar.style.transformOrigin = '50% 50%';

    function animateProgress(duration, callback) {
      let start = null;
      function animate(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        progressBar.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          callback();
        }
      }
      requestAnimationFrame(animate);
    }

    nextBtn.addEventListener('click', function() {
      nextBtn.disabled = true;
      multiplierSpan.style.visibility = 'hidden';
      progressBar.style.strokeDashoffset = CIRCUMFERENCE;
      circleProgress.classList.add('loading');
      
      // Haptic feedback
      if (tg.isVersionAtLeast('6.1')) {
        tg.HapticFeedback.impactOccurred('medium');
      }
      
      animateProgress(1500, () => {
        const newMultiplier = getRandomMultiplier();
        multiplierSpan.textContent = newMultiplier;
        multiplierSpan.style.visibility = 'visible';
        nextBtn.disabled = false;
        
        // Update main button text with current prediction
        tg.MainButton.setText(`SHARE ${newMultiplier} PREDICTION`);
        
        setTimeout(() => {
          progressBar.style.strokeDashoffset = CIRCUMFERENCE;
          circleProgress.classList.remove('loading');
        }, 300);
      });
    });

    // Handle main button click
    tg.MainButton.onClick(function() {
      const currentMultiplier = multiplierSpan.textContent;
      sharePrediction(currentMultiplier);
    });
  }

  // Handle back button
  tg.BackButton.onClick(function() {
    tg.close();
  });

  // Set theme colors based on Telegram theme
  function updateTheme() {
    const colorScheme = tg.colorScheme;
    const themeParams = tg.themeParams;
    
    if (colorScheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Apply Telegram theme colors if available
    if (themeParams.bg_color) {
      document.documentElement.style.setProperty('--tg-bg-color', themeParams.bg_color);
    }
    if (themeParams.text_color) {
      document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color);
    }
  }

  // Update theme on load and theme change
  updateTheme();
  tg.onEvent('themeChanged', updateTheme);

  // Winner notification randomizer for dashboard
  if (document.getElementById('winner-message')) {
    const messages = [
      'Aminata from Lagos just won $2,000!',
      'John from Abuja just won $3,000!',
      'Fatima from Kano just won $1,500!',
      'Emeka from Port Harcourt just won $2,500!',
      'Chinedu from Enugu just won $1,200!',
      'Blessing from Ibadan just won $2,800!',
      'Grace from Accra just won $1,900!',
      'Samuel from Nairobi just won $2,100!',
      'Musa from Kaduna just won $3,200!',
      'Esther from Kumasi just won $1,700!',
      'Kwame from Takoradi just won $2,600!',
      'Aisha from Maiduguri just won $2,300!',
      'Olu from Benin City just won $1,800!',
      'Ngozi from Owerri just won $2,400!',
      'Yusuf from Sokoto just won $2,900!',
      'Patience from Uyo just won $1,600!',
      'Ibrahim from Ilorin just won $2,200!',
      'Ruth from Jos just won $2,700!',
      'Kofi from Tamale just won $1,950!',
      'Linda from Warri just won $2,050!'
    ];
    function setRandomMessage() {
      const el = document.getElementById('winner-message');
      if (el) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        el.textContent = msg;
        console.log('Winner message changed to:', msg);
      }
    }
    setInterval(setRandomMessage, 3000);
    setRandomMessage();
  }
}); 