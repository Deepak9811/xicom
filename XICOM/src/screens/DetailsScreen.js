import React, {useState, useEffect} from 'react';

import {
  Text,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';

import {Appbar, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emails, setEmail] = useState('');
  const [phones, setPhone] = useState('');
  const [loader, setLoader] = useState(false);

  console.log('data get :- ', props.route.params.dataAll.xt_image);

  const check = () => {
    let img = props.route.params.dataAll.xt_image;

    if (
      firstName !== '' &&
      lastName !== '' &&
      emails !== '' &&
      phones !== '' &&
      img !== ''
    ) {
      setLoader(true);
      submit();
    } else {
      alert('Please fill all the fields');
    }
  };

  const submit = () => {
    // let body = {
    //   "first_name": firstName,
    //   "lastName": lastName,
    //   "email": emails,
    //   "phone": phones,
    //   "user_image": props.route.params.dataAll.xt_image,
    // };

    let formdata = new FormData();

    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);
    formdata.append('email', emails);
    formdata.append('phone', phones);
    // formdata.append('user_image', props.route.params.dataAll.xt_image);

    formdata.append('user_image', {
      uri: props.route.params.dataAll.xt_image,
      name: 'xicom.jpg',
      type: 'image/jpg',
    });

    // return(console.log("test :- ",body))

    let url = `http://dev3.xicom.us/xttest/savedata.php`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(result => {
        result.json().then(resp => {
          console.log('response :- ', resp);
          if (resp.status === 'success') {
            setLoader(false);
            alert(resp.message);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
          } else {
            setLoader(false);
            alert(resp.message);
          }
        });
      })
      .catch(error => {
        setLoader(false);
        alert(
          'There has been a problem with your fetch operation. Please try again',
        );
      });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          style={{paddingLeft: '2%'}}
          onPress={() => props.navigation.goBack()}>
          <AntDesign name="left" color="#05375a" size={25} />
        </TouchableOpacity>
        <Appbar.Content title="Details Screen" />
      </Appbar.Header>

      <ScrollView>
        <View>
          <Image
            source={{uri: props.route.params.dataAll.xt_image}}
            style={[{height: 200, width: '100%'}]}
          />
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
              {' '}
              First Name{' '}
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                returnKeyType="next"
                placeholder="First Name"
                placeholderTextColor="#7F7F7F"
                style={styles.textInput}
                value={firstName}
                onChangeText={val => {
                  setFirstName(val);
                }}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.text_footer, {marginTop: 20}]}>
              {' '}
              Last Name{' '}
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                returnKeyType="next"
                placeholder="Last Name"
                placeholderTextColor="#7F7F7F"
                style={styles.textInput}
                value={lastName}
                onChangeText={val => {
                  setLastName(val);
                }}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.text_footer, {marginTop: 20}]}> Email </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                returnKeyType="next"
                placeholder="Your Email"
                placeholderTextColor="#7F7F7F"
                keyboardType="email-address"
                style={styles.textInput}
                value={emails}
                onChangeText={val => {
                  setEmail(val);
                }}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.text_footer, {marginTop: 20}]}> Phone </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                returnKeyType="next"
                placeholder="Your Phone"
                placeholderTextColor="#7F7F7F"
                keyboardType="number-pad"
                maxLength={10}
                style={styles.textInput}
                value={phones}
                onChangeText={val => {
                  setPhone(val);
                }}
              />
            </View>
          </View>

          <View style={{marginTop: 25}}>
            {!loader ? (
              <Button mode="contained" onPress={() => check()}>
                Submit
              </Button>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '5%',
                }}>
                <View
                  style={{
                    backgroundColor: '#ddd',
                    borderRadius: 50,
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator size={'large'} />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: '#ce1412',
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },

  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
});
