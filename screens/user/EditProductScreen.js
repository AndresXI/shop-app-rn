import React, { useEffect, useCallback, useReducer } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
  }
}

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )
  const dispatch = useDispatch()
  const [formState, dispatchFormsState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  })

  const submitHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ])
      return
    }
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
  }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const titleChangeHandler = (text) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    } else {
    }
    dispatchFormsState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: 'title',
    })
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            keyboardType={'default'}
            autoCapitalize='sentences'
            value={title}
            onChangeText={titleChangeHandler}
            style={styles.input}
            returnKeyType='next'
            onEndEditing={() => console.log('onEndEditing')}
          />
          {!titleIsValid && <Text>Please Enter a valid title</Text>}
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
              keyboardType={'decimal-pad'}
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
