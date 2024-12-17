const API_KEY = 'AIzaSyAfZfi7obfwtAlxYzYEvMHNF0QuLZsuVn8'

export const getMapPreview = (lat, lng) => { 
    
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${API_KEY}`
 return imageUrl
}  


export async function getAddressFromCoords(lat, lng) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  if (!data.results || data.results.length === 0) {
    throw new Error("No address found. Please try again!");
  }
  return data.results[0].formatted_address;
}
