import axios, { AxiosResponse } from 'axios';
import { IPhotosResponse } from './IPhotosResponse';

const URL = 'https://api.pexels.com/v1/search';
const API_KEY = 'qczseKv4rA6L8H1kLVu7HEHr9bN2YRkQOrx6AdljADY2XVaiZTcgmfuC';

export const fetchPhotos = async (query: string): Promise<IPhotosResponse>=> {
  const { data }: AxiosResponse<IPhotosResponse> = await axios.get(`${URL}?query=${query}&per_page=4"`, {
    headers: {
      Authorization: API_KEY
    }
  })

  return data;
}