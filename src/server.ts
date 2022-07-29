import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([AuthController, IndexController]);
app.listen();
