# Setup Instructions
## System setup
1. Clone the repo with `git clone https://github.com/kumarpit/stripe-react-native.git` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `npm install`
4. Once `npm install` is completed, run `npm start` to start the expo and react-native server

If you see a QR code on the terminal as a result of `npm start` command, then you are good to go!

## Server setup
1. Navigate to the `server` directory in terminal and run `npm install` to install all dependencies
2. Create a `.env` file in the project's root directory and define `PUBLISHABLE_KEY` and `SECRET_KEY` from stripe
3. Run `npm start` to start the server

The server should now be running at `http://localhost:3000`

## Mobile setup
1. Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps here.
2. Scan the QR code shown on the terminal.
3. Once the QR code is successfully scanned, it will take few seconds to load and render the app.
