import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userServices'
import FlashMessage from 'react-native-flash-message'

const _layout = ()=>{
  return(
    <AuthProvider>
      <MainLayout/>
    </AuthProvider>
  )
}

const MainLayout = () => {
  const {setAuth} = useAuth();

  useEffect(()=>{
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if(session){
        //set auth
        setAuth(session?.user);
        //get user records from public table
        updateUserData(session?.user);
        //move to home screen
        router.replace('/home');
      }else{
        //set auth
        setAuth(null);
        //move to home screen
        router.replace('/welcome');
      }
    })
  },[]);

  const updateUserData = async(user)=>{
    let res = await getUserData(user?.id);
    console.log('got userdata: ', res);
  }
  return (
    <>
      <Stack 
        screenOptions={{headerShown:false}}
      />
      <FlashMessage position="top" />
    </>
    
    
  )
}

export default _layout