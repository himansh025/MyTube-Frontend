const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://my-tube-server-psi.vercel.app' // Production URL
  : 'http://localhost:3000'; // Local development URL
export default apiUrl