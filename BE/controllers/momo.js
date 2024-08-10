import axios from 'axios';
import crypto from 'crypto';

// Thông tin cấu hình từ MoMo
const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const partnerCode = 'MOMO';

export const Payment = async (req, res) => {
  const { amounts, orderId: orderIdFromBody } = req.body;
  const redirectUrl = `http://localhost:5173/thankyou`;
  const ipnUrl = 'https://b06f-1-54-211-208.ngrok-free.app/callback';
  const requestType = 'captureWallet';
  const orderInfo = 'pay with MoMo';
  const amount = amounts;
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const extraData = '';
  const autoCapture = true;
  const lang = 'vi';

  // Tạo raw signature để ký
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  // Chuẩn bị request body
  const requestBody = {
    partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    signature
  };

  try {
    const result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const callback = async (req, res) => {
  console.log("callback: ");
  console.log(req.body);
  return res.status(204).json(req.body);
};

export const transaction = async (req, res) => {
  const { orderId } = req.body;

  // Tạo raw signature để ký
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  const requestBody = {
    partnerCode,
    orderId,
    requestId: orderId,
    signature,
    lang: 'vi'
  };

  try {
    const result = await axios.post('https://test-payment.momo.vn/v2/gateway/api/query', requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
