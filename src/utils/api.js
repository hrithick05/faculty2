/**
 * API Configuration Utility
 * Centralized API URL management for frontend
 */

// Get API URL from environment variable or use default
export const getApiUrl = () => {
  // Use VITE_API_URL from environment, or fallback to deployed backend
  return import.meta.env.VITE_API_URL || 'https://faculty2.onrender.com';
};

// Full API URL helper
export const apiUrl = getApiUrl();

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default apiUrl;

