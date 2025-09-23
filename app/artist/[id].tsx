
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from '../../components/Icon';
import { mockArtists } from '../../data/mockData';
import Button from '../../components/Button';

export default function ArtistProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'about' | 'music' | 'stats'>('about');
  
  const artist = mockArtists.find(a => a.id === id);

  if (!artist) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.center, { flex: 1 }]}>
          <Text style={commonStyles.text}>Artist not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Artist Header */}
        <View style={[commonStyles.center, { marginBottom: 24 }]}>
          <Image
            source={{ uri: artist.profileImage }}
            style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 16 }}
          />
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Text style={[commonStyles.title, { fontSize: 24 }]}>{artist.name}</Text>
            {artist.verified && (
              <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginLeft: 8 }} />
            )}
          </View>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{artist.location}</Text>
          
          {/* Stats Row */}
          <View style={[commonStyles.row, { marginBottom: 20 }]}>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>{artist.rating}</Text>
              <Text style={commonStyles.textSecondary}>Rating</Text>
            </View>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>{artist.totalBids}</Text>
              <Text style={commonStyles.textSecondary}>Total Bids</Text>
            </View>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>{artist.musicSamples.length}</Text>
              <Text style={commonStyles.textSecondary}>Tracks</Text>
            </View>
          </View>

          {/* Genres */}
          <View style={[commonStyles.row, { flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }]}>
            {artist.genre.map((genre, index) => (
              <View key={index} style={[commonStyles.badge, { margin: 4 }]}>
                <Text style={commonStyles.badgeText}>{genre}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={[commonStyles.row, { width: '100%', paddingHorizontal: 20 }]}>
            <Button
              text="Start Auction"
              onPress={() => console.log('Start auction for', artist.name)}
              style={[buttonStyles.primary, { flex: 1, marginRight: 8 }]}
            />
            <TouchableOpacity
              style={[buttonStyles.secondary, { flex: 1, marginLeft: 8 }]}
              onPress={() => console.log('Follow artist', artist.name)}
            >
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={[commonStyles.row, { marginBottom: 20 }]}>
          {(['about', 'music', 'stats'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                { flex: 1, paddingVertical: 12, borderRadius: 8, marginHorizontal: 4 },
                activeTab === tab ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600', textTransform: 'capitalize' }]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>About</Text>
            <Text style={[commonStyles.text, { lineHeight: 24, marginBottom: 16 }]}>{artist.bio}</Text>
            
            {artist.socialMedia && (
              <View>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Social Media</Text>
                {artist.socialMedia.instagram && (
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon name="logo-instagram" size={20} color={colors.primary} />
                    <Text style={[commonStyles.text, { marginLeft: 12 }]}>{artist.socialMedia.instagram}</Text>
                  </View>
                )}
                {artist.socialMedia.twitter && (
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon name="logo-twitter" size={20} color={colors.primary} />
                    <Text style={[commonStyles.text, { marginLeft: 12 }]}>{artist.socialMedia.twitter}</Text>
                  </View>
                )}
                {artist.socialMedia.youtube && (
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon name="logo-youtube" size={20} color={colors.primary} />
                    <Text style={[commonStyles.text, { marginLeft: 12 }]}>{artist.socialMedia.youtube}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        {activeTab === 'music' && (
          <View>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Music Samples</Text>
            {artist.musicSamples.map((sample, index) => (
              <TouchableOpacity key={sample.id} style={[commonStyles.card, { marginBottom: 12 }]}>
                <View style={commonStyles.spaceBetween}>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                      {sample.title}
                    </Text>
                    <Text style={commonStyles.textSecondary}>{sample.genre}</Text>
                  </View>
                  <View style={[commonStyles.row, { alignItems: 'center' }]}>
                    <Text style={[commonStyles.textSecondary, { marginRight: 12 }]}>
                      {formatDuration(sample.duration)}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.primary,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => console.log('Play sample:', sample.title)}
                    >
                      <Icon name="play" size={20} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'stats' && (
          <View>
            <View style={[commonStyles.card, { marginBottom: 16 }]}>
              <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Performance Stats</Text>
              
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Average Rating</Text>
                <View style={commonStyles.row}>
                  <Icon name="star" size={16} color={colors.accent} />
                  <Text style={[commonStyles.text, { marginLeft: 4, fontWeight: '600' }]}>
                    {artist.rating}/5.0
                  </Text>
                </View>
              </View>
              
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Total Auctions</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>{artist.totalBids}</Text>
              </View>
              
              <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={commonStyles.text}>Member Since</Text>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  {new Date(artist.joinDate).toLocaleDateString()}
                </Text>
              </View>
              
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.text}>Verification Status</Text>
                <View style={commonStyles.row}>
                  <Icon 
                    name={artist.verified ? "checkmark-circle" : "close-circle"} 
                    size={16} 
                    color={artist.verified ? colors.success : colors.error} 
                  />
                  <Text style={[commonStyles.text, { marginLeft: 4, fontWeight: '600' }]}>
                    {artist.verified ? 'Verified' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
