# GoldDigger 🪙

A small web app that shows a live gold price per gram and lets you "invest" an amount of money. After each purchase it shows a summary and downloads a text receipt.

**Live demo:** https://golddigger-nru9.onrender.com

> ⏳ The demo runs on a free Render instance, so it may take a few seconds to wake up on the first visit.

> ⚠️ **This is a learning project.** The gold prices are simulated and no real money or investments are involved.

## Features

- **Live price stream:** the server pushes a new price every 3 seconds using Server-Sent Events (SSE), with no page refresh.
- **Connection status:** the page shows when the live price is connected.
- **Invest form:** enter an amount and see how many grams of gold you would get at the current price.
- **Purchase summary:** a modal dialog confirms the amount paid and the grams bought.
- **Receipt download:** a `receipt.txt` file is generated in the browser and downloaded after each purchase, with the date, amount paid, price per gram, and grams received.

## Tech stack

- HTML, CSS, and vanilla JavaScript (frontend)
- Node.js with the built-in `http` module, no frameworks (backend)
- Server-Sent Events (`EventSource`) for real-time updates
- `Blob` and `URL.createObjectURL` for the receipt download
- Deployed on Render

## How it works

1. The browser opens an `EventSource` connection to `/api/handle-price`.
2. The server keeps the connection open and writes a new simulated price every 3 seconds.
3. The frontend stores the latest price and enables the **Invest Now!** button.
4. On click, the grams are calculated as `amount / price per gram`, the summary dialog opens, and the receipt file is generated and downloaded.

## Project structure

```
GoldDigger/
├── handlers/
│   ├── routeHandlers.js    # price stream handler
├── public/
│   ├── 404.html
│   ├── gold.png
│   ├── index.css
│   ├── index.html
│   └── index.js            # frontend logic
├── utils/
│   ├── getContentType.js   # maps file extensions to content types
│   ├── sendResponse.js     # response helper
│   └── serveStatic.js      # serves files from public/
├── server.js               # starts the server
└── package.json
```

## Run it locally

```bash
git clone https://github.com/ziadmohamed1911/GoldDigger.git
cd GoldDigger
npm install
npm start
```

Then open http://localhost:8000.

For auto-restart while developing:

```bash
npm run dev
```

(requires `nodemon`)

## What I learned

- Building a Node server without a framework: routing, serving static files, and setting content types.
- Why every request needs a response, otherwise the browser hangs.
- Streaming data to the browser with Server-Sent Events.
- Generating and downloading files in the browser with Blobs.
- Why a long-running Node server doesn't fit serverless hosting like Vercel, and deploying it to Render instead.
- File name case sensitivity between Windows and Linux.

## Possible improvements

- Use a real gold price API instead of simulated prices.
- Store invoices in a database.
- Add input validation messages and a purchase history.

## Author

**Ziad Mohamed**
GitHub: [@ziadmohamed1911](https://github.com/ziadmohamed1911)

Linkedin: [Ziad Mohamed](https://www.linkedin.com/in/ziad-mohamed-905a2129b/)
