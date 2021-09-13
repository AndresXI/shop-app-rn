import React, { useState, useEffect, useCallback } from 'react'
import {
  Text,
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(productActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    setIsLoading(true)
    loadProducts().then(() => setIsLoading(false))
  }, [dispatch, loadProducts])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)
    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadProducts} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products fround. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem>
      )}
    />
  )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductsOverviewScreen
