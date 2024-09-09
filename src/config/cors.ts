import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ALLOWED_ORIGINS } from 'src/lib/constants';

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default corsOptions;
