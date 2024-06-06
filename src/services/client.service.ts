import useApi from 'src/composables/UseApi';

export default function useClientService() {
  const { get, post, put, remove, all, paginate, findById } = useApi('clients');

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
