import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        const userParent = document.querySelector("input[name='parentName']").value
        const userChild = document.querySelector("input[name='childName']").value
        const userSize = document.querySelector("input[name='partySize']").value
        const userAddress = document.querySelector("input[name='address']").value
        const userDate = document.querySelector("input[name='partyDate']").value
        const userLength = document.querySelector("input[name='length']").value
        
        const dataToAPI = {
            parentName: userParent,
            childName: userChild,
            partySize: parseInt(userSize), 
            address: userAddress,
            date: userDate, 
            length: parseInt(userLength),
        }
        sendRequest(dataToAPI)
    }
})

export const ServiceForm = () => { 
    return `<div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partySize">How many children will be in attendance?</label>
        <input type="number" name="partySize" class="input" />
    </div>
    <div class="field">
        <label class="label" for="address">Party Address</label>
        <input type="text" name="address" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyDate">Party Date</label>
        <input type="date" name="partyDate" class="input" />
    </div>
    <div class="field">
        <label class="label" for="length">Length of Reservation <span class="small">(Minimum hours is 2)</span></label>
        <input type="number" name="length" class="input" min="2" max="8"/>
    </div>

    <button class="button" id="submitRequest">Submit Request</button>
    `
}
