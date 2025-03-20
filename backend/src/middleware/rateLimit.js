const rateLimit = {};
const ABUSE_TIMEOUT = 60 * 1000; // 1-minute cooldown
const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    if (rateLimit[ip] && Date.now() - rateLimit[ip] < ABUSE_TIMEOUT) {
        return res.status(429).json({ message: 'Please wait before claiming another coupon.' });
    }
    rateLimit[ip] = Date.now();
    next();
};
export default rateLimiter;