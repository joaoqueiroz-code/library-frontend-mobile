// app/index.js
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace('/auth/login'); // Usa replace em vez de push
    }, 0); // O delay de 0 garante que o redirecionamento ocorra após a montagem

    return () => clearTimeout(timeoutId); // Limpa o timeout se o componente for desmontado
  }, [router]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Redirecionando...</Text> Mensagem enquanto redireciona */}
    </View>
  );
}
