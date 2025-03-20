import mongoose from 'mongoose';
const couponSchema = new mongoose.Schema({
    code: String,
    claimed: { type: Boolean, default: false },
    claimedBy: { type: String, default: null }
});
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;