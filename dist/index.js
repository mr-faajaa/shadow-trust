"use strict";
/**
 * ShadowTrust — Agent Reputation Ledger
 *
 * A unified reputation layer for autonomous agents on Solana.
 * Aggregates reputation from task completion, payments, identity
 * verification, and on-chain activity into a single trust score.
 *
 * Features:
 * - x402 micropayments for reputation data access
 * - Modern @solana/kit integration
 * - Reputation aggregation from multiple sources
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const reputation_1 = require("./services/reputation");
const solana_1 = require("./services/solana");
const api_1 = require("./routes/api");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Initialize services
const solanaService = new solana_1.SolanaService();
const reputationService = new reputation_1.ReputationService(solanaService);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes (pass both services for x402 payment support)
app.use('/api', (0, api_1.APIRouter)(reputationService, solanaService));
// Health check
app.get('/health', async (req, res) => {
    const solanaHealthy = await solanaService.healthCheck();
    res.json({
        status: 'ok',
        solana: solanaHealthy ? 'connected' : 'degraded',
        timestamp: new Date().toISOString()
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`ShadowTrust API running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`x402 Payments: Enabled`);
});
exports.default = app;
//# sourceMappingURL=index.js.map