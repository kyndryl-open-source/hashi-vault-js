/**
 * Main entry point for hashi-vault-js type definitions
 * @packageDocumentation
 */

import Vault from './Vault.js';
import { config } from './Config.js';

export default Vault;
export { Vault, config };

// Re-export for convenience
export type { Vault as VaultClient };
