import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Header from '../common/Header';
import colors from '../../config/colors';
import { PodcastContext } from '../../contexts/PodcastProvider';
import PodcastItem from './PodcastItem';
import styles from './styles';

const subjects = [
  {
    id: 0,
    name: 'Hôm nay',
    image: require('../../assets/images/podcast_homnay.jpg'),
    url: 'https://vnexpress.net/podcast/vnexpress-hom-nay'
  },
  {
    id: 1,
    name: 'Bạn ổn không',
    image: require('../../assets/images/podcast_banonkhong.jpg'),
    url: 'https://vnexpress.net/podcast/ban-on-khong'
  },
  {
    id: 2,
    name: 'Thầm thì',
    image: require('../../assets/images/podcast_thamthi.jpg'),
    url: 'https://vnexpress.net/podcast/tham-thi'
  },
  {
    id: 3,
    name: 'Tôi trong gương',
    image: require('../../assets/images/podcast_toitrongguong.jpg'),
    url: 'https://vnexpress.net/podcast/toi-trong-guong'
  }
]

const PodcastComponent = ({navigation, route}) => {
  const {state, loadPodcast} = useContext(PodcastContext);
  const [url, setUrl] = useState('https://vnexpress.net/podcast');
  const [audioIndex, setAudioIndex] = useState(-1);

  const onPlayAudioIndex = (index) => {
    setAudioIndex(index);
  }

  useEffect(() => {
    loadPodcast(url);
  }, [url]);

  return (
    <View>
      <ScrollView>
        <Text style={styles.programs}>Các chương trình</Text>
        <FlatList 
          style={styles.list}
          data={subjects}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemSubject}
              onPress={() => {
                setUrl(item.url);
              }}
              >
              <Image 
                style = {styles.itemImageSubject}
                source = {item.image}  
              />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
        {
          state.data.length > 0 ? 
          state.data.map((item, index) => <PodcastItem 
                                            item={item} 
                                            index={index}
                                            active={audioIndex == index}
                                            onPlayAudioIndex={onPlayAudioIndex} 
                                            key={index} 
                                            navigation={navigation} 
                                            route={route} />)
          :
          <ActivityIndicator size="large" color="#00ff00" />        
        }
      </ScrollView>
      <View style={styles.header}>
        <Header
          title='Nghe Podcasts'
          rightIcon='cloud-download-outline'
        />
      </View>
    </View>
  )
}

export default PodcastComponent;