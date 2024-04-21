import { api } from 'boot/axios';
import { QTableProps } from 'quasar';

export default function useApi(url: string) {
  const all = async () => {
    try {
      const { data } = await api.get(`${url}/get/all`);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const findById = async (id: number | string) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const get = async () => {
    try {
      const { data } = await api.get(`${url}`);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const post = async (payload: unknown) => {
    try {
      const { data } = await api.post(url, payload);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const put = async (id: number | string, payload: unknown) => {
    try {
      const { data } = await api.put(`${url}/${id}`, payload);
      return data.data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const remove = async (id: number | string) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  const paginate = async (
    pagination: QTableProps['pagination'],
    filters?: any
  ) => {
    try {
      const queryUrl: any = {
        sortBy: pagination?.sortBy ?? 'name',
        sortDesc: pagination?.descending ?? false,
        page: pagination?.page?.toString() ?? '1',
        per_page: pagination?.rowsPerPage?.toString() ?? '5',
      };
      if (filters) {
        for (const key in filters) {
          if (filters[key] !== null && filters[key] !== '') {
            Object.assign(queryUrl, { [key]: filters[key] });
          }
        }
      }
      const qs = new URLSearchParams(queryUrl).toString();
      const { data } = await api.get(`${url}?${qs}`);
      console.log(`${url}?${qs}`);
      return data;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    all,
    get,
    post,
    put,
    remove,
    paginate,
    findById,
    api,
  };
}
