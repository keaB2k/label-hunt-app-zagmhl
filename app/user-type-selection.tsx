
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function UserTypeSelectionScreen() {
  const [selectedType, setSelectedType] = useState<'artist' | 'label' | null>(null);

  const handleContinue = () => {
    if (selectedType === 'artist') {
      router.replace('/artist-registration');
    } else if (selectedType === 'label') {
      router.replace('/label-registration');
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {/* Header */}
        <View style={[commonStyles.center, { paddingVertical: 40 }]}>
          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 16 }]}>
            Join BidStar
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textSecondary }]}>
            Choose how you want to participate in our music marketplace
          </Text>
        </View>

        {/* User Type Options */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* Artist Option */}
          <TouchableOpacity
            style={[
              commonStyles.card,
              {
                borderWidth: 2,
                borderColor: selectedType === 'artist' ? colors.primary : 'transparent',
                marginBottom: 20
              }
            ]}
            onPress={() => setSelectedType('artist')}
          >
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Icon name="mic" size={30} color={colors.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  I'm an Artist
                </Text>
                <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
                  Showcase your talent, enter auctions, and get discovered by record labels looking for the next big star.
                </Text>
                <View style={[commonStyles.row, { marginTop: 12 }]}>
                  <View style={[commonStyles.badge, { marginRight: 8, backgroundColor: colors.accent }]}>
                    <Text style={[commonStyles.badgeText, { color: colors.background }]}>$50 entry fee</Text>
                  </View>
                  <View style={[commonStyles.badge, { backgroundColor: colors.success }]}>
                    <Text style={commonStyles.badgeText}>Verified profiles</Text>
                  </View>
                </View>
              </View>
              {selectedType === 'artist' && (
                <Icon name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>

          {/* Label Option */}
          <TouchableOpacity
            style={[
              commonStyles.card,
              {
                borderWidth: 2,
                borderColor: selectedType === 'label' ? colors.primary : 'transparent'
              }
            ]}
            onPress={() => setSelectedType('label')}
          >
            <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16
              }}>
                <Icon name="business" size={30} color={colors.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                  I'm a Record Label
                </Text>
                <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
                  Discover emerging talent, participate in live auctions, and sign exclusive contracts with promising artists.
                </Text>
                <View style={[commonStyles.row, { marginTop: 12 }]}>
                  <View style={[commonStyles.badge, { marginRight: 8, backgroundColor: colors.accent }]}>
                    <Text style={[commonStyles.badgeText, { color: colors.background }]}>Premium access</Text>
                  </View>
                  <View style={[commonStyles.badge, { backgroundColor: colors.success }]}>
                    <Text style={commonStyles.badgeText}>Live bidding</Text>
                  </View>
                </View>
              </View>
              {selectedType === 'label' && (
                <Icon name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={{ paddingBottom: 20 }}>
          <Button
            text="Continue"
            onPress={handleContinue}
            style={[
              buttonStyles.primary,
              { opacity: selectedType ? 1 : 0.5 }
            ]}
          />
          <TouchableOpacity
            onPress={() => router.replace('/')}
            style={[commonStyles.center, { marginTop: 16 }]}
          >
            <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
              Browse as Guest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
