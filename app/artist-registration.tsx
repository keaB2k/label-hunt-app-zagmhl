
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { genres, createTrialInfo } from '../data/mockData';

export default function ArtistRegistrationScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    instagram: '',
    twitter: '',
    youtube: ''
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      Alert.alert('Limit Reached', 'You can select up to 3 genres only.');
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

    // Create trial info for new artist
    const trialInfo = createTrialInfo();
    
    console.log('Artist registration data:', { 
      ...formData, 
      genres: selectedGenres,
      trialInfo 
    });
    
    Alert.alert(
      '🎉 Welcome to BidStar!',
      `Your artist profile has been created successfully!\n\n✨ You now have a 20-day FREE TRIAL to post your music and showcase your talent.\n\n📅 Trial ends: ${new Date(trialInfo.trialEndDate).toLocaleDateString()}\n🎵 You can post up to 20 music tracks during your trial.\n\nStart posting your music now and get discovered by record labels!`,
      [{ text: 'Start Posting Music!', onPress: () => router.replace('/') }]
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
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Artist Registration</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {/* Free Trial Banner */}
          <View style={[commonStyles.card, { 
            backgroundColor: colors.primary, 
            marginBottom: 20,
            borderRadius: 16
          }]}>
            <View style={[commonStyles.row, { marginBottom: 12 }]}>
              <Icon name="gift" size={24} color={colors.text} />
              <Text style={[commonStyles.text, { fontWeight: '700', marginLeft: 12, fontSize: 18 }]}>
                20-Day FREE Trial!
              </Text>
            </View>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>
              🎵 Post up to 20 music tracks
            </Text>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>
              🎯 Get discovered by record labels
            </Text>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>
              💰 No entry fees during trial
            </Text>
            <Text style={[commonStyles.text]}>
              🚀 Build your fanbase and portfolio
            </Text>
          </View>

          {/* Basic Information */}
          <View style={{ marginBottom: 30 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Basic Information</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Artist Name *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter your stage name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Email Address *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="your.email@example.com"
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
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Bio</Text>
              <TextInput
                style={[commonStyles.input, { height: 100, textAlignVertical: 'top' }]}
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                placeholder="Tell us about your music and journey..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Genres */}
          <View style={{ marginBottom: 30 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 8 }]}>Music Genres *</Text>
            <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>
              Select up to 3 genres that best describe your music
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

          {/* Social Media */}
          <View style={{ marginBottom: 30 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Social Media (Optional)</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Instagram</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.instagram}
                onChangeText={(text) => setFormData({ ...formData, instagram: text })}
                placeholder="@yourusername"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Twitter</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.twitter}
                onChangeText={(text) => setFormData({ ...formData, twitter: text })}
                placeholder="@yourusername"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>YouTube</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.youtube}
                onChangeText={(text) => setFormData({ ...formData, youtube: text })}
                placeholder="Channel name"
                placeholderTextColor={colors.textSecondary}
              />
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
                  . I understand that after my 20-day free trial, there will be a $1 entry fee for each auction I participate in.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <Button
            text="Start My Free Trial!"
            onPress={handleSubmit}
            style={buttonStyles.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
