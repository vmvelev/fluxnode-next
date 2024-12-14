export interface GlobalStore {
  flux_price_usd: number;
  node_count: {
    cumulus: number;
    nimbus: number;
    stratus: number;
    fractus: number;
    total: number;
  };
  reward_projections: {
    cumulus: TierProjections;
    nimbus: TierProjections;
    stratus: TierProjections;
    fractus: TierProjections;
  };
  wallet_amount_flux: number;
  fluxos_latest_version: VersionDesc;
  bench_latest_version: VersionDesc;
  current_block_height: number;
  in_rich_list: boolean;
  total_donations: number;
  total: ResourceTotal;
  utilized: ResourceUtilization;
}

interface TierProjections {
  pay_frequency: number;
  payment_amount: number;
  pa_amount: number;
  apy: number;
}

interface VersionDesc {
  major: number;
  minor: number;
  patch: number;
}

interface ResourceTotal {
  cores: number;
  ram: number;
  ssd: number;
}

interface ResourceUtilization {
  cores: number;
  nodes: number;
  ram: number;
  ssd: number;
  cores_percentage: number;
  nodes_percentage: number;
  ram_percentage: number;
  ssd_percentage: number;
}
