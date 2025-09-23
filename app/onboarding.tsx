
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

const onboardingSteps = [
  {
    id: 1,
    title: 'Discover Amazing Talent',
    description: 'Browse through verified artists from across Africa and discover the next big stars in music.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    icon: 'musical-notes'
  },
  {
    id: 2,
    title: 'Live Auction Experience',
    description: 'Participate in real-time auctions where record labels bid for exclusive contracts with talented artists.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    icon: 'hammer'
  },
  {
    id: 3,
    title: 'Fair & Transparent',
    description: 'Our platform ensures fair bidding, transparent contracts, and protection for both artists and labels.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    icon: 'shield-checkmark'
  }
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/user-type-selection');
    }
  };

  const handleSkip = () => {
    router.replace('/user-type-selection');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Skip Button */}
        <View style={[commonStyles.spaceBetween, { paddingVertical: 16 }]}>
          <View />
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[commonStyles.text, { color: colors.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={[commonStyles.center, { flex: 1 }]}>
          <View style={[commonStyles.center, { marginBottom: 40 }]}>
            <View style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <Icon name={currentStepData.icon as any} size={60} color={colors.text} />
            </View>
            <Image
              source={{ uri: currentStepData.image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 20,
                marginBottom: 30
              }}
            />
          </View>

          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
            {currentStepData.title}
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', lineHeight: 24, marginBottom: 40 }]}>
            {currentStepData.description}
          </Text>

          {/* Progress Indicators */}
          <View style={[commonStyles.row, { marginBottom: 40 }]}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: index === currentStep ? colors.primary : colors.backgroundAlt,
                  marginHorizontal: 6
                }}
              />
            ))}
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={{ paddingBottom: 20 }}>
          <Button
            text={currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            style={buttonStyles.primary}
          />
          {currentStep > 0 && (
            <TouchableOpacity
              onPress={() => setCurrentStep(currentStep - 1)}
              style={[commonStyles.center, { marginTop: 16 }]}
            >
              <Text style={[commonStyles.text, { color: colors.textSecondary }]}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
