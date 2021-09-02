import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts)
  const dispatch = useDispatch()

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          onSelect={() => {}}
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button color={Colors.primary} title='Edit' onPress={() => {}} />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id))
            }}
          />
        </ProductItem>
      )}
    />
  )
}

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        />
      </HeaderButtons>
    ),
  }
}

export default UserProductsScreen
