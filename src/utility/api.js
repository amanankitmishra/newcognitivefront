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

export const fetchAllVisits = () => {
  return instance.get("/visits");
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

export const fetchOleadById = (id) => {
  return instance.get(`/oleads/${id}`)
}

// Enquiries

export const createEnquiry = (formData) => {
  return instance.post("/enquiries", formData)
}

export const fetchEnquiries = () => {
  return instance.get("/enquiries")
}

export const editEnquiry = (id, formData) => {
  return instance.patch(`/enquiries/${id}`, formData)
}

export const fetchEnquiryById = (id) => {
  return instance.get(`/enquiries/${id}`)
}

export const deleteEnquiry = (id) => {
  return instance.delete(`/enquiries/${id}`)
}




// BOQ

export const createBoq = (formData) => {
  return instance.post("/boqs", formData)
}

export const fetchBoqs = () => {
  return instance.get("/boqs");
}

export const editBoq = (id, formData) => {
  return instance.patch(`/boqs/${id}`, formData)
}


//Proposal

export const createProposal = (formData) => {
  return instance.post("/proposals", formData)
}

export const fetchProposals = () => {
  return instance.get("/proposals")
}

export const fetchLiveProposals = () => {
  return instance.get("/liveproposals")
}

export const fetchLiveHotProposals = () => {
  return instance.get("/livehotproposals")
}

export const fetchcontractorproposals = () => {
  return instance.get("/contractorproposals")
}

export const fetchconsultantproposals = () => {
  return instance.get("/consultantproposals")
}

export const fetchProposalById = (id) => {
  return instance.get(`/proposals/${id}`)
}

export const editProposal = (id, formData) => {
  return instance.put(`/proposals/${id}`, formData)
}

export const deleteProposal = (id) => {
  return instance.delete(`/proposals/${id}`)
}

//Sales Order

export const fetchSalesOrder = () => {
  return instance.get('/salesOrders')
}

export const createSalesOrder = (formData) => {
  return instance.post('salesOrders', formData)
}

export const fetchSalesOrderById = (id) => {
  return instance.get(`/salesOrders/${id}`)
}

export const editSalesOrder = (id, formData) => {
  return instance.patch(`/salesOrders/${id}`, formData)
}

export const deleteSalesOrder = (id) => {
  return instance.delete(`/salesOrders/${id}`)
}


// Users

export const fetchAllUsers = () => {
  return instance.get('/users')
}

export const createUser = (formData) => {
  return instance.post('/users', formData)
}


export default instance
