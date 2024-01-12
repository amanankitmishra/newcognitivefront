export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDate = (dateObject) => {
  if (dateObject) {
    if (dateObject.$date) {
      // Handle BSON format
      return new Date(parseInt(dateObject.$date.$numberLong)).toISOString().split('T')[0];
    } else if (dateObject instanceof Date) {
      // Handle standard Date object
      return dateObject.toISOString().split('T')[0];
    } else if (typeof dateObject === 'number') {
      // Handle timestamp
      return new Date(dateObject).toISOString().split('T')[0];
    }
  }
  return '';
};
