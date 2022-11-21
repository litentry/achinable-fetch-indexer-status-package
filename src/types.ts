export enum StatusTypes {
  indexer = 'indexer',
  chain = 'chain',
}

interface BaseStatus {
  name: string;
  type: StatusTypes;
  healthy: boolean;
}

interface UnhealthyStatus extends BaseStatus {
  healthy: false;
}

export interface ChainStatus extends BaseStatus {
  type: StatusTypes.chain;
  healthy: true;
  currentBlock: number;
}

export interface IndexerStatus extends BaseStatus {
  type: StatusTypes.indexer;
  healthy: true;
  version: string;
  currentBlock: number;
  dependencies: NodeStatus[];
}

export type NodeStatus = ChainStatus | IndexerStatus | UnhealthyStatus;