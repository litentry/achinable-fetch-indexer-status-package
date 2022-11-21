declare const _default: {
    $schema: string;
    $id: string;
    title: string;
    definitions: {
        nonEmptyString: {
            type: string;
            minLength: number;
        };
        baseStatusNode: {
            type: string;
            properties: {
                name: {
                    $ref: string;
                };
                type: {
                    type: string;
                };
                healthy: {
                    type: string;
                };
                currentBlock: {
                    $ref: string;
                };
                dependencies: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
        };
        unhealthyStatusNode: {
            allOf: {
                $ref: string;
            }[];
            type: string;
            properties: {
                healthy: {
                    enum: boolean[];
                };
            };
        };
        chainStatusNode: {
            allOf: {
                $ref: string;
            }[];
            type: string;
            properties: {
                type: {
                    const: string;
                };
            };
            required: string[];
        };
        indexerStatusNode: {
            allOf: {
                $ref: string;
            }[];
            type: string;
            properties: {
                type: {
                    const: string;
                };
                version: {
                    $ref: string;
                };
            };
            required: string[];
        };
        statusNode: {
            anyOf: {
                $ref: string;
            }[];
        };
        nonNegativeInteger: {
            type: string;
            minimum: number;
        };
    };
    type: string;
    allOf: {
        $ref: string;
    }[];
    default: boolean;
};
export default _default;
