// Central API base URL config
// In dev (.env.local): http://localhost:5000
// In prod (.env.production): https://logixwave-main-1.onrender.com
const API_BASE = import.meta.env.VITE_API_URL || 'https://logixwave-main-1.onrender.com';

export default API_BASE;
