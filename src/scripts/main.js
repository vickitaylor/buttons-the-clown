import { PartyList } from "./party.js";
import { fetchCompletions, fetchRequests, fetchWorkers } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")


const render = () => { 
    fetchRequests()
    .then(() => fetchWorkers())
    .then(() => fetchCompletions())
    .then(() => {
        mainContainer.innerHTML = PartyList()
    })
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
