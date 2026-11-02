const eventsource = new EventSource("/api/handle-price")
const priceText = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")
const investForm = document.querySelector("form")
const investBtn = document.getElementById("invest-btn")
const dialouge = document.querySelector(".outputs")
const investmentAmountInput = document.getElementById("investment-amount")
const investmentSummaryText = document.getElementById("investment-summary")
const closeDialougeBtn = document.getElementById("close-btn")
const invoiceLink = document.getElementById("invoice-link")
let latestPrice = 0

eventsource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    latestPrice = data.price
    priceText.textContent = latestPrice
    connectionStatus.textContent = "Live Price 🟢"
    investBtn.disabled = false
    investBtn.textContent = "Invest Now!"
}

investBtn.addEventListener("click", (e) =>{
    e.preventDefault()

    if(!investmentAmountInput.value) return

    handleInvest()
})

closeDialougeBtn.addEventListener("click", () => {
    dialouge.close()
    investForm.reset()
})

function handleInvest(){
    const investmentAmount = Number(investmentAmountInput.value)
    if (!Number.isFinite(investmentAmount) || investmentAmount <= 0 ) return

    const price = latestPrice
    const rawAmountBought = investmentAmount / price
    const amountBought = Math.floor(rawAmountBought * 100)/100
    
    investmentSummaryText.textContent = `You just bought ${amountBought} grams (g) for $${investmentAmount}.
    You will receive documentation shortly.`
    dialouge.showModal()
    createInvoice(investmentAmount, price, amountBought)
}

async function createInvoice(investmentAmount, price, amountBought){
    const text = `
    ${new Date().toLocaleDateString}, 
    amount paid: $${investmentAmount}, 
    price per G: $${price}, 
    gold sold: ${amountBought} G`
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "receipt.txt"
    setTimeout(()=> {
        a.click()
        URL.revokeObjectURL(url)
    }, 2000)
    
}
