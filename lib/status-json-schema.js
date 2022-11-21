"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'graph-status',
    title: 'Graph status schema',
    definitions: {
        nonEmptyString: {
            type: 'string',
            minLength: 1,
        },
        baseStatusNode: {
            type: 'object',
            properties: {
                name: {
                    $ref: '#/definitions/nonEmptyString',
                },
                type: {
                    type: 'string',
                },
                healthy: {
                    type: 'boolean',
                },
                currentBlock: {
                    $ref: '#/definitions/nonNegativeInteger',
                },
                dependencies: {
                    type: 'array',
                    items: {
                        $ref: '#/definitions/statusNode',
                    },
                },
            },
            required: ['name', 'healthy', 'type'],
        },
        unhealthyStatusNode: {
            allOf: [
                {
                    $ref: '#/definitions/baseStatusNode',
                },
            ],
            properties: {
                healthy: {
                    enum: [false],
                },
            },
        },
        chainStatusNode: {
            allOf: [
                {
                    $ref: '#/definitions/baseStatusNode',
                },
            ],
            properties: {
                type: {
                    const: 'chain',
                },
            },
            required: ['type', 'currentBlock'],
        },
        indexerStatusNode: {
            allOf: [
                {
                    $ref: '#/definitions/baseStatusNode',
                },
            ],
            properties: {
                type: {
                    const: 'indexer',
                },
                version: {
                    $ref: '#/definitions/nonEmptyString',
                },
            },
            required: ['type', 'currentBlock', 'dependencies', 'version'],
        },
        statusNode: {
            anyOf: [
                {
                    $ref: '#/definitions/chainStatusNode',
                },
                {
                    $ref: '#/definitions/indexerStatusNode',
                },
                {
                    $ref: '#/definitions/unhealthyStatusNode',
                },
            ],
        },
        nonNegativeInteger: {
            type: 'integer',
            minimum: 0,
        },
    },
    type: 'object',
    allOf: [
        {
            $ref: '#/definitions/statusNode',
        },
    ],
    default: true,
};
