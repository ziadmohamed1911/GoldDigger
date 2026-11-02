export async function handlePrice(req, res) {
    const currentPrice =  125.52
    res.setHeader("Content-type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    setInterval(() => {
        const rawPrice = currentPrice + (Math.random() -0.5) * 10
        const priceUpdate = Math.floor(rawPrice * 100)/100
        res.write(`data:${JSON.stringify({event: "price-update", price: priceUpdate})}\n\n`)
    }, 3000)
}