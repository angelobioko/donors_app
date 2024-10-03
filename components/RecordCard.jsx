import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import moment from 'moment'
import { hp, wp } from '../helpers/common'
import { TouchableOpacity } from 'react-native'
import Icon from '../assets/icons/Index'

const RecordCard = ({
    item,
    currentuser,
    router,
    hasShadow = true
}) => {
    const shadowStyles = {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 1
    }

    const createdAt = moment(item?.created_at).format('D MMM YY');
    const smsSent = item?.messageSent;
  return (
    <View style={[styles.container,hasShadow && shadowStyles]}>
        <View style={styles.header}>
            <View style={styles.rightDiv}>
                <Icon name="mail"  color={smsSent? theme.colors.primary : theme.colors.rose}/>
                <View style={{gap: 3, marginLeft:2}}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text>{item?.phone}</Text>
                </View>
            </View>
            
            {/* <View>
                <Text style={styles.name}>_</Text>
                <Text>{item?.giftType}</Text>
            </View> */}
            <View>
                {/* <TouchableOpacity>
                    <Icon name="threeDotsVertical" color={theme.colors.text} /> 
                </TouchableOpacity> */}

                <Text>{item?.giftType}</Text>
                <Text>{createdAt}</Text>
            </View>
        </View>
    </View>
  )
}

export default RecordCard

const styles = StyleSheet.create({
    container:{
        gap: 10,
        marginBottom: 1,
        borderRadius: theme.radius.xs*0.5,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 15,
        backgroundColor:'white',
        borderWidth: 0.,
        borderColor: theme.colors.gray,
        shadowColor:'#000'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: hp(2.5),
        color: theme.colors.textDark
    },
    rightDiv: {
        flexDirection: 'row'
    }
})