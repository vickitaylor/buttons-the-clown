import { getParties, getWorkers, deleteRequest, saveCompletion } from "./dataAccess.js"

export const Requests = () => { 
  const parties = getParties()
  const workers = getWorkers()

  const sortParties =parties.sort((a, b) => {
    let da = new Date(a.date),
        db= new Date(b.date);
    return da - db;
  })
  
  const partyList = (sortParties) => { 
    return `<li class="list_items">
      ${sortParties.parentName} requested a party on ${sortParties.date} for ${sortParties.partySize} children for ${sortParties.length} hours.
      
      <select class="clowns" id="clowns">
        <option view="">Choose</option>
        ${workers.map(
          worker => {
            return `<option value="${sortParties.id}--${worker.id}">${worker.name}</option>`
          }
        ).join("")
      }
      </select>

      <button class="request__delete"
        id="request--${sortParties.id}">
        Deny
      </button>
    </li>`
  }

  let html = `<ul>
    ${sortParties.map(partyList).join("")}
  </ul>`

  return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
  if (click.target.id.startsWith("request--")) {
    const [,requestId] =click.target.id.split("--")
    deleteRequest(parseInt(requestId))
  }
})

mainContainer.addEventListener(
  "change", (event) => {
    if (event.target.id === "clowns") {
      const [requestId, workerId] = event.target.value.split("--")

      const completed = {
        requestId: parseInt(requestId), 
        workerId: parseInt(workerId),
        date_created: Date.now()
      }
      saveCompletion(completed)
    }
  }
)