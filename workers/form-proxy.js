/**
 * Cloudflare Worker — Form Proxy
 * Receives form submissions from the website, adds tags,
 * and forwards to GHL Inbound Webhook.
 *
 * Deploy: wrangler deploy workers/form-proxy.js --name secureworks-form-proxy
 *
 * Environment variables (set via wrangler secret):
 *   GHL_WEBHOOK_URL — GHL Inbound Webhook URL from your workflow
 *
 * The GHL Inbound Webhook workflow should:
 *   1. Create/update contact with the submitted details
 *   2. Apply tags: website-lead, speed-to-lead
 *   3. Trigger instant SMS/email automation
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://secureworksgroup.com.au',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Also allow localhost for dev
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = [
    'https://secureworksgroup.com.au',
    'https://www.secureworksgroup.com.au',
    'http://localhost:4321',
    'http://localhost:4322',
  ];

  return {
    ...CORS_HEADERS,
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
  };
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request),
      });
    }

    // Only accept POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      });
    }

    try {
      const data = await request.json();

      // Validate required fields
      const { name, phone, suburb, projectType } = data;
      if (!name || !phone || !suburb) {
        return new Response(JSON.stringify({ error: 'Missing required fields: name, phone, suburb' }), {
          status: 400,
          headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
        });
      }

      // Build payload for GHL Inbound Webhook
      const ghlPayload = {
        // Contact fields
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        phone: phone,
        email: data.email || '',

        // Custom fields — map these to your GHL custom fields
        suburb: suburb,
        projectType: projectType || '',
        timeline: data.timeline || '',
        size: data.size || '',
        notes: data.notes || '',

        // Tags for automation
        tags: ['website-lead', 'speed-to-lead'],

        // Source tracking
        source: 'secureworksgroup.com.au',
        medium: 'website-form',
      };

      // Forward to GHL Inbound Webhook
      const webhookUrl = env.GHL_WEBHOOK_URL;
      if (!webhookUrl) {
        console.error('GHL_WEBHOOK_URL not configured');
        // Still return success to user — don't expose backend config issues
        return new Response(JSON.stringify({ success: true, queued: true }), {
          status: 200,
          headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
        });
      }

      const ghlResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ghlPayload),
      });

      if (!ghlResponse.ok) {
        console.error('GHL webhook error:', ghlResponse.status, await ghlResponse.text());
        // Return success to user anyway — we'll retry via logs
        return new Response(JSON.stringify({ success: true, queued: true }), {
          status: 200,
          headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      });

    } catch (err) {
      console.error('Form proxy error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...getCorsHeaders(request), 'Content-Type': 'application/json' },
      });
    }
  },
};
