export default (endpointUrl: string) =>
  endpointUrl.replace(/\/graphql\/?$/, '');
