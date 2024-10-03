import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { wp } from '../../helpers/common';
import { TouchableOpacity } from 'react-native';
import Icon from '../../assets/icons/Index';
import { theme } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

const Profile = () => {
    const {user,setAuth} = useAuth();    
    const router = useRouter();
    const onLogout = async ()=>{
        const {error} = await supabase.auth.signOut();

        if(error){
            Alert.alert('Sign Out', 'Error signing out!' ); 
        }

    }

    const handleLogout = async () =>{
        //show confirm modal
        Alert.alert('Confirm', "Are you sure you want to log out?",[
            {
                text: 'Cancel',
                onPress: ()=> console.log('model cancelled'),
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: ()=> onLogout(),
                style: 'destructive'
            }
        ]);
    }

    
  return (
    <ScreenWrapper bg="white">
      <UserHeader user={user} router={router} handleLogout={handleLogout}/>
    </ScreenWrapper>
  )
}

const UserHeader = ({user, router, handleLogout}) => {
    return(
        <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal : wp(4)}}>
            <Header title='Profile' showBackButton = {true}/>
            <TouchableOpacity style = {styles.logoutButton} onPress = {handleLogout}>
                <Icon name="logout" color={theme.colors.rose} />
            </TouchableOpacity>  
        </View>
    )
}
export default Profile

const styles = StyleSheet.create({
    logoutButton: {
        position: 'absolute',
        right: 10,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    }
})