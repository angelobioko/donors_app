import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Input from '../../components/Input';
import Icon from '../../assets/icons/Index';
import Buttons from '../../components/Buttons';
import { useRouter } from 'expo-router';
import { createOrUpdatePost } from '../../services/postSerice';
import apiClient from '../../lib/apiClient';
import { mnotifybaseUrl, mnotifyKey, sender, sms } from '../../constants';
import { KeyboardAvoidingView } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useAuth } from '../../contexts/AuthContext';
import { sendSMS } from '../../services/sendSms';

const NewPost = () => {
  const {user,setAuth} = useAuth();  
  const router = useRouter();
  
  // Using state for form values
  // State for form values and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    giftType: 'envelope'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [comment, setComment] = useState(''); 
  // const [loading, setLoading] = useState(false);
  // const [giftType, setGiftType] = useState('envelope'); 
  // const [errors, setErrors] = useState(''); 

  const validateForm = () => {
    const newErrors = {};

    if(!formData.name.trim()){
      newErrors.name = 'Name is required';
    }

     // Validate email only if it's not empty
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (formData.email.trim() && !emailRegex.test(email)) {
       newErrors.email = 'Invalid email format';
     }
 
     // Validate phone (simple check for length and numbers)
     if (!formData.phone.trim()) {
       newErrors.phone = 'Phone number is required';
     } else if (formData.phone.length < 10) {
       newErrors.phone = 'Phone number must be at least 10 digits';
     }

     if(!formData.giftType.trim()){
      newErrors.giftType = 'Select a gift type'
     }

     setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  }

  const onSubmit = async () => {
    if (!validateForm()) {
      showMessage({
        message: 'Submit Error',
        description: 'Please correct the errors before submitting',
        type: 'danger',
      });
      return;
    }

    setLoading(true);
   
    const postData = {
      ...formData,
      userId: user?.id,
    };

    try {
      const postRes = await createOrUpdatePost(postData);

      if (postRes.success) {
        const smsRes = await sendSMS(postRes.data);
        const successMessage = `Record added successfully.\n ${smsRes.status === 'success' ? smsRes.message : 'SMS failed'}`;

        // Update post with SMS status
        const messageSent = smsRes.status === 'success';
        await createOrUpdatePost({ id: postRes?.data?.id, messageSent });
      
        // Reset form after successful submission
        setFormData({ name: '', email: '', phone: '', comment: '', giftType: 'envelope' });
        showMessage({ message: successMessage, type: smsRes.status === 'success' ? 'success' : 'danger' });
      } else {
        showMessage({ message: postRes.msg, type: 'danger' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      showMessage({ message: 'Submission failed. Please try again.', type: 'danger' });
    }

    setLoading(false);
  
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="New Gift" showBackButton={true} /> 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your details to record a gift
            </Text>
            
            {/* Name Input */}
            <Input 
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Enter your name"
              onChangeText={(value) => handleInputChange('name',value)}
              value={formData.name} // Bind the value to state
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            {/* Phone Input */}
            <Input 
              icon={<Icon name="phone" size={26} strokeWidth={1.6} />}
              placeholder="Enter phone number"
              onChangeText={(value) => handleInputChange('phone',value.replace(/[^0-9]/g, ''))}
              value={formData.phone} 
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            
            {/* Email Input */}
            <Input 
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              onChangeText={(value) => handleInputChange('email',value)}
              value={formData.email} 
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Radio Buttons */}
            <Text style={styles.radioLabel}>Select Gift Type:</Text>
            <View style={styles.radioContainer}>
              {/* Envelope Radio Button */}
              <Pressable style={styles.radioButton} onPress={() => handleInputChange('giftType','envelope')}>
                <View style={styles.radioCircle}>
                  {formData.giftType === 'envelope' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.radioText}>Envelope</Text>
              </Pressable>

              {/* Parcel Radio Button */}
              <Pressable style={styles.radioButton} onPress={() => handleInputChange('giftType','parcel')}>
                <View style={styles.radioCircle}>
                  {formData.giftType === 'parcel' && <View style={styles.selectedRb} />}
                </View>
                <Text style={styles.radioText}>Parcel</Text>
              </Pressable>
            </View>
            {errors.giftType && <Text style={styles.errorText}>{errors.giftType}</Text>}

            {/* Comment TextArea (TextInput) */}
            <Text style={styles.radioLabel}>Comment:</Text>
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => handleInputChange('comment',text)}
              value={formData.comment} // Bind the value to state
              placeholder="Enter description..."
            />
          

          </View>

          <Buttons title="Submit" loading={loading} onPress={onSubmit} />
        </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ScreenWrapper>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  form: {
    gap: 25,
  },
  textArea: {
    minHeight: 150,
    borderWidth: 0.4,
    paddingHorizontal: 18,
    textAlignVertical: 'top', // Ensure the text starts from the top
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  radioText: {
    fontSize: hp(2),
    color: theme.colors.text
  },
  radioLabel: {
    //fontSize: hp(2),
    //fontWeight: 'bold',
    color: theme.colors.text,
  },
  errorText:{
    color: 'red',
    marginBottom: 2
  }
});
