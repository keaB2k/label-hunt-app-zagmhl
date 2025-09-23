
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Icon from '../components/Icon';
import { mockAuctions, mockArtists } from '../data/mockData';

export default function AuctionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');

  const filteredAuctions = selectedFilter === 'all' 
    ? mockAuctions 
    : mockAuctions.filter(auction => auction.status === selectedFilter);

  const formatTimeRemaining = (endTime: string, status: string) => {
    if (status === 'ended') return 'Ended';
    
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return colors.error;
      case 'upcoming': return colors.accent;
      case 'ended': return colors.textSecondary;
      default: return colors.text;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return '🔴';
      case 'upcoming': return '⏰';
      case 'ended': return '✅';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>All Auctions</Text>
        <TouchableOpacity>
          <Icon name="filter" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={commonStyles.content}>
        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          <View style={[commonStyles.row, { paddingRight: 20 }]}>
            {(['all', 'live', 'upcoming', 'ended'] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 12 },
                  selectedFilter === filter 
                    ? { backgroundColor: colors.primary } 
                    : { backgroundColor: colors.backgroundAlt }
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  commonStyles.text, 
                  { fontWeight: '600', textTransform: 'capitalize' }
                ]}>
                  {filter} {filter !== 'all' && `(${mockAuctions.filter(a => a.status === filter).length})`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Auctions List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            {filteredAuctions.length} {filteredAuctions.length === 1 ? 'Auction' : 'Auctions'}
          </Text>

          {filteredAuctions.map((auction) => {
            const artist = mockArtists.find(a => a.id === auction.artistId);
            return (
              <Link key={auction.id} href={`/auction/${auction.id}`} asChild>
                <TouchableOpacity 
                  style={[
                    commonStyles.card, 
                    { marginBottom: 16 },
                    auction.status === 'live' && { borderColor: colors.error, borderWidth: 2 }
                  ]}
                >
                  {/* Status Badge */}
                  <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
                    <View style={[
                      commonStyles.badge,
                      { backgroundColor: getStatusColor(auction.status) }
                    ]}>
                      <Text style={[commonStyles.badgeText, { color: colors.text }]}>
                        {getStatusIcon(auction.status)} {auction.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={[commonStyles.textSecondary, { fontWeight: '600' }]}>
                      {formatTimeRemaining(auction.endTime, auction.status)}
                    </Text>
                  </View>

                  {/* Artist Info */}
                  <View style={[commonStyles.row, { marginBottom: 12 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                        {artist?.name}
                      </Text>
                      <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
                        {auction.description}
                      </Text>
                      <View style={commonStyles.row}>
                        {artist?.genre.slice(0, 2).map((genre, index) => (
                          <View key={index} style={[commonStyles.badge, { marginRight: 8 }]}>
                            <Text style={commonStyles.badgeText}>{genre}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Bid Info */}
                  <View style={commonStyles.spaceBetween}>
                    <View>
                      <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                        {auction.status === 'ended' ? 'Final Bid' : 'Current Bid'}
                      </Text>
                      <Text style={[
                        commonStyles.text, 
                        { fontWeight: '600', fontSize: 18, color: colors.success }
                      ]}>
                        ${auction.currentBid.toLocaleString()}
                      </Text>
                    </View>
                    <View style={commonStyles.center}>
                      <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                        Bids
                      </Text>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {auction.bidCount}
                      </Text>
                    </View>
                    <View style={commonStyles.center}>
                      <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                        Entry Fee
                      </Text>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        ${auction.entryFee}
                      </Text>
                    </View>
                  </View>

                  {/* Winner Info for Ended Auctions */}
                  {auction.status === 'ended' && auction.winner && (
                    <View style={[
                      commonStyles.row, 
                      { 
                        marginTop: 12, 
                        padding: 12, 
                        backgroundColor: colors.backgroundAlt, 
                        borderRadius: 8 
                      }
                    ]}>
                      <Icon name="trophy" size={20} color={colors.accent} />
                      <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                        Winner: {auction.winner}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </Link>
            );
          })}

          {filteredAuctions.length === 0 && (
            <View style={[commonStyles.center, { marginTop: 40 }]}>
              <Icon name="hammer" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No {selectedFilter !== 'all' ? selectedFilter : ''} auctions found
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
                Check back later for new opportunities
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
