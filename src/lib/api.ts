import { GlobalStore } from '@/types/flux'
  
  export function createGlobalStore(): GlobalStore {
    return {
      flux_price_usd: 0,
      node_count: {
        cumulus: 0,
        nimbus: 0,
        stratus: 0,
        fractus: 0,
        total: 0
      },
      reward_projections: {
        cumulus: { pay_frequency: 0, payment_amount: 0, pa_amount: 0, apy: 0 },
        nimbus: { pay_frequency: 0, payment_amount: 0, pa_amount: 0, apy: 0 },
        stratus: { pay_frequency: 0, payment_amount: 0, pa_amount: 0, apy: 0 },
        fractus: { pay_frequency: 0, payment_amount: 0, pa_amount: 0, apy: 0 }
      },
      wallet_amount_flux: 0,
      fluxos_latest_version: { major: 0, minor: 0, patch: 0 },
      bench_latest_version: { major: 0, minor: 0, patch: 0 },
      current_block_height: 0,
      in_rich_list: false,
      total_donations: 0,
      total: {
        cores: 0,
        ram: 0,
        ssd: 0
      },
      utilized: {
        cores: 0,
        nodes: 0,
        ram: 0,
        ssd: 0,
        cores_percentage: 0,
        nodes_percentage: 0,
        ram_percentage: 0,
        ssd_percentage: 0
      }
    }
  }
  
  export async function validateAddress(address: string): Promise<boolean> {
    try {
      const res = await fetch(`https://api.runonflux.io/explorer/balance?address=${address}`)
      const json = await res.json()
      return json.data !== undefined
    } catch {
      return false
    }
  }
  
  export async function fetchGlobalStats(walletAddress: string | null = null): Promise<GlobalStore> {
    const store = createGlobalStore()
    
    // Implement the actual fetch logic here...
    // This is a placeholder that you'll need to complete with the actual API calls
    
    return store
  }