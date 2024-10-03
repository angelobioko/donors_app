import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Pressable, StyleSheet, Text, View, Image, Alert, ScrollView } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons/Index'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native';
import { getStatistics } from '../../services/statService';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');
const Home = () => {

    const {user,setAuth} = useAuth();
    const [statData,setStatData] = useState();
    
    const router = useRouter();

    const data = [
        { id: 1, image: require('../../assets/images/Vinnie1.jpg') },
        { id: 2, image: require('../../assets/images/Vinnie2.jpg') },
        { id: 3, image: require('../../assets/images/Vinnie3.jpg') },
        { id: 4, image: require('../../assets/images/Vinnie4.jpg') }
      ];

      useEffect(()=>{
        getStats();
    },[])

    // Function to get statistic data from DB
    const getStats = async () => {
      const statRes = await getStatistics();

      if(statRes.success){
        //
        setStatData(statRes?.data);
        console.log('Stats Result :', statRes)
        return
      }
     
      showMessage({ message: statRes.msg, type: 'danger' });
      
    }

    // Function to handle pull-down refresh
    const onRefresh = async () => {
      setRefreshing(true);
      await getStats(); // Fetch new data here
      setRefreshing(false);
    };


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
            <Text style={styles.title}>Gifts</Text>
            <View style={styles.icons}>
                <Pressable onPress={()=> router.push('notifications')}>
                    <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                </Pressable>
                <Pressable onPress={()=> router.push('newPost')}>
                    <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text} />
                </Pressable>
                <Pressable onPress={()=> router.push('profile')}>
                    <Avatar
                        uri={user?.image}
                        size={hp(4.3)}
                        rounded={theme.radius.sm}
                        style={{borderWidth: 2}}
                    />
                </Pressable>
            </View>
        </View>

        {/* slider here */}
        <Swiper
          style={styles.wrapper}
          showsButtons={false} // Optional: to hide/enable navigation buttons
          autoplay={true} // Optional: auto-scroll
          autoplayTimeout={3} // Interval for auto-scroll (in seconds)
          showsPagination={true} // Optional: to show pagination dots
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          //paginationStyle={styles.pagination}
        >
          {data.map((item) => (
            <View key={item.id} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            </View>
          ))}
        </Swiper>

        </View>
        {/* Stats Section */}
        <View style={{flex:1}}>
          {/* first column */}
          <View style={styles.statsContainer}>
            {/* Envelope Stats */}
            <TouchableOpacity style={styles.statCard}>
              <Text style={styles.statNumber}>{statData?.envelopes}</Text>
              <Text style={styles.statLabel}>Envelopes</Text>
            </TouchableOpacity>

            {/* Parcel Stats */}
            <TouchableOpacity style={styles.statCard}>
              <Text style={styles.statNumber}>{statData?.parcels}</Text>
              <Text style={styles.statLabel}>Parcels</Text>
            </TouchableOpacity>
          </View>

          {/* second column */}
          <View style={styles.statsContainer}>
            {/* Envelope Stats */}
            <TouchableOpacity style={styles.statCard}>
              <Text style={styles.statNumber}>{statData?.smssent}</Text>
              <Text style={styles.statLabel}>SMS sent</Text>
            </TouchableOpacity>

            {/* Parcel Stats */}
            <TouchableOpacity style={styles.statCard}>
              <Text style={styles.statNumber}>{statData?.smsfailed}</Text>
              <Text style={styles.statLabel}>SMS failed</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    header:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold
    },
    avatarImage: {
        height:hp(4.3),
        width: hp(4.3),
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray,
        borderWidth: 3
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    wrapper: {
      flex: 0
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(45),
      },
      image: {
        width: width - 20,
        height: hp(45),
        borderRadius: 10,
      },
      dot: {
        backgroundColor: 'gray',
      },
      activeDot: {
        backgroundColor: 'blue',
      },
      pagination:{
            //position: 'absolute',
            bottom: hp(15), // You can adjust this to move the dots closer or further from the image
      },
      statsContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: hp(2), // Adjust for spacing between rows
        paddingHorizontal: wp(5),  // Add padding for responsiveness
        //marginTop: -hp(10)
      },
      statCard: {
        //backgroundColor: '#444',
        flex: 1,  // Each card takes equal width
        marginHorizontal: wp(1),
        paddingVertical: hp(5),
        paddingHorizontal: wp(15),
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1,
        backgroundColor:'white',
        borderWidth: 0.,
        borderColor: theme.colors.gray,
        shadowColor:'#000'
      },
      statNumber: {
        fontSize: 36,
      //  color: 'white',
        fontWeight: 'bold',
      },
      statLabel: {
        fontSize: 16,
       // color: 'white',
      },
})