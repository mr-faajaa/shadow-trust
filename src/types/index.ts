/**
 * Type definitions for ShadowTrust
 */

export interface ReputationScore {
  agentId: string;
  overall: number;
  breakdown: {
    taskCompletion: number;
    paymentHistory: number;
    identityVerification: number;
    onChainActivity: number;
  };
  attestations: number;
  lastUpdated: Date;
}

export interface ReputationAttestation {
  id: string;
  agentId: string;
  source: string;
  sourceId: string;
  type: 'task_completion' | 'payment' | 'identity' | 'activity';
  value: number;
  evidence: string;
  timestamp: Date;
  signature?: string;
}

export interface AgentProfile {
  agentId: string;
  name: string;
  createdAt: Date;
  reputation: ReputationScore;
  claims: string[];
}

export interface CreateAttestationRequest {
  agentId: string;
  source: string;
  sourceId: string;
  type: 'task_completion' | 'payment' | 'identity' | 'activity';
  value: number;
  evidence: string;
}

export interface ReputationResponse {
  agentId: string;
  reputation: ReputationScore;
  trend: 'up' | 'down' | 'stable';
}
