const eventsource = new EventSource("/api/handle-price")
const priceText = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")

eventsource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    priceText.textContent = price
    connectionStatus.textContent = "Live Price 🟢"
}