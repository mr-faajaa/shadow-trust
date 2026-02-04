"use strict";
/**
 * Reputation Service
 *
 * Core business logic for reputation management.
 * Aggregates attestations and calculates trust scores.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationService = void 0;
class ReputationService {
    constructor(solanaService) {
        this.solanaService = solanaService;
        this.attestations = new Map();
        this.reputationCache = new Map();
    }
    /**
     * Create a new reputation attestation
     */
    async createAttestation(request) {
        const attestation = {
            id: this.generateId(),
            agentId: request.agentId,
            source: request.source,
            sourceId: request.sourceId,
            type: request.type,
            value: request.value,
            evidence: request.evidence,
            timestamp: new Date()
        };
        // Store attestation
        const agentAttestations = this.attestations.get(request.agentId) || [];
        agentAttestations.push(attestation);
        this.attestations.set(request.agentId, agentAttestations);
        // Recalculate reputation
        await this.calculateReputation(request.agentId);
        return attestation;
    }
    /**
     * Get reputation for an agent
     */
    async getReputation(agentId) {
        const score = this.reputationCache.get(agentId);
        if (!score) {
            return null;
        }
        return {
            agentId,
            reputation: score,
            trend: this.calculateTrend(agentId)
        };
    }
    /**
     * Calculate reputation score based on attestations
     */
    async calculateReputation(agentId) {
        const agentAttestations = this.attestations.get(agentId) || [];
        // Initialize breakdown scores
        const breakdown = {
            taskCompletion: 0,
            paymentHistory: 0,
            identityVerification: 0,
            onChainActivity: 0
        };
        // Aggregate by type
        for (const attestation of agentAttestations) {
            const weight = this.getWeightForType(attestation.type);
            const normalizedValue = Math.min(attestation.value, 100) * weight;
            switch (attestation.type) {
                case 'task_completion':
                    breakdown.taskCompletion += normalizedValue;
                    break;
                case 'payment':
                    breakdown.paymentHistory += normalizedValue;
                    break;
                case 'identity':
                    breakdown.identityVerification += normalizedValue;
                    break;
                case 'activity':
                    breakdown.onChainActivity += normalizedValue;
                    break;
            }
        }
        // Calculate overall score (weighted average)
        const totalWeight = 0.3 + 0.3 + 0.2 + 0.2; // Weights for each category
        const overall = ((breakdown.taskCompletion * 0.3) +
            (breakdown.paymentHistory * 0.3) +
            (breakdown.identityVerification * 0.2) +
            (breakdown.onChainActivity * 0.2));
        const score = {
            agentId,
            overall: Math.min(Math.round(overall), 100),
            breakdown: {
                taskCompletion: Math.min(Math.round(breakdown.taskCompletion), 100),
                paymentHistory: Math.min(Math.round(breakdown.paymentHistory), 100),
                identityVerification: Math.min(Math.round(breakdown.identityVerification), 100),
                onChainActivity: Math.min(Math.round(breakdown.onChainActivity), 100)
            },
            attestations: agentAttestations.length,
            lastUpdated: new Date()
        };
        // Cache the score
        this.reputationCache.set(agentId, score);
        return score;
    }
    /**
     * Get weight multiplier for attestation type
     */
    getWeightForType(type) {
        const weights = {
            task_completion: 1.0,
            payment: 0.9,
            identity: 0.8,
            activity: 0.5
        };
        return weights[type] || 0.5;
    }
    /**
     * Calculate reputation trend
     */
    calculateTrend(agentId) {
        const attestations = this.attestations.get(agentId) || [];
        if (attestations.length < 2) {
            return 'stable';
        }
        // Simple trend: more recent attestations = up
        const recentAttestations = attestations.slice(-5);
        const olderAttestations = attestations.slice(-10, -5);
        if (recentAttestations.length > olderAttestations.length) {
            return 'up';
        }
        else if (recentAttestations.length < olderAttestations.length) {
            return 'down';
        }
        return 'stable';
    }
    /**
     * Generate unique ID
     */
    generateId() {
        return `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Get agent profile with all data
     */
    async getAgentProfile(agentId) {
        const attestations = this.attestations.get(agentId) || [];
        const reputation = this.reputationCache.get(agentId);
        if (!reputation) {
            return null;
        }
        return {
            agentId,
            name: agentId, // Would lookup from registry
            createdAt: new Date(),
            reputation,
            claims: [] // Identity claims would be stored here
        };
    }
    /**
     * Verify attestation from external source
     */
    async verifyAttestation(source, sourceId) {
        // In production, this would verify against external APIs
        // For BountyBoard, would check task completion
        // For SAID, would verify identity
        // Mock verification for now
        return true;
    }
}
exports.ReputationService = ReputationService;
exports.default = ReputationService;
//# sourceMappingURL=reputation.js.map