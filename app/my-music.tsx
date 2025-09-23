
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { mockArtists } from '../data/mockData';

export default function MyMusicScreen() {
  const [selectedTab, setSelectedTab] = useState<'posts' | 'analytics'>('posts');

  // Mock current artist data - in real app this would come from user context
  const currentArtist = mockArtists[1]; // Thabo Beats (on trial)

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>My Music</Text>
        <TouchableOpacity onPress={() => router.push('/post-music')}>
          <Icon name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Trial Status Banner */}
      {currentArtist.trialInfo.isOnTrial && (
        <View style={[commonStyles.card, { 
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: colors.primary
        }]}>
          <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
            <Text style={[commonStyles.text, { fontWeight: '700' }]}>
              🎁 Free Trial Active
            </Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {currentArtist.trialInfo.daysRemaining} days left
            </Text>
          </View>
          <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
            <Text style={[commonStyles.text]}>
              Posts: {currentArtist.trialInfo.postsUsed}/{currentArtist.trialInfo.maxPosts}
            </Text>
            <View style={{
              width: 120,
              height: 6,
              backgroundColor: colors.backgroundAlt,
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <View style={{
                width: `${(currentArtist.trialInfo.postsUsed / currentArtist.trialInfo.maxPosts) * 100}%`,
                height: '100%',
                backgroundColor: colors.text
              }} />
            </View>
          </View>
          <Text style={[commonStyles.text, { fontSize: 14 }]}>
            Keep posting to get discovered by record labels!
          </Text>
        </View>
      )}

      {/* Tab Navigation */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, marginBottom: 20 }]}>
        <TouchableOpacity
          style={[
            { flex: 1, paddingVertical: 12, borderRadius: 25, marginRight: 8 },
            selectedTab === 'posts' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
          ]}
          onPress={() => setSelectedTab('posts')}
        >
          <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
            My Posts ({currentArtist.musicPosts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, paddingVertical: 12, borderRadius: 25, marginLeft: 8 },
            selectedTab === 'analytics' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
          ]}
          onPress={() => setSelectedTab('analytics')}
        >
          <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'posts' ? (
          <View>
            {currentArtist.musicPosts.length === 0 ? (
              <View style={[commonStyles.center, { paddingVertical: 60 }]}>
                <Icon name="musical-notes-outline" size={64} color={colors.textSecondary} />
                <Text style={[commonStyles.text, { marginTop: 16, marginBottom: 8 }]}>
                  No music posted yet
                </Text>
                <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 24 }]}>
                  Start your musical journey by posting your first track
                </Text>
                <Button
                  text="Post Your First Track"
                  onPress={() => router.push('/post-music')}
                  style={buttonStyles.primary}
                />
              </View>
            ) : (
              <View>
                {currentArtist.musicPosts.map((post) => (
                  <View key={post.id} style={[commonStyles.card, { marginBottom: 16 }]}>
                    <View style={[commonStyles.row, { marginBottom: 12 }]}>
                      <Image
                        source={{ uri: post.coverImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' }}
                        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 16 }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                          {post.title}
                        </Text>
                        <View style={[commonStyles.row, { marginBottom: 4 }]}>
                          <View style={[commonStyles.badge, { marginRight: 8 }]}>
                            <Text style={commonStyles.badgeText}>{post.genre}</Text>
                          </View>
                          <Text style={commonStyles.textSecondary}>
                            {formatDuration(post.duration)}
                          </Text>
                        </View>
                        <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                          Posted {formatDate(post.uploadDate)}
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Icon name="ellipsis-vertical" size={20} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>

                    {post.description && (
                      <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>
                        {post.description}
                      </Text>
                    )}

                    <View style={[commonStyles.spaceBetween]}>
                      <View style={[commonStyles.row]}>
                        <View style={[commonStyles.row, { marginRight: 20 }]}>
                          <Icon name="heart" size={16} color={colors.error} />
                          <Text style={[commonStyles.textSecondary, { marginLeft: 4 }]}>
                            {post.likes}
                          </Text>
                        </View>
                        <View style={[commonStyles.row]}>
                          <Icon name="play" size={16} color={colors.primary} />
                          <Text style={[commonStyles.textSecondary, { marginLeft: 4 }]}>
                            {post.plays}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity>
                        <Icon name="share-outline" size={20} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          <View>
            {/* Analytics Tab */}
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={[commonStyles.card, { flex: 1, marginRight: 8, alignItems: 'center' }]}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
                  {currentArtist.musicPosts.reduce((sum, post) => sum + post.plays, 0)}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  Total Plays
                </Text>
              </View>
              <View style={[commonStyles.card, { flex: 1, marginLeft: 8, alignItems: 'center' }]}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.error }]}>
                  {currentArtist.musicPosts.reduce((sum, post) => sum + post.likes, 0)}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  Total Likes
                </Text>
              </View>
            </View>

            <View style={[commonStyles.card, { marginBottom: 20 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Top Performing Track
              </Text>
              {currentArtist.musicPosts.length > 0 ? (
                <View>
                  {(() => {
                    const topTrack = currentArtist.musicPosts.reduce((prev, current) => 
                      (prev.plays > current.plays) ? prev : current
                    );
                    return (
                      <View style={[commonStyles.row]}>
                        <Image
                          source={{ uri: topTrack.coverImage || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400' }}
                          style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
                        />
                        <View style={{ flex: 1 }}>
                          <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                            {topTrack.title}
                          </Text>
                          <Text style={[commonStyles.textSecondary]}>
                            {topTrack.plays} plays • {topTrack.likes} likes
                          </Text>
                        </View>
                      </View>
                    );
                  })()}
                </View>
              ) : (
                <Text style={commonStyles.textSecondary}>
                  No tracks posted yet
                </Text>
              )}
            </View>

            <View style={[commonStyles.card]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Engagement Rate
              </Text>
              <View style={{
                height: 8,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 8
              }}>
                <View style={{
                  width: '68%',
                  height: '100%',
                  backgroundColor: colors.success
                }} />
              </View>
              <Text style={[commonStyles.textSecondary]}>
                68% - Great engagement! Keep posting quality content.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          elevation: 8
        }}
        onPress={() => router.push('/post-music')}
      >
        <Icon name="add" size={24} color={colors.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
