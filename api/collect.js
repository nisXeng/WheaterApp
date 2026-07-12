export default async function handler(req, res) {
    // Allow all origins — no CORS restrictions
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    // Extract data from POST body or GET query
    let data;
    if (req.method === 'POST') {
        data = req.body;
    } else if (req.method === 'GET') {
        try {
            data = JSON.parse(req.query.d || '{}');
        } catch {
            data = { query: req.query };
        }
    }
    
    // Log everything
    console.log('========================================');
    console.log('🎯 VERCEL FUNCTION HIT!');
    console.log('Method:', req.method);
    console.log('Time:', new Date().toISOString());
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('========================================');
    
    // If GET (image beacon from <img> tag), return a 1x1 transparent GIF
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'image/gif');
        const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        return res.status(200).send(gif);
    }
    
    // POST: return JSON
    res.status(200).json({ 
        status: 'ok', 
        received: true,
        method: req.method,
        timestamp: new Date().toISOString()
    });
}
