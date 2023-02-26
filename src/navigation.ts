import {AppNavigations, AppStackRoutes} from './navigators/AppStack';
import {AuthNavigations, AuthStackRoutes} from './navigators/AuthStack';

export type Navigations = AppNavigations;

export type Routes = AppStackRoutes;

export type AuthenticationNavigations = AuthNavigations;

export type AuthenticationRoutes = AuthStackRoutes;
