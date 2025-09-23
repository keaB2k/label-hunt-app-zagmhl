
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { genres } from '../data/mockData';

export default function PostMusicScreen() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    coverImage: ''
  });
  const [showGenreSelector, setShowGenreSelector] = useState(false);

  // Mock trial info - in real app this would come from user context
  const trialInfo = {
    isOnTrial: true,
    daysRemaining: 15,
    postsUsed: 5,
    maxPosts: 20
  };

  const handleGenreSelect = (genre: string) => {
    setFormData({ ...formData, genre });
    setShowGenreSelector(false);
  };

  const handleImagePicker = () => {
    // In a real app, this would open image picker
    Alert.alert(
      'Select Cover Image',
      'Choose how you want to add a cover image',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleAudioPicker = () => {
    // In a real app, this would open audio file picker
    Alert.alert(
      'Select Audio File',
      'Choose your music file to upload',
      [
        { text: 'Browse Files', onPress: () => console.log('Open file browser') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.genre) {
      Alert.alert('Missing Information', 'Please fill in the title and select a genre.');
      return;
    }

    if (trialInfo.postsUsed >= trialInfo.maxPosts) {
      Alert.alert(
        'Post Limit Reached',
        'You have reached your maximum number of posts for the trial period. Upgrade to continue posting.'
      );
      return;
    }

    console.log('Music post data:', formData);
    Alert.alert(
      '🎵 Music Posted Successfully!',
      `Your track "${formData.title}" has been posted and is now live on BidStar!\n\nRecord labels can now discover and bid on your music.`,
      [{ text: 'View My Posts', onPress: () => router.back() }]
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
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>Post Music</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          {/* Trial Status */}
          <View style={[commonStyles.card, { 
            backgroundColor: trialInfo.isOnTrial ? colors.success : colors.backgroundAlt,
            marginBottom: 20
          }]}>
            <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {trialInfo.isOnTrial ? '🎁 Free Trial Active' : '💎 Premium Account'}
              </Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {trialInfo.daysRemaining} days left
              </Text>
            </View>
            <View style={[commonStyles.spaceBetween]}>
              <Text style={[commonStyles.textSecondary]}>
                Posts used: {trialInfo.postsUsed}/{trialInfo.maxPosts}
              </Text>
              <View style={{
                width: 100,
                height: 6,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 3,
                overflow: 'hidden'
              }}>
                <View style={{
                  width: `${(trialInfo.postsUsed / trialInfo.maxPosts) * 100}%`,
                  height: '100%',
                  backgroundColor: colors.primary
                }} />
              </View>
            </View>
          </View>

          {/* Audio Upload */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Audio File *</Text>
            <TouchableOpacity
              style={[commonStyles.input, { 
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderWidth: 2,
                borderColor: colors.primary
              }]}
              onPress={handleAudioPicker}
            >
              <Icon name="musical-notes" size={24} color={colors.primary} />
              <Text style={[commonStyles.text, { marginTop: 8, color: colors.primary }]}>
                Tap to select audio file
              </Text>
              <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                MP3, WAV, M4A (Max 10MB)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cover Image */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Cover Image</Text>
            <TouchableOpacity
              style={[commonStyles.input, { 
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed'
              }]}
              onPress={handleImagePicker}
            >
              {formData.coverImage ? (
                <Image
                  source={{ uri: formData.coverImage }}
                  style={{ width: '100%', height: '100%', borderRadius: 8 }}
                />
              ) : (
                <>
                  <Icon name="image" size={32} color={colors.textSecondary} />
                  <Text style={[commonStyles.textSecondary, { marginTop: 8 }]}>
                    Add cover image
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Track Information */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Track Information</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Track Title *</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter your track title"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Description</Text>
              <TextInput
                style={[commonStyles.input, { height: 80, textAlignVertical: 'top' }]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Describe your track, inspiration, or story behind it..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Genre *</Text>
              <TouchableOpacity
                style={[commonStyles.input, commonStyles.spaceBetween]}
                onPress={() => setShowGenreSelector(!showGenreSelector)}
              >
                <Text style={[
                  commonStyles.text,
                  { color: formData.genre ? colors.text : colors.textSecondary }
                ]}>
                  {formData.genre || 'Select genre'}
                </Text>
                <Icon 
                  name={showGenreSelector ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
              
              {showGenreSelector && (
                <View style={[commonStyles.card, { marginTop: 8, maxHeight: 200 }]}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {genres.map((genre) => (
                      <TouchableOpacity
                        key={genre}
                        style={[commonStyles.spaceBetween, { paddingVertical: 12 }]}
                        onPress={() => handleGenreSelect(genre)}
                      >
                        <Text style={commonStyles.text}>{genre}</Text>
                        {formData.genre === genre && (
                          <Icon name="checkmark" size={20} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Duration (seconds)</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.duration}
                onChangeText={(text) => setFormData({ ...formData, duration: text })}
                placeholder="e.g., 180"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Post Button */}
          <Button
            text={`Post Music (${trialInfo.maxPosts - trialInfo.postsUsed} posts remaining)`}
            onPress={handleSubmit}
            style={[
              buttonStyles.primary,
              { opacity: trialInfo.postsUsed >= trialInfo.maxPosts ? 0.5 : 1 }
            ]}
            disabled={trialInfo.postsUsed >= trialInfo.maxPosts}
          />

          {trialInfo.postsUsed >= trialInfo.maxPosts && (
            <TouchableOpacity
              style={[buttonStyles.secondary, { marginTop: 12 }]}
              onPress={() => console.log('Upgrade account')}
            >
              <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                Upgrade to Post More
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
