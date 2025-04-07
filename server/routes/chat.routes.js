import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Chat routes working!');
});

export default router;