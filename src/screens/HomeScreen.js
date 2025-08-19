import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { userAPI } from '../services/api';
import { calculateBMI } from '../utils/bmiCalculator';

export default function HomeScreen({ navigation, route }) {
  // Lấy thông tin người dùng từ API
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userAPI.getProfile();
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Lấy chiều cao và cân nặng từ userData hoặc sử dụng giá trị mặc định
  const fullName = userData?.name || 'Người dùng';
  const height = userData?.height || '170';
  const weight = userData?.weight || '65';
  const heightUnit = userData?.heightUnit || 'CM';
  const weightUnit = userData?.weightUnit || 'KG';
  
  // Tính toán chỉ số BMI
  const bmi = calculateBMI(parseFloat(weight), parseFloat(height), weightUnit, heightUnit);

  // Dữ liệu mẫu cho biểu đồ
  const workoutData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: () => '#92A3FD',
        strokeWidth: 2
      }
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.userName}>{fullName}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* BMI Card */}
        <View style={styles.bmiCard}>
          <View style={styles.bmiInfo}>
            <Text style={styles.bmiTitle}>BMI (Body Mass Index)</Text>
            <Text style={styles.bmiSubtitle}>You have a {bmi.category.toLowerCase()} weight</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => navigation.navigate('User', userData)}
            >
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bmiChart}>
            <View style={styles.bmiValue}>
              <Text style={styles.bmiValueText}>{bmi.value}</Text>
            </View>
          </View>
        </View>

        {/* Today Target */}
        <View style={styles.targetContainer}>
          <Text style={styles.sectionTitle}>Today Target</Text>
          <TouchableOpacity style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Status */}
        <Text style={styles.sectionTitle}>Activity Status</Text>
        
        {/* Heart Rate Card */}
        <View style={styles.heartRateCard}>
          <View style={styles.heartRateHeader}>
            <Text style={styles.heartRateTitle}>Heart Rate</Text>
            <View style={styles.heartRateValue}>
              <Text style={styles.heartRateNumber}>78</Text>
              <Text style={styles.heartRateUnit}>BPM</Text>
            </View>
          </View>
          
          <View style={styles.heartRateChart}>
            {/* Placeholder for heart rate chart */}
            <View style={styles.chartLine}></View>
          </View>
          
          <View style={styles.timeAgoContainer}>
            <Text style={styles.timeAgoText}>3 mins ago</Text>
          </View>
        </View>

        {/* Water and Sleep Row */}
        <View style={styles.statsRow}>
          {/* Water Intake */}
          <View style={styles.waterCard}>
            <Text style={styles.statTitle}>Water Intake</Text>
            <Text style={styles.waterValue}>4 Liters</Text>
            <Text style={styles.statSubtitle}>Real time updates</Text>
            
            {/* Water intake chart */}
            <View style={styles.waterChart}>
              <View style={styles.waterBar}></View>
            </View>
          </View>

          {/* Sleep */}
          <View style={styles.sleepCard}>
            <Text style={styles.statTitle}>Sleep</Text>
            <Text style={styles.sleepValue}>8h 20m</Text>
            
            {/* Sleep chart */}
            <View style={styles.sleepChart}>
              <View style={styles.sleepWave}></View>
            </View>
          </View>
        </View>

        {/* Calories */}
        <View style={styles.caloriesCard}>
          <Text style={styles.statTitle}>Calories</Text>
          <View style={styles.caloriesContent}>
            <Text style={styles.caloriesValue}>760 kCal</Text>
            <View style={styles.caloriesChart}>
              <View style={styles.caloriesProgress}></View>
            </View>
          </View>
        </View>

        {/* Workout Progress */}
        <View style={styles.workoutProgressContainer}>
          <View style={styles.workoutProgressHeader}>
            <Text style={styles.sectionTitle}>Workout Progress</Text>
            <View style={styles.weeklyButton}>
              <Text style={styles.weeklyButtonText}>Weekly</Text>
              <Feather name="chevron-down" size={16} color="#92A3FD" />
            </View>
          </View>
          
          {/* Workout chart */}
          <View style={styles.workoutChart}>
            <LineChart
              data={workoutData}
              width={320}
              height={180}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: () => '#92A3FD',
                labelColor: () => '#333333',
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#92A3FD'
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        </View>

        {/* Latest Workout */}
        <View style={styles.latestWorkoutContainer}>
          <View style={styles.latestWorkoutHeader}>
            <Text style={styles.sectionTitle}>Latest Workout</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          
          {/* Workout Items */}
          <View style={styles.workoutItem}>
            <View style={styles.workoutItemLeft}>
              <View style={styles.workoutIcon}>
                <FontAwesome5 name="dumbbell" size={20} color="#92A3FD" />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>Fullbody Workout</Text>
                <Text style={styles.workoutDetails}>180 Calories Burn | 20 minutes</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.workoutButton}>
              <Feather name="chevron-right" size={20} color="#92A3FD" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.workoutItem}>
            <View style={styles.workoutItemLeft}>
              <View style={[styles.workoutIcon, styles.workoutIconPurple]}>
                <FontAwesome5 name="dumbbell" size={20} color="#C58BF2" />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>Lowerbody Workout</Text>
                <Text style={styles.workoutDetails}>200 Calories Burn | 30 minutes</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.workoutButton}>
              <Feather name="chevron-right" size={20} color="#92A3FD" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.workoutItem}>
            <View style={styles.workoutItemLeft}>
              <View style={styles.workoutIcon}>
                <FontAwesome5 name="dumbbell" size={20} color="#92A3FD" />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>Ab Workout</Text>
                <Text style={styles.workoutDetails}>150 Calories Burn | 15 minutes</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.workoutButton}>
              <Feather name="chevron-right" size={20} color="#92A3FD" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing}></View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#92A3FD" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="activity" size={24} color="#ADA4A5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Feather name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="camera-outline" size={24} color="#ADA4A5" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('User', userData)}
        >
          <Feather name="user" size={24} color="#ADA4A5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#ADA4A5',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1617',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F7F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // BMI Card
  bmiCard: {
    flexDirection: 'row',
    backgroundColor: '#92A3FD',
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#92A3FD',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  bmiInfo: {
    flex: 3,
  },
  bmiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bmiSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 15,
  },
  viewMoreButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#92A3FD',
    fontSize: 12,
    fontWeight: '600',
  },
  bmiChart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bmiValue: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C58BF2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bmiValueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Today Target
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1617',
  },
  checkButton: {
    backgroundColor: '#EEF6FF',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  checkButtonText: {
    color: '#92A3FD',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Heart Rate Card
  heartRateCard: {
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  heartRateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  heartRateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1617',
  },
  heartRateValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heartRateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92A3FD',
  },
  heartRateUnit: {
    fontSize: 14,
    color: '#92A3FD',
    marginLeft: 5,
  },
  heartRateChart: {
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
  },
  chartLine: {
    height: 2,
    backgroundColor: '#92A3FD',
    width: '100%',
    opacity: 0.5,
  },
  timeAgoContainer: {
    alignItems: 'flex-end',
  },
  timeAgoText: {
    color: '#C58BF2',
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: '#F7F8F8',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  waterCard: {
    flex: 1,
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
    padding: 15,
    marginRight: 10,
  },
  sleepCard: {
    flex: 1,
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
    padding: 15,
    marginLeft: 10,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1617',
    marginBottom: 5,
  },
  waterValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92A3FD',
    marginBottom: 5,
  },
  sleepValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92A3FD',
    marginBottom: 15,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#7B6F72',
    marginBottom: 15,
  },
  waterChart: {
    height: 120,
    justifyContent: 'flex-end',
  },
  waterBar: {
    width: 8,
    height: 100,
    backgroundColor: '#92A3FD',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  sleepChart: {
    height: 80,
    justifyContent: 'center',
  },
  sleepWave: {
    height: 40,
    backgroundColor: '#F7F8F8',
    borderBottomWidth: 2,
    borderBottomColor: '#92A3FD',
    borderStyle: 'solid',
    borderRadius: 20,
  },
  
  // Calories Card
  caloriesCard: {
    backgroundColor: '#F7F8F8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  caloriesContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  caloriesValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92A3FD',
  },
  caloriesChart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F7F8F8',
    borderWidth: 5,
    borderColor: '#92A3FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriesProgress: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#92A3FD',
    opacity: 0.2,
  },
  
  // Workout Progress
  workoutProgressContainer: {
    marginBottom: 20,
  },
  workoutProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weeklyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF6FF',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  weeklyButtonText: {
    color: '#92A3FD',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 5,
  },
  workoutChart: {
    alignItems: 'center',
    marginBottom: 10,
  },
  
  // Latest Workout
  latestWorkoutContainer: {
    marginBottom: 80,
  },
  latestWorkoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeMoreText: {
    color: '#ADA4A5',
    fontSize: 14,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  workoutItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  workoutIconPurple: {
    backgroundColor: '#F8F5FF',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1617',
    marginBottom: 5,
  },
  workoutDetails: {
    fontSize: 12,
    color: '#7B6F72',
  },
  workoutButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
  },
  navButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#92A3FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#92A3FD',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSpacing: {
    height: 70,
  },
});
