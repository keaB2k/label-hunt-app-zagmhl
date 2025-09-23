
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from '../../components/Icon';
import { mockAuctions, mockArtists, mockLabels } from '../../data/mockData';
import Button from '../../components/Button';

export default function AuctionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [bidAmount, setBidAmount] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const auction = mockAuctions.find(a => a.id === id);
  const artist = auction ? mockArtists.find(a => a.id === auction.artistId) : null;

  useEffect(() => {
    if (!auction) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(auction.endTime);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Auction Ended');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [auction]);

  if (!auction || !artist) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.center, { flex: 1 }]}>
          <Text style={commonStyles.text}>Auction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    if (!amount || amount <= auction.currentBid) {
      Alert.alert('Invalid Bid', 'Bid amount must be higher than current bid');
      return;
    }
    
    Alert.alert(
      'Confirm Bid',
      `Place a bid of $${amount.toLocaleString()} for ${artist.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Place Bid', 
          onPress: () => {
            console.log('Bid placed:', amount);
            setBidAmount('');
            Alert.alert('Success', 'Your bid has been placed!');
          }
        }
      ]
    );
  };

  const getStatusColor = () => {
    switch (auction.status) {
      case 'live': return colors.error;
      case 'upcoming': return colors.accent;
      case 'ended': return colors.textSecondary;
      default: return colors.text;
    }
  };

  const getStatusText = () => {
    switch (auction.status) {
      case 'live': return '🔴 LIVE';
      case 'upcoming': return '⏰ UPCOMING';
      case 'ended': return '✅ ENDED';
      default: return auction.status.toUpperCase();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600', color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Artist Info */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Image
              source={{ uri: artist.profileImage }}
              style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <View style={[commonStyles.row, { marginBottom: 4 }]}>
                <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
                  {artist.name}
                </Text>
                {artist.verified && (
                  <Icon name="checkmark-circle" size={18} color={colors.success} style={{ marginLeft: 8 }} />
                )}
              </View>
              <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>{artist.location}</Text>
              <View style={commonStyles.row}>
                <Icon name="star" size={16} color={colors.accent} />
                <Text style={[commonStyles.text, { marginLeft: 4, fontWeight: '600' }]}>
                  {artist.rating}
                </Text>
                <Text style={[commonStyles.textSecondary, { marginLeft: 12 }]}>
                  {artist.totalBids} previous bids
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
            {auction.title}
          </Text>
          <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
            {auction.description}
          </Text>
        </View>

        {/* Auction Details */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Auction Details</Text>
          
          {/* Current Bid */}
          <View style={[commonStyles.center, { marginBottom: 20 }]}>
            <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>Current Bid</Text>
            <Text style={[commonStyles.title, { fontSize: 32, color: colors.success }]}>
              ${auction.currentBid.toLocaleString()}
            </Text>
            <Text style={commonStyles.textSecondary}>{auction.bidCount} bids placed</Text>
          </View>

          {/* Time Remaining */}
          {auction.status === 'live' && (
            <View style={[commonStyles.center, { marginBottom: 20 }]}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>Time Remaining</Text>
              <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '600', color: colors.error }]}>
                {timeRemaining}
              </Text>
            </View>
          )}

          {/* Auction Info Grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={[commonStyles.center, { width: '50%', marginBottom: 16 }]}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>Starting Bid</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                ${auction.startingBid.toLocaleString()}
              </Text>
            </View>
            <View style={[commonStyles.center, { width: '50%', marginBottom: 16 }]}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>Entry Fee</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                ${auction.entryFee}
              </Text>
            </View>
            <View style={[commonStyles.center, { width: '50%' }]}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>Start Time</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {new Date(auction.startTime).toLocaleTimeString()}
              </Text>
            </View>
            <View style={[commonStyles.center, { width: '50%' }]}>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>End Time</Text>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {new Date(auction.endTime).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Bidding Section */}
        {auction.status === 'live' && (
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Place Your Bid</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>
                Minimum bid: ${(auction.currentBid + 100).toLocaleString()}
              </Text>
              <TextInput
                style={commonStyles.input}
                placeholder="Enter bid amount"
                placeholderTextColor={colors.textSecondary}
                value={bidAmount}
                onChangeText={setBidAmount}
                keyboardType="numeric"
              />
            </View>

            <Button
              text={`Place Bid - $${bidAmount || '0'}`}
              onPress={handlePlaceBid}
              style={buttonStyles.primary}
            />
            
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 12, fontSize: 12 }]}>
              By placing a bid, you agree to our terms and conditions
            </Text>
          </View>
        )}

        {/* Winner Section */}
        {auction.status === 'ended' && auction.winner && (
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Auction Winner</Text>
            <View style={[commonStyles.center, { marginBottom: 16 }]}>
              <Icon name="trophy" size={48} color={colors.accent} />
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18, marginTop: 8 }]}>
                {auction.winner}
              </Text>
              <Text style={[commonStyles.text, { color: colors.success, fontWeight: '600' }]}>
                Winning bid: ${auction.currentBid.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Artist's Music Samples */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Music Samples</Text>
          {artist.musicSamples.slice(0, 2).map((sample) => (
            <TouchableOpacity key={sample.id} style={[commonStyles.row, { marginBottom: 12, padding: 12, backgroundColor: colors.backgroundAlt, borderRadius: 8 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {sample.title}
                </Text>
                <Text style={commonStyles.textSecondary}>{sample.genre}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => console.log('Play sample:', sample.title)}
              >
                <Icon name="play" size={16} color={colors.text} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
