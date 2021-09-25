import React from 'react';
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Footer from '../components/footer';
import back from '../img/back.png';
import headphone from '../img/headphone.png';
import headphonebig from '../img/headphonebig.png';
import enter from '../img/audioa.png';
import mail from '../img/mail.png';
import phone from '../img/phone.png'

export default function ChatIntro({navigation}) {

    return (
        <View style = {{flex: 1}}>
            <Container>
                <Header>
                    <BackButton onPress = {() => navigation.pop()}>
                        <Image source = {back}/>
                    </BackButton>
                    <HeaderText>Reach the support team</HeaderText>
                </Header>
                <Section>
                    <Image source = {headphonebig}/>
                    <SectionText>How can we help you?</SectionText>
                </Section>
                <Card onPress = {() => navigation.navigate("Chat")}>
                    <View style = {{flexDirection: "row"}}>
                        <Image source = {headphone}/>
                        <CardText>Contact Live Chat</CardText>
                    </View>


                    <Image source = {enter}/>
                </Card>
                <Contact>
                    <Image source = {mail}/>
                </Contact>    
                    <Details>
                    <Head>send us an e-mail</Head>
                    <SubHead>abc@gmail.com</SubHead>
                    </Details>
                
                <Contact>
                    <Image source = {phone}/>
                </Contact>    
                    <Details>
                    <Head>call us anytime</Head>
                    <SubHead>0000-000-000</SubHead>
                
                    </Details>
            </Container>
            <Footer navigation = {navigation}/>
        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`

const BackButton = styled.TouchableOpacity`
    
`

const Header = styled.View`
    width: 100%;
    
    padding: 25px;
    padding-top: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 25px;
    
`

const Section = styled.View`
    padding-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SectionText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-top: 25px;
`

const Card = styled.TouchableOpacity`
    width: 90%;
    padding:20px;
    margin-top: 35px;
    border-radius: 20px;
    border-color: #0092ff;
    border-width: 2px;
    background-color: #c1ddf2;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`

const CardText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
`

const Contact = styled.View`
    background-color: #c1ddf2;
    border-radius: 200px;
    
    height: 90px;
    width: 90px;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
`

const Head = styled.Text`
    color: #727272;
    margin-top: 5px;
    font-size: 14px;
`

const SubHead = styled.Text`
    font-size: 16px;
    font-weight: bold;
`

const Details = styled.View`
    align-items: center;
    justify-content: center;
`