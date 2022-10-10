import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {Appbar, Button} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = props => {
  const [imageData, setImageData] = useState([]);
  const [showMoreImage, setShowMoreImage] = useState(0);

  useEffect(() => {
    getData(showMoreImage);
  }, []);

  const getData = showMoreImage => {
    console.log('count :- ', showMoreImage);
    let formdata = new FormData();

    formdata.append('user_id', 108);
    formdata.append('offset', showMoreImage);
    formdata.append('type', 'popular');

    // let body = {user_id: '108', offset: '0', type: 'popular'};

    let url = `http://dev3.xicom.us/xttest/getdata.php`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formdata,
    })
      .then(result => {
        result.json().then(resp => {
          console.log('response :- ', imageData.length);
          if (resp.status === 'success') {
            
            if(imageData.length !==0){
              let a = resp.images;

            let b =  imageData;

            // b diff a
            let resultA = b.filter(
              elm =>
                !a
                  .map(elm => JSON.stringify(elm)).includes(JSON.stringify(elm)),
            );

            // a diff b
            let resultB = a.filter(
              elm =>
                !b
                  .map(elm => JSON.stringify(elm)).includes(JSON.stringify(elm)),
            );

            // show merge
            
            const mergedArray = [ ...resultA, ...resultB ]


            const mergedArrays = [ ...b, ...mergedArray ]

            let newData = [
              ...new Map(mergedArrays.map(item => [item.id, item])).values(),
            ];
            console.log(newData);

            setImageData(newData);
            setShowMoreImage(showMoreImage +1)
            }else{

              setImageData(resp.images);
            }

          } else {
          }
        });
      })
      .catch(error => {
        console.log('error');
      });
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <ScrollView>
        <View style={{marginBottom: 20}}>
          {imageData.map((item, i) => {
            console.log('imagee :- ', item.id);
            return (
              <React.Fragment key={i}>
                <>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.push('Details', {dataAll: item})
                    }
                    style={{padding: 5}}>
                    <Image
                      source={{uri: item.xt_image}}
                      style={[{height: 200, width: '100%'}]}
                    />
                  </TouchableOpacity>
                </>
              </React.Fragment>
            );
          })}

          <View
            style={{
              marginBottom: '5%',
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
            }}>
            <Button mode="contained" onPress={() => getData(showMoreImage)}>
              Show more ...
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
