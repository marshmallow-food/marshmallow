import {AppNavigations, AppStackRoutes} from './navigators/AppStack';
import {
  MainBottomTabNavigations,
  MainBottomTabRoutes,
} from './navigators/MainBottomTab';

export type Navigations = AppNavigations & MainBottomTabNavigations;

export type Routes = AppStackRoutes & MainBottomTabRoutes;
