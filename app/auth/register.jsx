// app/auth/register.js
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, FONT_FAMILY } from '../../constants/theme';
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('auth/login')}>
        <Text style={styles.link}>Login</Text>
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
