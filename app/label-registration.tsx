
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { genres } from '../data/mockData';

export default function LabelRegistrationScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    description: '',
    website: '',
    established: ''
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.location || selectedGenres.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields and select at least one genre.');
      return;
    }
    
    if (!agreedToTerms) {
      Alert.alert('Terms Required', 'Please agree to the terms and conditions to continue.');
      return;
    }

    console.log('Label registration data:', { ...formData, genres: selectedGenres });
    Alert.alert(
      'Registration Submitted!',
      'Your record label profile is under review. You will receive a verification email within 24 hours.',
      [{ text: 'OK', onPress: () => router.replace('/') }]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Label Registration</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {/* Company Information */}
          <View style={{ marginBottom: 30 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Company Information</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Label Name *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter your record label name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Business Email *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="contact@yourlabel.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Location *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder="City, Country"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Established Year</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.established}
                onChangeText={(text) => setFormData({ ...formData, established: text })}
                placeholder="2020"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Website</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                placeholder="www.yourlabel.com"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Company Description</Text>
              <TextInput
                style={[commonStyles.input, { height: 100, textAlignVertical: 'top' }]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Tell us about your record label, mission, and what you're looking for..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Music Genres */}
          <View style={{ marginBottom: 30 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>Music Genres of Interest *</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
              Select all genres you're interested in signing
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    commonStyles.badge,
                    {
                      margin: 4,
                      backgroundColor: selectedGenres.includes(genre) ? colors.primary : colors.backgroundAlt,
                      borderWidth: 1,
                      borderColor: selectedGenres.includes(genre) ? colors.primary : colors.border
                    }
                  ]}
                  onPress={() => handleGenreToggle(genre)}
                >
                  <Text style={[
                    commonStyles.badgeText,
                    { color: selectedGenres.includes(genre) ? colors.text : colors.textSecondary }
                  ]}>
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Verification Requirements */}
          <View style={[commonStyles.card, { marginBottom: 30, backgroundColor: colors.backgroundAlt }]}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Icon name="information-circle" size={20} color={colors.accent} />
              <Text style={[commonStyles.text, { fontWeight: '600', marginLeft: 8 }]}>
                Verification Required
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
              To participate in auctions, you'll need to provide:
            </Text>
            <View style={{ marginTop: 12 }}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                • Business registration documents
              </Text>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                • Proof of financial capability
              </Text>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                • Industry references (optional but recommended)
              </Text>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity
              style={[commonStyles.row, { alignItems: 'flex-start' }]}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: agreedToTerms ? colors.primary : colors.border,
                backgroundColor: agreedToTerms ? colors.primary : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                marginTop: 2
              }}>
                {agreedToTerms && (
                  <Icon name="checkmark" size={12} color={colors.text} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
                  I agree to the{' '}
                  <Text style={{ color: colors.primary }}>Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={{ color: colors.primary }}>Privacy Policy</Text>
                  . I understand the bidding rules and contract obligations.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <Button
            text="Submit Registration"
            onPress={handleSubmit}
            style={buttonStyles.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
