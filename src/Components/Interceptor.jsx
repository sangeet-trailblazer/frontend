import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000';
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL,  // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add access token to headers before each request
axiosInstance.interceptors.request.use(
    (config) => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Attach the token to the request header
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      /*axiosInstance.interceptors.request.use(
        (config) => {
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );*/
    
/*axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);*/

      
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor: Handle token expiration and refresh the token
axiosInstance.interceptors.response.use(
  (response) => response, // If no error, return the response as is
  async (error) => {
    const originalRequest = error.config;

    // If the response is 401 (Unauthorized), it might mean the token is expired
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh the token using the refresh token stored in localStorage
      const refreshToken = localStorage.getItem('refresh');
      console.log(refreshToken);
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {refresh: refreshToken });
          console.log(refreshResponse);
          if (refreshResponse.status === 200) {
            const newAccessToken = refreshResponse.data.access;
            const newRefreshToken = refreshResponse.data.refresh;
            

            // Set the new access token in the original request and retry it
            
            
            console.log('New access and refresh tokens');
            console.log(newAccessToken);
            console.log(newRefreshToken);
            // localStorage.removeItem('access_token');
            // localStorage.removeItem('refresh');
            
            localStorage.setItem('access_token', newAccessToken);
            localStorage.setItem('refresh', newRefreshToken);
            
            const retryRequest = {
              ...originalRequest,  // Clone original request
              headers: {
                ...originalRequest.headers,  // Preserve other headers
                'Authorization': `Bearer ${newAccessToken}`,  // Set the new access token
              },
              data:{ refresh: newRefreshToken},
            };
            console.log("Retrying request with updated headers:", retryRequest);
            return axiosInstance(retryRequest);
          } 
          else{
            console.log('Error in refreshing refresh tokens')
          }
        } catch (refreshError) {
          // In case refresh request fails, log the user out
          // localStorage.removeItem('access_token');
          // localStorage.removeItem('refresh');
           
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
