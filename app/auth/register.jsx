// app/auth/register.js
import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { register } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
      Alert.alert('Registration Successful', 'Please log in with your new account');
      navigation.navigate('auth/login');
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
