import { FlatList, View, Dimensions, ActivityIndicator } from 'react-native'
import React, {useEffect, useContext, useCallback} from 'react'

import ContentItem from './ContentItem'; 
import { NewsContext } from '../../contexts/NewsProvider';
import colors from '../../config/colors';
import Break from '../common/Break';
import styles from './styles';

const {width} = Dimensions.get('screen');

const ContentList = (props) => {
  const {newsState, loadNews} = useContext(NewsContext);

  useEffect(() => {
    loadNews(props.item.rss);
  }, []);

  const loadContentItem = useCallback(({item}) => (
    <ContentItem navigation={props.navigation} route={props.route} category={props.item.name} key={item.id} item={item}/>
  ), []);
  
  return (
    <View style={{width}}>
      {newsState.loading ? 
      <View style={styles.listIndicator}>
        <ActivityIndicator size="large" color={colors.gray} />
      </View>
      :       
      <FlatList 
        data={newsState.data} 
        renderItem={loadContentItem} 
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={1}
        initialNumToRender={1}
        keyExtractor={({index}) => index}
        ItemSeparatorComponent={() => (
          <Break />
        )}
      />}
    </View>
  )
}

export default ContentList;