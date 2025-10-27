// app/(auth)/forgot-password.tsx
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!validateEmail(email)) {
      alert('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
    } catch (error) {
      alert('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <View className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full items-center justify-center mb-6">
            <Icon as={Mail} className="text-green-600 dark:text-green-400" size={40} />
          </View>

          <Text className="text-2xl font-bold text-center mb-2">
            Email Enviado!
          </Text>

          <Text className="text-muted-foreground text-center mb-8">
            Enviamos um link de recuperação para {'\n'}
            <Text className="font-semibold">{email}</Text>
          </Text>

          <Text className="text-sm text-muted-foreground text-center mb-8">
            Verifique sua caixa de entrada e spam. O link expira em 1 hora.
          </Text>

          <View className="w-full gap-3">
            <Button onPress={() => router.push('/screens/login')} className="w-full">
              <Text>Voltar para Login</Text>
            </Button>

            <Button 
              variant="outline" 
              onPress={() => {
                setEmailSent(false);
                setEmail('');
              }}
              className="w-full"
            >
              <Text>Reenviar Email</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold mb-2">
            Esqueceu sua senha?
          </Text>
          <Text className="text-muted-foreground">
            Não se preocupe! Digite seu email e enviaremos um link para redefinir sua senha.
          </Text>
        </View>

        {/* Formulário */}
        <View className="gap-4 mb-6">
          <View>
            <Text className="text-sm font-medium mb-2">Email</Text>
            <Input
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />
          </View>
        </View>

        <View className="gap-3">
          <Button 
            onPress={handleSendEmail} 
            disabled={isLoading || !email}
            className="w-full"
          >
            <Text>
              {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </Text>
          </Button>

          <Button 
            variant="ghost" 
            onPress={() => router.back()}
            disabled={isLoading}
            className="w-full"
          >
            <Text>Voltar para Login</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
