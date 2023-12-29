import axios from "axios"

const BASE_URL = "http://localhost:5000";

// const BASE_URL = "https://invoice-backend-nf7r.onrender.com";
// const BASE_URL = "http://backend.nextbill.io"


const instance = axios.create({
  baseURL: BASE_URL
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


// Clients

export const fetchClients = () => {
  return instance.get("/clients")
}

export const createClient = (formData) => {
  return instance.post("/clients", formData)
}

export const fetchClientById = (id) => {
  return instance.get(`/clients/${id}`)
}

export const addContactPerson = (id, formData) => {
  return instance.post(`/clients/addContactPerson/${id}`, formData)
}

export const addVisit = (id, formData) => {
  return instance.post(`/clients/addVisit/${id}`, formData);
};

export const getClientList = () => {
  return instance.get("/allClients/names")
}



// Opportunity Leads


export const fetchOleads = () => {
  return instance.get("/oleads")
}

export const createOlead = (formData) => {
  return instance.post("/oleads", formData)
}

export const editOlead = (id, formData) => {
  return instance.patch(`/oleads/${id}`, formData)
}

// Enquiries

export const createEnquiry = (formData) => {
  return instance.post("/enquiries", formData)
}

export const fetchEnquiries = () => {
  return instance.get("/enquiries")
}

export default instance
