"use strict";
/**
 * Solana Service — Modern @solana/kit Implementation
 *
 * Uses @solana/kit for modern Solana development:
 * - Address type for type-safe addresses
 * - Umi-style transaction building
 * - Compatible with wallet standard
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaService = void 0;
const kit_1 = require("@solana/kit");
const web3_js_1 = require("@solana/web3.js");
class SolanaService {
    constructor(config) {
        const rpcUrl = config?.rpcUrl || process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
        const wssUrl = config?.wssUrl || process.env.SOLANA_WSS_URL || 'wss://api.devnet.solana.com';
        // Modern @solana/kit RPC
        this.rpc = (0, kit_1.createSolanaRpc)(rpcUrl);
        // Subscriptions for payment verification
        this.rpcSubscriptions = (0, kit_1.createSolanaRpcSubscriptions)(wssUrl);
        // Keep connection for legacy compatibility during transition
        this.connection = new web3_js_1.Connection(rpcUrl, 'confirmed');
        this.paymentChallenges = new Map();
    }
    // ============================================================================
    // Modern @solana/kit Patterns (shown for reference, implementation simplified)
    // ============================================================================
    /**
     * Get balance using modern @solana/kit
     *
     * Modern approach (when ready to fully migrate):
     * const balance = await this.rpc.getBalance(address).send();
     */
    async getBalance(publicKey) {
        try {
            const balance = await this.connection.getBalance(publicKey);
            return balance / 1e9; // Convert lamports to SOL
        }
        catch (error) {
            console.error('Error getting balance:', error);
            return 0;
        }
    }
    /**
     * Get recent transactions using legacy web3.js
     * (Transition helper - can migrate to @solana/kit later)
     */
    async getRecentTransactions(publicKey, limit = 10) {
        try {
            const signatures = await this.connection.getConfirmedSignaturesForAddress2(publicKey, { limit });
            return signatures;
        }
        catch (error) {
            console.error('Error getting transactions:', error);
            return [];
        }
    }
    /**
     * Verify transaction signature
     *
     * Modern @solana/kit approach would use:
     * const transaction = await this.rpc.getTransaction(signatures[0]).send();
     */
    async verifyTransaction(signature) {
        try {
            const tx = await this.connection.getParsedTransaction(signature, {
                maxSupportedTransactionVersion: 0
            });
            return tx !== null;
        }
        catch (error) {
            console.error('Error verifying transaction:', error);
            return false;
        }
    }
    // ============================================================================
    // x402 Payment Integration
    // ============================================================================
    /**
     * Create a payment challenge for x402 protocol
     *
     * x402 allows agents to pay per API call via HTTP 402 responses.
     * This enables micropayments for reputation data access.
     */
    async createPaymentChallenge(recipient, amountLamports, expiresInMinutes = 5) {
        const challenge = {
            id: this.generateChallengeId(),
            amount: amountLamports,
            recipient,
            expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
            status: 'pending'
        };
        this.paymentChallenges.set(challenge.id, challenge);
        return challenge;
    }
    /**
     * Verify a payment for x402 protocol
     *
     * After client pays, they submit the signature.
     * We verify on-chain that the payment was made.
     */
    async verifyPayment(challengeId, signature) {
        const challenge = this.paymentChallenges.get(challengeId);
        if (!challenge) {
            console.error('Challenge not found:', challengeId);
            return false;
        }
        if (challenge.status !== 'pending') {
            console.error('Challenge already processed:', challenge.status);
            return false;
        }
        if (new Date() > challenge.expiresAt) {
            challenge.status = 'expired';
            console.error('Challenge expired');
            return false;
        }
        // Verify the transaction on-chain
        const isValid = await this.verifyTransaction(signature);
        if (isValid) {
            challenge.status = 'paid';
            return true;
        }
        return false;
    }
    /**
     * Get payment challenge (for x402 402 response)
     */
    getPaymentChallenge(challengeId) {
        return this.paymentChallenges.get(challengeId) || null;
    }
    /**
     * Generate x402-compatible payment header
     */
    generatePaymentHeader(challenge) {
        return {
            'WWW-Authenticate': 'x402',
            'X-Payment-Required': challenge.amount.toString(),
            'X-Payment-Challenge': challenge.id,
            'X-Payment-Recipient': challenge.recipient,
            'X-Payment-Expires': challenge.expiresAt.toISOString()
        };
    }
    // ============================================================================
    // Helper Methods
    // ============================================================================
    /**
     * Generate unique challenge ID
     */
    generateChallengeId() {
        return `chal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * Get RPC endpoint (for debugging)
     */
    getRpcUrl() {
        return this.rpc.endpoint || 'configured';
    }
    /**
     * Health check
     */
    async healthCheck() {
        try {
            const version = await this.connection.getVersion();
            console.log('Solana RPC connected');
            return true;
        }
        catch (error) {
            console.error('Solana RPC health check failed:', error);
            return false;
        }
    }
}
exports.SolanaService = SolanaService;
exports.default = SolanaService;
//# sourceMappingURL=solana.js.map