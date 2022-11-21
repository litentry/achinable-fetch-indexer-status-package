"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ajv_1 = __importDefault(require("ajv"));
const node_cache_1 = __importDefault(require("node-cache"));
const status_json_schema_1 = __importDefault(require("./status-json-schema"));
const convert_endpoint_url_to_base_url_1 = __importDefault(require("./convert-endpoint-url-to-base-url"));
const types_1 = require("./types");
const ajv = new ajv_1.default();
const validate = ajv.compile(status_json_schema_1.default);
const cache = new node_cache_1.default({ stdTTL: 20, checkperiod: 20 });
async function getIndexerStatus(name, endpointUrl) {
    try {
        const baseUrl = (0, convert_endpoint_url_to_base_url_1.default)(endpointUrl);
        const cachedResponse = cache.get(baseUrl);
        if (cachedResponse) {
            return cachedResponse;
        }
        const response = await (0, axios_1.default)({
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
    }
    catch (e) {
        console.log(JSON.stringify(e, null, 2));
        return {
            name,
            type: types_1.StatusTypes.indexer,
            healthy: false,
        };
    }
}
exports.default = getIndexerStatus;
