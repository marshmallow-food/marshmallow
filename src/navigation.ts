import {AppNavigations, AppStackRoutes} from './navigators/AppStack';
import {AuthNavigations, AuthStackRoutes} from './navigators/AuthStack';
import {
  MainBottomTabNavigations,
  MainBottomTabRoutes,
} from './navigators/MainBottomTab';

export type Navigations = AppNavigations & MainBottomTabNavigations;

export type Routes = AppStackRoutes & MainBottomTabRoutes;

export type AuthenticationNavigations = AuthNavigations;

export type AuthenticationRoutes = AuthStackRoutes;
