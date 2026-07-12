export default async function handler(req, res) {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const data = req.body;
    
    console.log('=== RECON DATA RECEIVED ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('===========================');

    // In production you'd save to DB here
    // For now, just return OK
    res.status(200).json({ 
        status: 'ok', 
        receivedAt: new Date().toISOString(),
        captureId: Date.now()
    });
}