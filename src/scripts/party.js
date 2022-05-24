import { Requests } from './requests.js'
import { ServiceForm } from './serviceForm.js'

export const PartyList = () => { 
    return `
    <h1>Buttons and Lollipop the Clowns</h1>
    <section class="partyForm">
        ${ServiceForm()}
    </section>

    <section class="partyRequests">
        <h2>Party Requests</h2>
        ${Requests()}
    </section>
    `
}