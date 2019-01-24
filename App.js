/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Card, WhiteSpace, WingBlank, Button } from '@ant-design/react-native'

const instructions = Platform.select({
    ios: { text: 'IOS - Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu' },
    android: {
        text: 'ANDROID - Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
    }
})

export default class App extends Component {
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
        this.state= {
            a: 'aaa2'
        }
    }

    onClick(){
        this.setState({ a: 'bbbb' })
        let k = 0;
        k = 12;
        
    }

    render() {
        return (
            <WingBlank>
                <Button onPress={() => { this.setState({ a: 'bbbb' }) }}>default</Button>
                <Text>{this.state.a}</Text>
            </WingBlank>
        )
    }
}
