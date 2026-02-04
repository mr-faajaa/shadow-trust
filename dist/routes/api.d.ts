/**
 * API Routes
 *
 * RESTful API for ShadowTrust reputation ledger.
 * Includes x402 payment integration for micropayments.
 */
import { Router } from 'express';
import { ReputationService } from '../services/reputation';
import { SolanaService } from '../services/solana';
export declare function APIRouter(reputationService: ReputationService, solanaService: SolanaService): Router;
export default APIRouter;
//# sourceMappingURL=api.d.ts.map