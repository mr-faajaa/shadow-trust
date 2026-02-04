/**
 * API Routes
 * 
 * RESTful API for ShadowTrust reputation ledger.
 * Includes x402 payment integration for micropayments.
 */

import { Router, Request, Response } from 'express';
import { ReputationService } from '../services/reputation';
import { SolanaService, PaymentChallenge } from '../services/solana';
import { CreateAttestationRequest } from '../types';

export function APIRouter(
  reputationService: ReputationService,
  solanaService: SolanaService
): Router {
  const router = Router();
  
  // ============================================================================
  // x402 Payment Endpoints (Micropayments for Reputation Data)
  // ============================================================================
  
  /**
   * GET /api/payment/challenge
   * Create a payment challenge for x402 protocol
   */
  router.get('/payment/challenge', async (req: Request, res: Response) => {
    try {
      const amountLamports = parseInt(req.query.amount as string) || 1000; // Default 0.000001 SOL
      const recipient = req.query.recipient as string || 'ShadowTrustTreasury';
      
      // Create challenge
      const challenge = await solanaService.createPaymentChallenge(
        recipient as any,
        amountLamports,
        5 // 5 minutes expiry
      );
      
      // Return x402-style headers
      const headers = solanaService.generatePaymentHeader(challenge);
      Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      
      res.status(402).json({
        error: 'Payment Required',
        challenge: challenge.id,
        amount: challenge.amount,
        unit: 'lamports',
        expiresAt: challenge.expiresAt,
        instructions: 'Pay the specified amount to the recipient, then submit signature via POST /payment/verify'
      });
    } catch (error) {
      console.error('Error creating payment challenge:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * POST /api/payment/verify
   * Verify a payment for x402 protocol
   */
  router.post('/payment/verify', async (req: Request, res: Response) => {
    try {
      const { challengeId, signature } = req.body;
      
      if (!challengeId || !signature) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['challengeId', 'signature']
        });
      }
      
      const isValid = await solanaService.verifyPayment(challengeId, signature);
      
      if (isValid) {
        res.json({
          success: true,
          status: 'paid',
          message: 'Payment verified. Access granted.',
          accessToken: `shadow_${challengeId}_${Date.now()}`
        });
      } else {
        res.status(402).json({
          error: 'Payment verification failed',
          message: 'The provided signature does not match a valid payment'
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ============================================================================
  // Reputation Endpoints
  // ============================================================================
  
  /**
   * GET /api/reputation/:agentId
   * Get reputation for an agent
   */
  router.get('/reputation/:agentId', async (req: Request, res: Response) => {
    try {
      const { agentId } = req.params;
      const reputation = await reputationService.getReputation(agentId);
      
      if (!reputation) {
        return res.status(404).json({
          error: 'Agent not found',
          agentId
        });
      }
      
      res.json(reputation);
    } catch (error) {
      console.error('Error getting reputation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * POST /api/reputation
   * Create a new reputation attestation
   */
  router.post('/reputation', async (req: Request, res: Response) => {
    try {
      const { agentId, source, sourceId, type, value, evidence } = req.body;
      
      // Validate required fields
      if (!agentId || !source || !sourceId || !type || value === undefined || !evidence) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['agentId', 'source', 'sourceId', 'type', 'value', 'evidence']
        });
      }
      
      // Validate type
      const validTypes = ['task_completion', 'payment', 'identity', 'activity'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: 'Invalid type',
          validTypes
        });
      }
      
      const request: CreateAttestationRequest = {
        agentId,
        source,
        sourceId,
        type,
        value,
        evidence
      };
      
      const attestation = await reputationService.createAttestation(request);
      
      res.status(201).json({
        success: true,
        attestation
      });
    } catch (error) {
      console.error('Error creating attestation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ============================================================================
  // Profile & Leaderboard
  // ============================================================================
  
  /**
   * GET /api/profile/:agentId
   * Get full agent profile
   */
  router.get('/profile/:agentId', async (req: Request, res: Response) => {
    try {
      const { agentId } = req.params;
      const profile = await reputationService.getAgentProfile(agentId);
      
      if (!profile) {
        return res.status(404).json({
          error: 'Agent not found',
          agentId
        });
      }
      
      res.json(profile);
    } catch (error) {
      console.error('Error getting profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * GET /api/leaderboard
   * Get top agents by reputation
   */
  router.get('/leaderboard', async (req: Request, res: Response) => {
    try {
      // In production, would query from database sorted by reputation
      // For now, return mock data structure
      res.json({
        leaders: [
          { agentId: 'demo_agent_1', reputation: 95, trend: 'up' },
          { agentId: 'demo_agent_2', reputation: 88, trend: 'stable' },
          { agentId: 'demo_agent_3', reputation: 82, trend: 'up' }
        ],
        totalAgents: 3,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ============================================================================
  // Verification
  // ============================================================================
  
  /**
   * POST /api/verify
   * Verify an attestation from external source
   */
  router.post('/verify', async (req: Request, res: Response) => {
    try {
      const { source, sourceId } = req.body;
      
      if (!source || !sourceId) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['source', 'sourceId']
        });
      }
      
      const isValid = await reputationService.verifyAttestation(source, sourceId);
      
      res.json({
        source,
        sourceId,
        verified: isValid
      });
    } catch (error) {
      console.error('Error verifying attestation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ============================================================================
  // Health & Info
  // ============================================================================
  
  /**
   * GET /api/health
   * API health check
   */
  router.get('/health', async (req: Request, res: Response) => {
    try {
      const solanaHealthy = await solanaService.healthCheck();
      
      res.json({
        status: 'ok',
        service: 'shadow-trust-api',
        solana: solanaHealthy ? 'connected' : 'degraded',
        timestamp: new Date().toISOString(),
        version: '1.1.0'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        service: 'shadow-trust-api',
        error: 'Health check failed'
      });
    }
  });
  
  /**
   * GET /api
   * API information
   */
  router.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'ShadowTrust API',
      version: '1.1.0',
      description: 'Agent Reputation Ledger with x402 micropayments',
      endpoints: {
        reputation: {
          'GET /api/reputation/:agentId': 'Get agent reputation score',
          'POST /api/reputation': 'Create attestation'
        },
        payment: {
          'GET /api/payment/challenge': 'Create x402 payment challenge',
          'POST /api/payment/verify': 'Verify payment'
        },
        profile: {
          'GET /api/profile/:agentId': 'Get full profile'
        },
        leaderboard: {
          'GET /api/leaderboard': 'Top agents by reputation'
        },
        verify: {
          'POST /api/verify': 'Verify external attestation'
        },
        health: {
          'GET /api/health': 'Health check'
        }
      },
      documentation: 'https://github.com/mr-faajaa/shadow-trust',
      x402Support: true
    });
  });
  
  return router;
}

export default APIRouter;
