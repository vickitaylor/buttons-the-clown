// assigning api address to a variable
const API = "http://localhost:8088"

// created an object to hold the temporary state
const applicationState = {
    "parties": [],
    "workers": [],
    "jobs": []
}

// assigning mainContainer to a variable on this module.
const mainContainer = document.querySelector("#container")

// getter functions so that other modules can access the state
export const getParties = () => {
    return applicationState.parties.map(party => ({...party}))
}
export const getWorkers = () => {
    return applicationState.workers.map(worker => ({...worker}))
}
export const getJobs = () => {
    return applicationState.jobs.map(job => ({...job}))
}

// defined an export function to get the fetch request from the api that will store the external state in the application state on this module.
export const fetchRequests = () => {
    return fetch(`${API}/parties`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.parties = data
            }
        )
}

// defining an exported function to send the requested data to the api
export const sendRequest = (userServiceRequest) => { 
    const fetchOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/parties`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// defining an export function to delete a party from the api
export const deleteRequest = (id) => { 
    return fetch(`${API}/parties/${id}`, {method: "DELETE"})
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// defining an export function that will fetch the workers from the api
export const fetchWorkers = () => { 
    return fetch(`${API}/workers`)
    .then(response => response.json())
    .then((data) => {
        applicationState.workers= data
    })
}

// 
export const saveCompletion = (requestComplete) => {
    const fetchOptions = {
        method:"POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestComplete)
    }
    return fetch(`${API}/jobs`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

// 
export const fetchCompletions = () => { 
    return fetch(`${API}/jobs`)
        .then(response => response.json())
        .then((data) => {
            applicationState.jobs= data
        })
}