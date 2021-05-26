import { AuthController } from '../Http/Controllers/auth.controller';
import { CustomRoute, Routes } from '../Data/auth.data';
import { exampleMiddleware } from '../Http/Middleware/example.middleware';

const authController = new AuthController();

class AuthRoutes extends Routes {
  routePrefix = '/auth';

  middleware = [
    exampleMiddleware,
  ];

  routeDefinitions: CustomRoute[] = [
    {
      path: '/login',
      method: 'post',
      action: authController.postLogin,
      validator: authController.validators.credentials,
    },
    {
      path: '/register',
      method: 'post',
      action: authController.postRegister,
      validator: authController.validators.credentials,
    },
    {
      path: '/generate-reset-password',
      method: 'post',
      action: authController.postSendForgotPassword,
      validator: authController.validators.postGenerateForgotPassword,
    },
    {
      path: '/forgot-password',
      method: 'post',
      action: authController.postForgotPassword,
      validator: authController.validators.postForgotPassword,
    },
  ];
}

export default new AuthRoutes();
