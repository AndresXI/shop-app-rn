import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  )
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  )

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChange={(text) => setTitle(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            value={imageUrl}
            onChange={(imageUrl) => setImageUrl(imageUrl)}
            style={styles.input}
          />
        </View>

        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              value={price}
              onChange={(price) => setPrice(price)}
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChange={(description) => setDescription(description)}
            style={styles.input}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          onPress={() => {}}
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
