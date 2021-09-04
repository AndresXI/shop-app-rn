import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )
  const dispatch = useDispatch()

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  )
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  )

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(prodId, title, description, imageUrl)
      )
    } else {
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      )
    }
    props.navigation.goBack()
  }, [dispatch, prodId, title, description, imageUrl, price])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            value={imageUrl}
            onChangeText={(imageUrl) => setImageUrl(imageUrl)}
            style={styles.input}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              value={price}
              onChangeText={(price) => setPrice(price)}
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={(description) => setDescription(description)}
            style={styles.input}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit')

  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={submitFn}
          title='Save'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default EditProductScreen
