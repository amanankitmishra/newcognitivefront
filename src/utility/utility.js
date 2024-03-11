export const formatTimestamp = timestamp => {
  const date = new Date(timestamp)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export const formatDate = dateObject => {
  if (dateObject) {
    if (dateObject.$date) {
      // Handle BSON format
      return new Date(parseInt(dateObject.$date.$numberLong)).toISOString().split('T')[0]
    } else if (dateObject instanceof Date) {
      // Handle standard Date object
      return dateObject.toISOString().split('T')[0]
    } else if (typeof dateObject === 'number') {
      // Handle timestamp
      return new Date(dateObject).toISOString().split('T')[0]
    }
  }

  return ''
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const formatDateForInput = dateString => {
  // Assuming dateString is in dd/mm/yyyy format
  const [day, month, year] = dateString.split('/')

  return `${year}-${month}-${day}`
}
