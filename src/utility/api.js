import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'

const BASE_URL = 'https://sea-lion-app-p56d8.ondigitalocean.app'

const instance = axios.create({
  baseURL: BASE_URL
})

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export function getStaticFileUrl(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, '/')

  return `${BASE_URL}/${normalizedPath}`
}

// Clients

export const fetchClients = () => {
  return instance.get('/clients')
}

export const createClient = formData => {
  return instance.post('/clients', formData)
}

export const fetchClientById = id => {
  return instance.get(`/clients/${id}`)
}

export const addContactPerson = (id, formData) => {
  return instance.post(`/clients/addContactPerson/${id}`, formData)
}

export const editContactPersons = (clientId, contactPersonId, formData) => {
  return instance.patch(`/clients/editContactPerson/${clientId}/contactPersons/${contactPersonId}`, formData)
}

export const deleteContactPerson = (clientId, contactPersonId) => {
  return instance.delete(`/clients/deleteContactPerson/${clientId}/contactPersons/${contactPersonId}`)
}

export const addVisit = (id, formData) => {
  return instance.post(`/clients/addVisit/${id}`, formData)
}

export const getClientList = () => {
  return instance.get('/allClients/names')
}

export const fetchAllVisits = () => {
  return instance.get('/visits')
}

export const deleteClient = id => {
  return instance.delete(`/clients/${id}`)
}

// Opportunity Leads

export const fetchOleads = () => {
  return instance.get('/oleads')
}

export const createOlead = formData => {
  return instance.post('/oleads', formData)
}

export const editOlead = (id, formData) => {
  return instance.patch(`/oleads/${id}`, formData)
}

export const fetchOleadById = id => {
  return instance.get(`/oleads/${id}`)
}

// Enquiries

export const createEnquiry = formData => {
  return instance.post('/enquiries', formData)
}

export const fetchEnquiries = () => {
  return instance.get('/enquiries')
}

export const editEnquiry = (id, formData) => {
  return instance.patch(`/enquiries/${id}`, formData)
}

export const fetchEnquiryById = id => {
  return instance.get(`/enquiries/${id}`)
}

export const deleteEnquiry = id => {
  return instance.delete(`/enquiries/${id}`)
}

// BOQ

export const createBoq = formData => {
  return instance.post('/boqs', formData)
}

export const fetchBoqs = () => {
  return instance.get('/boqs')
}

export const editBoq = (id, formData) => {
  return instance.patch(`/boqs/${id}`, formData)
}

//Proposal

export const createProposal = formData => {
  return instance.post('/proposals', formData)
}

export const fetchProposals = () => {
  return instance.get('/proposals')
}

export const fetchLiveProposals = () => {
  return instance.get('/liveproposals')
}

export const fetchLiveHotProposals = () => {
  return instance.get('/livehotproposals')
}

export const fetchcontractorproposals = () => {
  return instance.get('/contractorproposals')
}

export const fetchconsultantproposals = () => {
  return instance.get('/consultantproposals')
}

export const fetchProposalById = id => {
  return instance.get(`/proposals/${id}`)
}

export const editProposal = (id, formData) => {
  return instance.put(`/proposals/${id}`, formData)
}

export const deleteProposal = id => {
  return instance.delete(`/proposals/${id}`)
}

export const addRevisionToProposal = (id, formData) => {
  return instance.post(`/addRevision/${id}`, formData)
}

//Sales Order

export const fetchSalesOrder = () => {
  return instance.get('/salesOrders')
}

export const createSalesOrder = formData => {
  return instance.post('salesOrders', formData)
}

export const fetchSalesOrderById = id => {
  return instance.get(`/salesOrders/${id}`)
}

export const editSalesOrder = (id, formData) => {
  return instance.patch(`/salesOrders/${id}`, formData)
}

export const deleteSalesOrder = id => {
  return instance.delete(`/salesOrders/${id}`)
}

// Users

export const fetchAllUsers = () => {
  return instance.get('/users')
}

export const createUser = formData => {
  return instance.post('/users', formData)
}

// Analytics

export const fetchAllAnalytics = () => {
  return instance.get('/allAnalytics')
}

export const fetchProposalReports = () => {
  return instance.get('/proposalReports')
}

export const fetchEnquiryReports = () => {
  return instance.get('/enquiryReports')
}

export const fetchEnquiryCounts = () => {
  return instance.get('/enquiriesCount')
}

// Meetings

export const fetchMeetings = () => {
  return instance.get('/meetings')
}

export const fetchTodaysMeetings = () => {
  return instance.get('/todaysMeetings')
}

export const createMeeting = formData => {
  return instance.post('/meetings', formData)
}

export const markMeetingComplete = id => {
  return instance.put(`/markComplete/${id}`)
}

export const deleteMeetingById = id => {
  return instance.delete(`/meetings/${id}`)
}

// product Routes

export const fetchProducts = () => {
  return instance.get('/products')
}

export const createProduct = formData => {
  return instance.post('/products', formData)
}

export const deleteProduct = id => {
  return instance.delete(`/products/${id}`)
}

export const getProductList = () => {
  return instance.get('/allProducts/names')
}

// Vendor Routes

export const fetchVendors = () => {
  return instance.get('/vendors')
}

export const createVendor = formData => {
  return instance.post('/vendors', formData)
}

export const deleteVendor = id => {
  return instance.delete(`/vendors/${id}`)
}

export const getVendorById = id => {
  return instance.get(`/vendors/${id}`)
}

export const addContactPersonVendor = (id, formData) => {
  return instance.post(`/vendors/addContactPerson/${id}`, formData)
}

export const editContactPersonsVendor = (vendorId, contactPersonId, formData) => {
  return instance.patch(`/vendors/editContactPerson/${vendorId}/contactPersons/${contactPersonId}`, formData)
}

export const deleteContactPersonVendor = (clientId, contactPersonId) => {
  return instance.delete(`/vendors/deleteContactPerson/${clientId}/contactPersons/${contactPersonId}`)
}

export const getVendorList = () => {
  return instance.get('/allVendors/names')
}

//Settings Routes

export const fetchTradingProposalNumbers = () => {
  return instance.get('/tradingProposalNumbers')
}

export const addTradingProposalNumber = formData => {
  return instance.post('/tradingProposalNumber', formData)
}

export const markActiveTradingProposalNumber = id => {
  return instance.patch(`/tradingProposalNumber/${id}`, { active: true })
}

export const deleteTradingProposalNumber = id => {
  return instance.delete(`/tradingProposalNumber/${id}`)
}

export const fetchTradingEnquiryNumbers = () => {
  return instance.get('/tradingEnquiryNumbers')
}

export const addTradingEnquiryNumber = formData => {
  return instance.post('/tradingEnquiryNumber', formData)
}

export const markActiveTradingEnquiryNumber = id => {
  return instance.patch(`/tradingEnquiryNumber/${id}`, { active: true })
}

export const deleteTradingEnquiryNumber = id => {
  return instance.delete(`/tradingEnquiryNumber/${id}`)
}

//TradingEnquiry

export const createTradingEnquiry = formData => {
  return instance.post('/tradingEnquiries', formData)
}

export const fetchTradingEnquiries = () => {
  return instance.get('/tradingEnquiries')
}

export const editTradingEnquiry = (id, formData) => {
  return instance.patch(`/tradingEnquiries/${id}`, formData)
}

export const fetchTradingEnquiryById = id => {
  return instance.get(`/tradingEnquiries/${id}`)
}

export const deleteTradingEnquiry = id => {
  return instance.delete(`/tradingEnquiries/${id}`)
}

// Trading Proposals

export const createTradingProposal = formData => {
  return instance.post('/tradingProposals', formData)
}

export const fetchTradingProposals = () => {
  return instance.get('/tradingProposals')
}

export const fetchLiveTradingProposals = () => {
  return instance.get('/livetradingproposals')
}

export const fetchLiveHotTradingProposals = () => {
  return instance.get('/livehottradingproposals')
}

export const fetchContractorTradingProposals = () => {
  return instance.get('/contractortradingproposals')
}

export const fetchTradingProposalById = id => {
  return instance.get(`/TradingProposals/${id}`)
}

export const editTradingProposal = (id, formData) => {
  return instance.put(`/tradingProposals/${id}`, formData)
}

export const deleteTradingProposal = id => {
  return instance.delete(`/tradingProposals/${id}`)
}

export const addRevisionToTradingProposal = (id, formData) => {
  return instance.post(`/tradingProposalAddRevision/${id}`, formData)
}

// trading sales order

export const fetchTradingSalesOrder = () => {
  return instance.get('/tradingSalesOrders')
}

export const createTradingSalesOrder = formData => {
  return instance.post('tradingSalesOrders', formData)
}

export const fetchTradingSalesOrderById = id => {
  return instance.get(`/tradingSalesOrders/${id}`)
}

export const editTradingSalesOrder = (id, formData) => {
  return instance.patch(`/tradingSalesOrders/${id}`, formData)
}

export const deleteTradingSalesOrder = id => {
  return instance.delete(`/tradingSalesOrders/${id}`)
}

export default instance
