import { View, Text } from 'react-native'
import React from 'react'
import ArrowLeft from './ArrowLeft'
import { theme } from '../../constants/theme'
import Mail from './Mail'
import Lock from './Lock'
import User from './User'
import Heart from './Heart'
import Plus from './Plus'
import Logout from './Logout'
import Phone from './Phone'
import ThreeDotsHorizontal from './ThreeDotsHorizontal'
import ThreeDotsVertical from './ThreeDotsVertical'

const icons = {
    arrowLeft : ArrowLeft,
    mail : Mail,
    lock: Lock,
    user: User,
    heart: Heart,
    plus: Plus,
    logout: Logout,
    phone:Phone,
    threeDotsHorizontal: ThreeDotsHorizontal,
    threeDotsVertical: ThreeDotsVertical
    
}
const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height = {props.size || 24}
        width = {props.size || 24}
        strokeWidth = {props.strokeWidth || 1.9}
        color = {theme.colors.textLight}
        {...props}
    />
  )
}

export default Icon