import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' '); //para dividir a partir do espaço, bear array 1, token array 2
  //com a virgula antes, descarta a primeira opção e só utiliza o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
};
