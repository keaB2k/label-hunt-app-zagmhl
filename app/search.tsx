
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Icon from '../components/Icon';
import { mockArtists, genres } from '../data/mockData';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState(mockArtists);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    let filtered = mockArtists;
    
    if (query.trim()) {
      filtered = filtered.filter(artist => 
        artist.name.toLowerCase().includes(query.toLowerCase()) ||
        artist.location.toLowerCase().includes(query.toLowerCase()) ||
        artist.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(artist =>
        artist.genre.some(g => selectedGenres.includes(g))
      );
    }
    
    setSearchResults(filtered);
  };

  const toggleGenre = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newSelectedGenres);
    handleSearch(searchQuery);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>Search Artists</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={commonStyles.content}>
        {/* Search Input */}
        <View style={{ marginBottom: 20 }}>
          <View style={[commonStyles.input, commonStyles.row, { paddingVertical: 12 }]}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[commonStyles.text, { flex: 1, marginLeft: 12 }]}
              placeholder="Search by name, location, or genre..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Genre Filter */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>Filter by Genre</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[commonStyles.row, { paddingRight: 20 }]}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    commonStyles.badge,
                    { marginRight: 8 },
                    selectedGenres.includes(genre) && { backgroundColor: colors.accent }
                  ]}
                  onPress={() => toggleGenre(genre)}
                >
                  <Text style={[
                    commonStyles.badgeText,
                    selectedGenres.includes(genre) && { color: colors.background }
                  ]}>
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Search Results */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
            {searchResults.length} {searchResults.length === 1 ? 'Artist' : 'Artists'} Found
          </Text>
          
          {searchResults.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`} asChild>
              <TouchableOpacity style={[commonStyles.card, { marginBottom: 12 }]}>
                <View style={commonStyles.row}>
                  <Image
                    source={{ uri: artist.profileImage }}
                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={[commonStyles.row, { marginBottom: 4 }]}>
                      <Text style={[commonStyles.text, { fontWeight: '600', marginRight: 8 }]}>
                        {artist.name}
                      </Text>
                      {artist.verified && (
                        <Icon name="checkmark-circle" size={16} color={colors.success} />
                      )}
                    </View>
                    <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
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
          
          {searchResults.length === 0 && (
            <View style={[commonStyles.center, { marginTop: 40 }]}>
              <Icon name="search" size={48} color={colors.textSecondary} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No artists found matching your criteria
              </Text>
              <Text style={[commonStyles.textSecondary, { marginTop: 8, textAlign: 'center' }]}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
