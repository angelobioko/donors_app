import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { hp, wp } from '../../helpers/common'
import Header from '../../components/Header'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'expo-router'
import { fetchRecords } from '../../services/postSerice'
import RecordCard from '../../components/RecordCard'
import Loading from '../../components/Loading'
import { theme } from '../../constants/theme'

var limit = 0;
const Notifications = () => {
  const {user,setAuth} = useAuth();  
  const router = useRouter();

  const[records,setRecords] = useState([]);
  const[hasMore,setHasMore] = useState(true);

  // useEffect(()=>{
  //   getRecords();
  // },[])

  //get records
  const getRecords = async ()=>{

    if(!hasMore) return null;

    limit = limit + 10
    console.log('fetching post', limit);
    let res = await fetchRecords(limit);
    if(res.success){
      if (records.length==res.data.length) setHasMore(false)
      setRecords(res.data);
    }
    console.log('got post result', res);
  }


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Records" showBackButton={true} /> 

        {/* records */}
        <FlatList
          data={records}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          keyExtractor={item=> item.id.toString()}
          renderItem={({item})=><RecordCard
            item={item}
            currentUser={user}
            router={router}
            />        
        }
        onEndReached={()=>{
          console.log('got to the end');
          getRecords(); 
        }}
        ListFooterComponent={hasMore?(
          <View style={{marginVertical: records.length==0? 200: 30}}>
            <Loading/>
          </View>
        ):(
          <View style={{marginVertical: 30}}>
            <Text style={styles.noPosts}>No more records</Text>
          </View>
        )}
        />
      </View>
    </ScreenWrapper>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  listStyle:{
    paddingTop: 20,
    paddingHorizontal: wp(4)
  },
  noPosts: {
      fontSize: hp(2),
      textAlign: 'center',
      color: theme.colors.text
  },
  pill: {
      position: 'absolute',
      right: -10,
      top: -4,
  },
})