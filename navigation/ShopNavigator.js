import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

import Colors from '../constants/Colors'
import ProductsOverviewScreen from '../screens/shop/ProductsOverViewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
      headerBackStyle: {
        fontFamily: 'open-sans',
      },
    },
  }
)

export default createAppContainer(ProductsNavigator)
