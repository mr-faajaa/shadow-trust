/**
 * Reputation Service
 *
 * Core business logic for reputation management.
 * Aggregates attestations and calculates trust scores.
 */
import { SolanaService } from './solana';
import { ReputationScore, ReputationAttestation, AgentProfile, CreateAttestationRequest, ReputationResponse } from '../types';
export declare class ReputationService {
    private solanaService;
    private attestations;
    private reputationCache;
    constructor(solanaService: SolanaService);
    /**
     * Create a new reputation attestation
     */
    createAttestation(request: CreateAttestationRequest): Promise<ReputationAttestation>;
    /**
     * Get reputation for an agent
     */
    getReputation(agentId: string): Promise<ReputationResponse | null>;
    /**
     * Calculate reputation score based on attestations
     */
    calculateReputation(agentId: string): Promise<ReputationScore>;
    /**
     * Get weight multiplier for attestation type
     */
    private getWeightForType;
    /**
     * Calculate reputation trend
     */
    private calculateTrend;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Get agent profile with all data
     */
    getAgentProfile(agentId: string): Promise<AgentProfile | null>;
    /**
     * Verify attestation from external source
     */
    verifyAttestation(source: string, sourceId: string): Promise<boolean>;
}
export default ReputationService;
//# sourceMappingURL=reputation.d.ts.map