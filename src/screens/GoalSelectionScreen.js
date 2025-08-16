import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const goals = [
  {
    id: 1,
    title: 'Improve Shape',
    description: 'I have a low amount of body fat and need / want to build more muscle',
    image: require('../assets/images/Vector.png'),
  },
  {
    id: 2,
    title: 'Lean & Tone',
    description: 'I\'m "skinny fat", look thin but have no shape. I want to add lean muscle in the right way',
    image: require('../assets/images/Vector(1).png'),
  },
  {
    id: 3,
    title: 'Lose a Fat',
    description: 'I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass',
    image: require('../assets/images/Vector(2).png'),
  },
];

export default function GoalSelectionScreen({ navigation, route }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const scrollViewRef = useRef(null);

  const handleConfirm = () => {
    if (selectedGoals.length > 0) {
      // Log dữ liệu profile và goals được chọn
      const profileData = route.params?.profileData;
      
      // Tạo object dữ liệu hoàn chỉnh
      const completeData = {
        ...profileData,
        goals: selectedGoals.map(goal => goal.title),
        timestamp: new Date().toISOString()
      };
      
      console.log('Complete Profile Data:', completeData);
      
      // Có thể lưu vào AsyncStorage hoặc gửi lên server ở đây
      // saveToStorage(completeData);
      // sendToServer(completeData);
      
      // Đăng ký thành công! Chuyển đến trang Welcome
      navigation.navigate('Auth', { userData: completeData });
    }
  };

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const goToSlide = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setCurrentSlide(index);
  };

  const selectGoal = (goal) => {
    setSelectedGoals(prevGoals => {
      const isAlreadySelected = prevGoals.find(g => g.id === goal.id);
      if (isAlreadySelected) {
        // Nếu đã chọn rồi thì bỏ chọn
        return prevGoals.filter(g => g.id !== goal.id);
      } else {
        // Nếu chưa chọn thì thêm vào
        return [...prevGoals, goal];
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>What is your goal ?</Text>
        <Text style={styles.subtitle}>It will help us to choose a best program for you</Text>
        <Text style={styles.hintText}>You can select multiple goals if needed</Text>
        
        {/* Selected Goals Counter */}
        {selectedGoals.length > 0 && (
          <View style={styles.selectedCounter}>
            <Text style={styles.selectedCounterText}>
              {selectedGoals.length} {selectedGoals.length === 1 ? 'Goal' : 'Goals'} Selected
            </Text>
          </View>
        )}
      </View>

      {/* Slides Container */}
      <View style={styles.slidesContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
        >
          {goals.map((goal, index) => (
            <View key={goal.id} style={styles.slide}>
              <Image source={goal.image} style={styles.goalImage} />
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalDescription}>{goal.description}</Text>
              
                             <TouchableOpacity
                 style={[
                   styles.selectButton,
                   selectedGoals.find(g => g.id === goal.id) && styles.selectButtonActive
                 ]}
                 onPress={() => selectGoal(goal)}
               >
                 <Text style={[
                   styles.selectButtonText,
                   selectedGoals.find(g => g.id === goal.id) && styles.selectButtonTextActive
                 ]}>
                   {selectedGoals.find(g => g.id === goal.id) ? 'Selected' : 'Select'}
                 </Text>
               </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {goals.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              currentSlide === index && styles.dotActive
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          selectedGoals.length === 0 && styles.confirmButtonDisabled
        ]}
        onPress={handleConfirm}
        disabled={selectedGoals.length === 0}
      >
        <Text style={styles.confirmButtonText}>
          Confirm ({selectedGoals.length} {selectedGoals.length === 1 ? 'Goal' : 'Goals'})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  selectedCounter: {
    backgroundColor: '#92A3FD',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  selectedCounterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 14,
    color: '#92A3FD',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  slidesContainer: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  goalImage: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  goalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  selectButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#92A3FD',
    backgroundColor: 'transparent',
  },
  selectButtonActive: {
    backgroundColor: '#92A3FD',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92A3FD',
  },
  selectButtonTextActive: {
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E1E5E9',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#92A3FD',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  confirmButton: {
    backgroundColor: '#92A3FD',
    paddingVertical: 18,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 25,
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
  confirmButtonDisabled: {
    backgroundColor: '#E1E5E9',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
