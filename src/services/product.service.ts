import useApi from 'src/composables/UseApi';

export default function useProductService() {
  const { get, post, put, remove, all, paginate, findById } =
    useApi('products');

  return {
    get,
    post,
    put,
    remove,
    all,
    paginate,
    findById,
  };
}
