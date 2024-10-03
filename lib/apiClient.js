const apiClient = {
    post: async (endpoint, data) => {
      try {
        const response = await fetch(`${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        return await response.json(); // Returns the response data as a JSON object
      } catch (error) {
        console.error('POST request error:', error);
        throw error;
      }
    },
  
    // You can add other methods like GET, PUT, DELETE etc.
    get: async (endpoint) => {
      try {
        const response = await fetch(`${endpoint}`);
        return await response.json();
      } catch (error) {
        console.error('GET request error:', error);
        throw error;
      }
    },
  };
  
  export default apiClient;