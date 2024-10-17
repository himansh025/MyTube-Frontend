const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://brilliant-salmiakki-99fbec.netlify.app/' // Production URL
  : 'http://localhost:3000'; // Local development URL
export default apiUrl