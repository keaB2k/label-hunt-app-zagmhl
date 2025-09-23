
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';
import Button from '../components/Button';
import SimpleBottomSheet from '../components/BottomSheet';

export default function ProfileScreen() {
  const [userType, setUserType] = useState<'artist' | 'label'>('artist');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // Mock user data
  const mockUser = {
    name: userType === 'artist' ? 'Amara Soul' : 'Afro Fusion Records',
    email: 'user@bidstar.com',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    verified: true,
    memberSince: '2024-01-15',
    stats: userType === 'artist' 
      ? { auctions: 5, totalEarnings: 25000, rating: 4.8 }
      : { signings: 12, totalInvestment: 150000, activeContracts: 8 }
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', action: () => console.log('Edit Profile') },
    { icon: 'card-outline', title: 'Payment Methods', action: () => console.log('Payment Methods') },
    { icon: 'document-text-outline', title: 'My Contracts', action: () => console.log('My Contracts') },
    { icon: 'bar-chart-outline', title: 'Analytics', action: () => console.log('Analytics') },
    { icon: 'help-circle-outline', title: 'Help & Support', action: () => console.log('Help & Support') },
    { icon: 'settings-outline', title: 'Settings', action: () => setIsSettingsVisible(true) },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>Profile</Text>
        <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
          <Icon name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[commonStyles.center, { marginBottom: 24 }]}>
          <Image
            source={{ uri: mockUser.profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
          />
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Text style={[commonStyles.title, { fontSize: 22 }]}>{mockUser.name}</Text>
            {mockUser.verified && (
              <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginLeft: 8 }} />
            )}
          </View>
          <Text style={[commonStyles.textSecondary, { marginBottom: 16 }]}>{mockUser.email}</Text>
          
          {/* User Type Toggle */}
          <View style={[commonStyles.row, { marginBottom: 20 }]}>
            <TouchableOpacity
              style={[
                { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
                userType === 'artist' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
              ]}
              onPress={() => setUserType('artist')}
            >
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginLeft: 8 },
                userType === 'label' ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
              ]}
              onPress={() => setUserType('label')}
            >
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Label</Text>
            </TouchableOpacity>
          </View>

          <Button
            text="Edit Profile"
            onPress={() => console.log('Edit profile')}
            style={[buttonStyles.secondary, { width: '60%' }]}
          />
        </View>

        {/* Stats */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            {userType === 'artist' ? 'Artist Stats' : 'Label Stats'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={[commonStyles.center, { flex: 1 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 20 }]}>
                {userType === 'artist' ? mockUser.stats.auctions : mockUser.stats.signings}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {userType === 'artist' ? 'Auctions' : 'Signings'}
              </Text>
            </View>
            <View style={[commonStyles.center, { flex: 1 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 20 }]}>
                ${userType === 'artist' 
                  ? mockUser.stats.totalEarnings.toLocaleString() 
                  : mockUser.stats.totalInvestment.toLocaleString()}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {userType === 'artist' ? 'Earnings' : 'Investment'}
              </Text>
            </View>
            <View style={[commonStyles.center, { flex: 1 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 20 }]}>
                {userType === 'artist' ? mockUser.stats.rating : mockUser.stats.activeContracts}
              </Text>
              <Text style={commonStyles.textSecondary}>
                {userType === 'artist' ? 'Rating' : 'Active'}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.spaceBetween,
                { paddingVertical: 16 },
                index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
              onPress={item.action}
            >
              <View style={commonStyles.row}>
                <Icon name={item.icon as any} size={24} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '500' }]}>
                  {item.title}
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Info */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Account Information</Text>
          <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
            <Text style={commonStyles.text}>Member Since</Text>
            <Text style={[commonStyles.text, { fontWeight: '600' }]}>
              {new Date(mockUser.memberSince).toLocaleDateString()}
            </Text>
          </View>
          <View style={[commonStyles.spaceBetween, { marginBottom: 12 }]}>
            <Text style={commonStyles.text}>Account Type</Text>
            <Text style={[commonStyles.text, { fontWeight: '600', textTransform: 'capitalize' }]}>
              {userType}
            </Text>
          </View>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.text}>Verification Status</Text>
            <View style={commonStyles.row}>
              <Icon 
                name={mockUser.verified ? "checkmark-circle" : "close-circle"} 
                size={16} 
                color={mockUser.verified ? colors.success : colors.error} 
              />
              <Text style={[commonStyles.text, { marginLeft: 4, fontWeight: '600' }]}>
                {mockUser.verified ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <Button
          text="Sign Out"
          onPress={() => console.log('Sign out')}
          style={[buttonStyles.secondary, { borderColor: colors.error }]}
          textStyle={{ color: colors.error }}
        />
      </ScrollView>

      {/* Settings Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Settings</Text>
          
          <View style={[commonStyles.spaceBetween, { marginBottom: 20 }]}>
            <Text style={commonStyles.text}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>
          
          <TouchableOpacity style={[commonStyles.spaceBetween, { paddingVertical: 16 }]}>
            <Text style={commonStyles.text}>Privacy Policy</Text>
            <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[commonStyles.spaceBetween, { paddingVertical: 16 }]}>
            <Text style={commonStyles.text}>Terms of Service</Text>
            <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[commonStyles.spaceBetween, { paddingVertical: 16 }]}>
            <Text style={commonStyles.text}>About BidStar</Text>
            <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
