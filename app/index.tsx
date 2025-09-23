
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Redirect } from 'expo-router';
import Icon from '../components/Icon';
import { mockAuctions, mockArtists } from '../data/mockData';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'discover' | 'auctions'>('discover');
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  // Mock current user - in real app this would come from authentication
  const currentUser = {
    type: 'artist',
    artistId: '2' // Thabo Beats (on trial)
  };

  const currentArtist = mockArtists.find(artist => artist.id === currentUser.artistId);

  useEffect(() => {
    // Check if user has seen onboarding before
    // In a real app, this would check AsyncStorage or user authentication
    const checkFirstTime = async () => {
      try {
        // Simulate checking storage
        const hasSeenOnboarding = true; // Changed to true to skip onboarding for demo
        setIsFirstTime(!hasSeenOnboarding);
      } catch (error) {
        console.log('Error checking first time status:', error);
        setIsFirstTime(true);
      }
    };

    checkFirstTime();
  }, []);

  // Show loading or redirect to onboarding
  if (isFirstTime === null) {
    return (
      <SafeAreaView style={[commonStyles.container, commonStyles.center]}>
        <Text style={commonStyles.text}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  const liveAuctions = mockAuctions.filter(auction => auction.status === 'live');
  const upcomingAuctions = mockAuctions.filter(auction => auction.status === 'upcoming');

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <View>
          <Text style={commonStyles.title}>BidStar</Text>
          <Text style={commonStyles.textSecondary}>Discover Amazing Talent</Text>
        </View>
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Icon name="person-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Trial Banner for Artists */}
      {currentUser.type === 'artist' && currentArtist?.trialInfo.isOnTrial && (
        <View style={[commonStyles.card, { 
          marginHorizontal: 20,
          marginBottom: 20,
          backgroundColor: colors.primary
        }]}>
          <View style={[commonStyles.spaceBetween, { marginBottom: 8 }]}>
            <Text style={[commonStyles.text, { fontWeight: '700' }]}>
              🎁 Free Trial: {currentArtist.trialInfo.daysRemaining} days left
            </Text>
            <TouchableOpacity onPress={() => router.push('/post-music')}>
              <Icon name="add-circle" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={[commonStyles.text, { marginBottom: 12 }]}>
            Posts: {currentArtist.trialInfo.postsUsed}/{currentArtist.trialInfo.maxPosts} used
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.text,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              alignSelf: 'flex-start'
            }}
            onPress={() => router.push('/post-music')}
          >
            <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
              Post Music Now
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tab Navigation */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, marginBottom: 20 }]}>
        <TouchableOpacity
          style={[
            { flex: 1, paddingVertical: 12, borderRadius: 25, marginRight: 8 },
            selectedTab === 'discover' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
          ]}
          onPress={() => setSelectedTab('discover')}
        >
          <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
            Discover Artists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { flex: 1, paddingVertical: 12, borderRadius: 25, marginLeft: 8 },
            selectedTab === 'auctions' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
          ]}
          onPress={() => setSelectedTab('auctions')}
        >
          <Text style={[commonStyles.text, { textAlign: 'center', fontWeight: '600' }]}>
            Live Auctions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'discover' ? (
          <View>
            {/* Featured Artists */}
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Featured Artists</Text>
            {mockArtists.map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.id}`} asChild>
                <TouchableOpacity style={commonStyles.card}>
                  <View style={commonStyles.row}>
                    <Image
                      source={{ uri: artist.profileImage }}
                      style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={commonStyles.row}>
                        <Text style={[commonStyles.text, { fontWeight: '600', marginRight: 8 }]}>
                          {artist.name}
                        </Text>
                        {artist.verified && (
                          <Icon name="checkmark-circle" size={16} color={colors.success} />
                        )}
                        {artist.trialInfo.isOnTrial && (
                          <View style={[commonStyles.badge, { 
                            marginLeft: 8,
                            backgroundColor: colors.success,
                            paddingHorizontal: 6,
                            paddingVertical: 2
                          }]}>
                            <Text style={[commonStyles.badgeText, { fontSize: 10 }]}>
                              TRIAL
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text style={[commonStyles.textSecondary, { marginVertical: 4 }]}>
                        {artist.location}
                      </Text>
                      <View style={commonStyles.row}>
                        {artist.genre.slice(0, 2).map((genre, index) => (
                          <View key={index} style={[commonStyles.badge, { marginRight: 8 }]}>
                            <Text style={commonStyles.badgeText}>{genre}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <View style={commonStyles.center}>
                      <View style={commonStyles.row}>
                        <Icon name="star" size={16} color={colors.accent} />
                        <Text style={[commonStyles.text, { marginLeft: 4, fontWeight: '600' }]}>
                          {artist.rating}
                        </Text>
                      </View>
                      <Text style={commonStyles.textSecondary}>{artist.totalBids} bids</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        ) : (
          <View>
            {/* Live Auctions */}
            {liveAuctions.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>🔴 Live Now</Text>
                {liveAuctions.map((auction) => {
                  const artist = mockArtists.find(a => a.id === auction.artistId);
                  return (
                    <Link key={auction.id} href={`/auction/${auction.id}`} asChild>
                      <TouchableOpacity style={[commonStyles.card, { borderColor: colors.error, borderWidth: 2 }]}>
                        <View style={commonStyles.spaceBetween}>
                          <View style={{ flex: 1 }}>
                            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                              {artist?.name}
                            </Text>
                            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
                              {auction.description}
                            </Text>
                            <View style={commonStyles.row}>
                              <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                                ${auction.currentBid.toLocaleString()}
                              </Text>
                              <Text style={[commonStyles.textSecondary, { marginLeft: 16 }]}>
                                {auction.bidCount} bids
                              </Text>
                            </View>
                          </View>
                          <View style={commonStyles.center}>
                            <Text style={[commonStyles.text, { fontWeight: '600', color: colors.error }]}>
                              {formatTimeRemaining(auction.endTime)}
                            </Text>
                            <Text style={commonStyles.textSecondary}>remaining</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  );
                })}
              </View>
            )}

            {/* Upcoming Auctions */}
            {upcomingAuctions.length > 0 && (
              <View>
                <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>⏰ Coming Soon</Text>
                {upcomingAuctions.map((auction) => {
                  const artist = mockArtists.find(a => a.id === auction.artistId);
                  return (
                    <Link key={auction.id} href={`/auction/${auction.id}`} asChild>
                      <TouchableOpacity style={commonStyles.card}>
                        <View style={commonStyles.spaceBetween}>
                          <View style={{ flex: 1 }}>
                            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                              {artist?.name}
                            </Text>
                            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
                              {auction.description}
                            </Text>
                            <Text style={[commonStyles.text, { fontWeight: '600', color: colors.accent }]}>
                              Starting at ${auction.startingBid.toLocaleString()}
                            </Text>
                          </View>
                          <View style={commonStyles.center}>
                            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                              Starts in{'\n'}{formatTimeRemaining(auction.startTime)}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.backgroundAlt,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}>
        <TouchableOpacity style={[commonStyles.center, { flex: 1 }]}>
          <Icon name="home" size={24} color={colors.primary} />
          <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>Home</Text>
        </TouchableOpacity>
        <Link href="/search" asChild>
          <TouchableOpacity style={[commonStyles.center, { flex: 1 }]}>
            <Icon name="search" size={24} color={colors.text} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>Search</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/auctions" asChild>
          <TouchableOpacity style={[commonStyles.center, { flex: 1 }]}>
            <Icon name="hammer" size={24} color={colors.text} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>Auctions</Text>
          </TouchableOpacity>
        </Link>
        {currentUser.type === 'artist' && (
          <Link href="/my-music" asChild>
            <TouchableOpacity style={[commonStyles.center, { flex: 1 }]}>
              <Icon name="musical-notes" size={24} color={colors.text} />
              <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>My Music</Text>
            </TouchableOpacity>
          </Link>
        )}
        <Link href="/profile" asChild>
          <TouchableOpacity style={[commonStyles.center, { flex: 1 }]}>
            <Icon name="person" size={24} color={colors.text} />
            <Text style={[commonStyles.textSecondary, { fontSize: 12, marginTop: 4 }]}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
