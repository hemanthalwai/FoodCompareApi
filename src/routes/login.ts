import { loginController } from '../controllers/login.controller';
import { RouteHandler } from '.';

const router = RouteHandler.getRouter();

router.use('/login', loginController);

export default router;