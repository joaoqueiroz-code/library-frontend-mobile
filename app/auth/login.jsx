// app/auth/login.js
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, FONT_FAMILY } from '../../constants/theme';
import { login } from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      console.log(userData);
      
      Alert.alert('Login Successful', `Welcome`);
      navigation.replace('home/index');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Library</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('auth/register')}>
        <Text style={styles.link}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZE.xLarge,
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.bold,
    marginBottom: SPACING.large,
  },
  input: {
    width: '100%',
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: SPACING.medium,
    fontSize: FONT_SIZE.medium,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: FONT_SIZE.large,
    fontFamily: FONT_FAMILY.bold,
  },
  link: {
    color: COLORS.secondary,
    marginTop: SPACING.medium,
    fontSize: FONT_SIZE.medium,
    fontFamily: FONT_FAMILY.regular,
  },
});
