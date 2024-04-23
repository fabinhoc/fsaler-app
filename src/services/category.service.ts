import useApi from 'src/composables/UseApi';

export default function useCategoryService() {
  const { get, post, put, remove, all, paginate, findById } =
    useApi('categories');

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
