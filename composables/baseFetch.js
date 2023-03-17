
export const useBaseFetch = async (uri, { method, params, data }) => {
  const runtimeConfig = useRuntimeConfig()
  
  const requestHeaders = new Headers();

  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set('x-api-key', runtimeConfig.public.apiKey);
  const fullUri = runtimeConfig.public.apiBase + uri

  return $fetch(fullUri, {
    method: method,
    params,
    headers: requestHeaders,
    body: data
  })
  .catch((err) => {
    console.log(err)
  })
}