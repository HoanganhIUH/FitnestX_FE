import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation, route }) {
  // Lấy thông tin người dùng từ route params
  const userData = route.params?.userData || {};
  
  // Lấy tên người dùng từ userData hoặc sử dụng giá trị mặc định
  const firstName = userData.firstName || 'Stefani';
  const lastName = userData.lastName || '';
  const fullName = firstName + (lastName ? ` ${lastName}` : '');
  const userEmail = userData.email || 'user@example.com'; // Email mặc định
  
  // Trong tương lai, có thể lấy từ:
  // - AsyncStorage
  // - Context API
  // - Redux store
  // - API response
  // - Database query
  
  const handleGoToHome = () => {
    // Truyền toàn bộ dữ liệu người dùng sang màn hình Home
    navigation.replace('Home', {
      ...userData,
      isLoggedIn: true
    });
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image 
          source={require('../assets/images/Group.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.textContainer}>
        <Text style={styles.welcomeTitle}>
          Welcome, {fullName}
        </Text>
        <Text style={styles.welcomeMessage}>
          You are all set now, let's reach your{'\n'}
          goals together with us
        </Text>
      </View>

      {/* Go To Home Button */}
      <TouchableOpacity style={styles.goToHomeButton} onPress={handleGoToHome}>
        <Text style={styles.goToHomeButtonText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: width * 0.8,
    height: width * 0.8,
    maxHeight: height * 0.5,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1617',
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#7B6F72',
    textAlign: 'center',
    lineHeight: 24,
  },
  goToHomeButton: {
    backgroundColor: '#92A3FD',
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#92A3FD',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  goToHomeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});