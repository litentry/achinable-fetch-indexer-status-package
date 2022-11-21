import axios from 'axios';
import Ajv from 'ajv';
import NodeCache from 'node-cache';
import statusJsonSchema from './status-json-schema';
import convertEndpointUrlToBaseUrl from './convert-endpoint-url-to-base-url';

const ajv = new Ajv();
const validate = ajv.compile(statusJsonSchema);
const cache = new NodeCache({ stdTTL: 20, checkperiod: 20 });

export default async function getIndexerStatus(
  name: string,
  endpointUrl: string
) {
  try {
    const baseUrl = convertEndpointUrlToBaseUrl(endpointUrl);
    const cachedResponse = cache.get(baseUrl);

    if (cachedResponse) {
      return cachedResponse;
    }
    const response = await axios({
      url: `${baseUrl}/status`,
      method: 'get',
      timeout: 5000,
    });
    const { data } = response;

    if (!validate(data)) {
      console.error(data, validate.errors);
      throw new Error('Validation failed');
    }

    cache.set(baseUrl, data);
    return data;
  } catch (e: any) {
    console.log(JSON.stringify(e, null, 2));
    return {
      name,
      type: 'indexer',
      healthy: false,
    };
  }
}
