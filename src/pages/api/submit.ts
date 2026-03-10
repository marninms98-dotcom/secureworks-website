/**
 * API Route: /api/submit
 * Receives form submissions, forwards to GHL Inbound Webhook.
 * Replaces the separate Cloudflare Worker (workers/form-proxy.js).
 */

export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, phone, suburb } = data;
    if (!name || !phone || !suburb) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, phone, suburb' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build GHL payload
    const ghlPayload = {
      // Contact fields
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone,
      email: data.email || '',

      // Project details
      suburb,
      projectType: data.projectType || '',
      timeline: data.timeline || '',
      size: data.size || '',
      notes: data.notes || '',

      // Tags for automation
      tags: ['website-lead', 'speed-to-lead'],

      // Source tracking
      source: 'secureworksgroup.com.au',
      medium: 'website-form',

      // Attribution (UTM / GCLID)
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_term: data.utm_term || '',
      utm_content: data.utm_content || '',
      gclid: data.gclid || '',
      landing_page: data.landing_page || '',
      page_url: data.page_url || '',
    };

    // Forward to GHL Inbound Webhook
    const env = (locals as any).runtime?.env;
    const webhookUrl = env?.GHL_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ghlPayload),
        });
        if (!res.ok) {
          console.error('GHL webhook error:', res.status, await res.text());
        }
      } catch (err) {
        console.error('GHL webhook fetch error:', err);
      }
    } else {
      console.warn('GHL_WEBHOOK_URL not configured — form data logged only:', ghlPayload);
    }

    // Always return success to the user
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Form submission error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
