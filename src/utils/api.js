const fetchData = async (url, method, headers, body) => 
{
    try 
    {
        const response = await fetch(url, { method, headers, body });
        if (!response.ok) 
        {
            const text = await response.text();
            alert(text);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) 
        {
            return await response.json();
        }

        return null; // No hay cuerpo JSON válido en la respuesta
    } 
    catch (error) 
    {
        console.log(error);
        throw error;
    }
};
  
const API = 
{
    get: async (url, headers) => 
    {
        return await fetchData(url, 'GET', headers);
    },
    post: async (url, headers, body) => 
    {
        return await fetchData(url, 'POST', headers, JSON.stringify(body));
    },
    put: async (url, headers, body) => 
    {
        return await fetchData(url, 'PUT', headers, JSON.stringify(body));
    },
    delete: async (url, headers) => 
    {
        return await fetchData(url, 'DELETE', headers);
    },
};

export default API;