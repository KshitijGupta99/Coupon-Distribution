import express from 'express';
import Coupon from '../modal/coupon.modal.js';
import rateLimiter from '../middleware/rateLimit.js';
const router = express.Router();

router.post('/claim', rateLimiter, async (req, res) => {
    const coupon = await Coupon.findOne({ claimed: false });
    if (!coupon) return res.status(404).json({ message: 'No coupons available' });
    
    coupon.claimed = true;
    coupon.claimedBy = req.ip;
    await coupon.save();
    res.json({ message: 'Coupon claimed successfully!', coupon: coupon.code });
});

router.put('/toggle', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Coupon code is required" });

    const coupon = await Coupon.findOne({code});
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    coupon.claimed = !coupon.claimed;
    await coupon.save();
    res.json({ message: "Coupon updated successfully" });
});

router.post('/add', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Coupon code is required" });

    const newCoupon = new Coupon({ code, claimed: false });
    await newCoupon.save();
    res.json({ message: "Coupon added successfully" });
});

router.get('/', async (req, res) => {
    const coupons = await Coupon.find();
    res.json(coupons);
});

export default router;