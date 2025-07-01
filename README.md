# Aviator Predictor - Telegram Mini App

A Telegram Mini App that predicts Aviator game multipliers with an animated circular progress indicator.

## Features

- 🚁 Animated circular progress indicator
- 🎯 Random multiplier predictions
- 📱 Telegram Mini App integration
- 🎨 Responsive design
- 🌙 Dark/Light theme support
- 📤 Share predictions with friends

## Setup Instructions

### 1. Create a Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Save the bot token for later use

### 2. Configure Mini App

1. Send `/newapp` to BotFather
2. Select your bot
3. Choose "Mini App" as the app type
4. Set the app title: "Aviator Predictor"
5. Set the app short description: "Predict Aviator game multipliers"
6. Upload your app icon (use the logo.png file)
7. Set the app URL to your deployed website

### 3. Deploy Your App

You can deploy this app to any static hosting service:

#### Option A: GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Enable GitHub Pages from main branch
5. Use the provided URL as your app URL

#### Option B: Netlify
1. Drag and drop the folder to [netlify.com](https://netlify.com)
2. Get the deployment URL
3. Use this URL as your app URL

#### Option C: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Use the deployment URL as your app URL

### 4. Configure Bot Commands

Send this to BotFather:
```
/setcommands
@your_bot_username
start - Start the Aviator Predictor
predict - Get a new prediction
```

### 5. Update Bot Handle

In `index.html`, replace `@your_bot_handle` with your actual bot handle.

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # JavaScript logic and Telegram integration
├── logo.png            # App logo
├── background.png      # Background image
└── README.md           # This file
```

## Telegram Mini App Features

- **Main Button**: Shows current prediction and allows sharing
- **Back Button**: Closes the mini app
- **Theme Support**: Automatically adapts to user's Telegram theme
- **Haptic Feedback**: Provides tactile feedback on interactions
- **User Data**: Can access user information (if permitted)
- **Sharing**: Integrated sharing functionality

## Customization

### Colors
- Primary: `#ff2d2d` (Red)
- Secondary: `#800020` (Dark Red)
- Accent: `#2ecc40` (Green)

### Animations
- Progress ring rotation: 2s linear infinite
- Progress bar animation: 1.5s duration
- Button hover effects: 0.2s ease

## Browser Support

- Chrome/Edge (Chromium-based)
- Safari (iOS/macOS)
- Firefox
- Telegram Web App environment

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the developer. 