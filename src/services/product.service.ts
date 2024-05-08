import useApi from 'src/composables/UseApi';

export default function useProductService() {
  const { get, post, put, remove, all, paginate, findById } =
    useApi('products');

  const findByEan = async (ean: string) => {
    try {
      const { api } = useApi('products');
      const { data } = await api.get(`products/find-by-ean/${ean}`);
      return data.data;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    get,
    post,
    put,
    remove,
    all,
    paginate,
    findById,
    findByEan,
  };
}
