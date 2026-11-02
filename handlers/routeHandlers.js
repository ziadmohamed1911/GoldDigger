export async function handlePrice(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive"
    })

    let currentPrice = 125.52

    const sendPrice = () => {
        currentPrice = Math.max(1, currentPrice + (Math.random() - 0.5) * 0.5)
        const price = Math.floor(currentPrice * 100) / 100
        res.write(`data: ${JSON.stringify({ event: "price-update", price })}\n\n`)
    }

    sendPrice()
    const intervalId = setInterval(sendPrice, 3000)

    req.on("close", () => {
        clearInterval(intervalId)
        res.end()
    })
}