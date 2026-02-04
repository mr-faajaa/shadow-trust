/**
 * Solana Service — Modern @solana/kit Implementation
 *
 * Uses @solana/kit for modern Solana development:
 * - Address type for type-safe addresses
 * - Umi-style transaction building
 * - Compatible with wallet standard
 */
import { PublicKey } from '@solana/web3.js';
export interface SolanaConfig {
    rpcUrl: string;
    wssUrl: string;
}
export interface PaymentChallenge {
    id: string;
    amount: number;
    recipient: string;
    expiresAt: Date;
    status: 'pending' | 'paid' | 'expired';
}
export declare class SolanaService {
    private rpc;
    private rpcSubscriptions;
    private connection;
    private paymentChallenges;
    constructor(config?: Partial<SolanaConfig>);
    /**
     * Get balance using modern @solana/kit
     *
     * Modern approach (when ready to fully migrate):
     * const balance = await this.rpc.getBalance(address).send();
     */
    getBalance(publicKey: PublicKey): Promise<number>;
    /**
     * Get recent transactions using legacy web3.js
     * (Transition helper - can migrate to @solana/kit later)
     */
    getRecentTransactions(publicKey: PublicKey, limit?: number): Promise<import("@solana/web3.js").ConfirmedSignatureInfo[]>;
    /**
     * Verify transaction signature
     *
     * Modern @solana/kit approach would use:
     * const transaction = await this.rpc.getTransaction(signatures[0]).send();
     */
    verifyTransaction(signature: string): Promise<boolean>;
    /**
     * Create a payment challenge for x402 protocol
     *
     * x402 allows agents to pay per API call via HTTP 402 responses.
     * This enables micropayments for reputation data access.
     */
    createPaymentChallenge(recipient: string, amountLamports: number, expiresInMinutes?: number): Promise<PaymentChallenge>;
    /**
     * Verify a payment for x402 protocol
     *
     * After client pays, they submit the signature.
     * We verify on-chain that the payment was made.
     */
    verifyPayment(challengeId: string, signature: string): Promise<boolean>;
    /**
     * Get payment challenge (for x402 402 response)
     */
    getPaymentChallenge(challengeId: string): PaymentChallenge | null;
    /**
     * Generate x402-compatible payment header
     */
    generatePaymentHeader(challenge: PaymentChallenge): object;
    /**
     * Generate unique challenge ID
     */
    private generateChallengeId;
    /**
     * Get RPC endpoint (for debugging)
     */
    getRpcUrl(): string;
    /**
     * Health check
     */
    healthCheck(): Promise<boolean>;
}
export default SolanaService;
//# sourceMappingURL=solana.d.ts.map