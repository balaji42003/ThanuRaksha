// Create file: app/auth/doctor-login.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

let LinearGradient;
try {
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch (e) {
  LinearGradient = ({ children, colors, style, ...props }) => (
    <View style={[style, { backgroundColor: colors?.[0] || '#4ECDC4' }]} {...props}>
      {children}
    </View>
  );
}

const DoctorLoginScreen = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    license: '',
    specialization: '',
    experience: '',
    hospital: '',
    qualification: ''
  });

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userData = {
          userType: 'doctor',  // Ensure this is 'doctor'
          email: formData.email,
          name: formData.name || 'Dr. User',
          loginTime: new Date().toISOString()
        };

        await AsyncStorage.setItem('userSession', JSON.stringify(userData));
        
        // Navigate to DOCTOR dashboard
        router.replace('/doctor-dashboard');
      } else {
        // Registration validation
        if (!formData.license) {
          Alert.alert('Error', 'Medical license number is required');
          return;
        }
        Alert.alert('Success', 'Doctor registration submitted for verification!', [
          { text: 'OK', onPress: () => router.replace('/doctor-dashboard') }
        ]);
      }
    } catch (error) {
      console.error('Doctor login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.doctorIconContainer}>
              <Ionicons name="medical" size={40} color="white" />
            </View>
            <Text style={styles.headerTitle}>Doctor {isLogin ? 'Login' : 'Registration'}</Text>
            <Text style={styles.headerSubtitle}>
              {isLogin ? 'Access your medical dashboard' : 'Join our medical network'}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {/* Professional Badge */}
            <View style={styles.professionalBadge}>
              <Ionicons name="shield-checkmark" size={20} color="#4ECDC4" />
              <Text style={styles.badgeText}>Verified Medical Professional Portal</Text>
            </View>

            {!isLogin && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Dr. John Smith"
                      value={formData.name}
                      onChangeText={(text) => setFormData({...formData, name: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Medical License Number *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="card-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your medical license number"
                      value={formData.license}
                      onChangeText={(text) => setFormData({...formData, license: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Specialization *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="heart-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., Cardiologist, Neurologist"
                      value={formData.specialization}
                      onChangeText={(text) => setFormData({...formData, specialization: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Experience *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="time-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Years of experience"
                      keyboardType="numeric"
                      value={formData.experience}
                      onChangeText={(text) => setFormData({...formData, experience: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Hospital/Clinic *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="business-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="Your primary workplace"
                      value={formData.hospital}
                      onChangeText={(text) => setFormData({...formData, hospital: text})}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Qualification *</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="school-outline" size={20} color="#9CA3AF" />
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., MBBS, MD, MS"
                      value={formData.qualification}
                      onChangeText={(text) => setFormData({...formData, qualification: text})}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Professional Email *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="doctor@hospital.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => setFormData({...formData, email: text})}
                />
              </View>
            </View>

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    style={styles.input}
                    placeholder="Professional contact number"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({...formData, phone: text})}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter secure password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({...formData, password: text})}
                />
              </View>
            </View>

            {!isLogin && (
              <View style={styles.disclaimerContainer}>
                <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
                <Text style={styles.disclaimerText}>
                  Your medical credentials will be verified by our medical board before account activation.
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.authButtonGradient}
              >
                <Ionicons name={isLogin ? "log-in" : "person-add"} size={20} color="white" />
                <Text style={styles.authButtonText}>
                  {isLogin ? 'Login to Dashboard' : 'Submit for Verification'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? "New to our network? Register as Doctor" : "Already registered? Login"}
              </Text>
            </TouchableOpacity>

            {/* Features for Doctors */}
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Doctor Dashboard Features</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="people" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>Patient Management System</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="calendar" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>Appointment Scheduling</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="document-text" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>Digital Prescription Pad</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="videocam" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>Telemedicine Consultations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="analytics" size={16} color="#4ECDC4" />
                  <Text style={styles.featureText}>Medical Records & Analytics</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  doctorIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginTop: 20,
    paddingBottom: 40,
  },
  professionalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ECDC4',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    marginLeft: 12,
    color: '#374151',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#92400E',
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  authButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#4ECDC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  authButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  featuresContainer: {
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default DoctorLoginScreen;