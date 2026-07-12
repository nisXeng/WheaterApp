export default async function handler(req, res) {
    // Allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    // Collect everything
    const debug = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
        timestamp: new Date().toISOString(),
        vercel: true
    };
    
    console.log('=== VERCEL FUNCTION HIT ===');
    console.log(JSON.stringify(debug, null, 2));
    console.log('===========================');
    
    // If GET (image beacon), return transparent GIF
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'image/gif');
        const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        return res.status(200).send(gif);
    }
    
    res.status(200).json({ 
        status: 'ok', 
        method: req.method,
        receivedData: req.body || req.query,
        message: 'Check Vercel → Deployments → Functions → Logs'
    });
}
