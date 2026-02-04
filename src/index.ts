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

import express from 'express';
import cors from 'cors';
import { ReputationService } from './services/reputation';
import { SolanaService } from './services/solana';
import { APIRouter } from './routes/api';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize services
const solanaService = new SolanaService();
const reputationService = new ReputationService(solanaService);

// Middleware
app.use(cors());
app.use(express.json());

// Routes (pass both services for x402 payment support)
app.use('/api', APIRouter(reputationService, solanaService));

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

export default app;
