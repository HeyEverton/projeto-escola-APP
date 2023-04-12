import axios from '@axios';

class MakeRequest
{
  public async postRequest(endpoint: string, payload: object)
  {
    return await axios.post(endpoint, payload)
  }

  public async getRequest(endpoint: string)
  {
    return await axios.get(endpoint)
  }

  public async getOneRequest(endpoint: string, id: string | number)
  {
    return await axios.get(`${endpoint}/${id}`)
  }

  public async deleteRequest(endpoint: string, id: string | number)
  {
    return await axios.delete(`${endpoint}/${id}`)
  }

  public async updateRequest(endpoint: string, payload: object, id: string | number)
  {
    return await axios.put(`${endpoint}/${id}`, payload)
  }
}

export default MakeRequest
