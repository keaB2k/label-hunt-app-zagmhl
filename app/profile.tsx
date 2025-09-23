
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import SimpleBottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function ProfileScreen() {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Mock user data - in real app this would come from authentication
  const userData = {
    name: 'Demo User',
    email: 'demo@bidstar.com',
    type: 'artist', // or 'label'
    verified: false,
    joinDate: '2024-01-15',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      subtitle: 'Update your information',
      onPress: () => console.log('Edit profile')
    },
    {
      icon: 'card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage billing and payments',
      onPress: () => console.log('Payment methods')
    },
    {
      icon: 'stats-chart-outline',
      title: 'Analytics',
      subtitle: 'View performance insights',
      onPress: () => router.push('/analytics')
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Verification',
      subtitle: userData.verified ? 'Verified account' : 'Get verified',
      onPress: () => console.log('Verification')
    },
    {
      icon: 'document-text-outline',
      title: 'Legal & Terms',
      subtitle: 'Privacy policy, terms of service',
      onPress: () => router.push('/legal')
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => console.log('Help')
    }
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>Profile</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
          <Icon name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[commonStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <Image
            source={{ uri: userData.profileImage }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 16
            }}
          />
          <View style={[commonStyles.row, { marginBottom: 8 }]}>
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '600', marginRight: 8 }]}>
              {userData.name}
            </Text>
            {userData.verified && (
              <Icon name="checkmark-circle" size={20} color={colors.success} />
            )}
          </View>
          <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
            {userData.email}
          </Text>
          <View style={[commonStyles.badge, { backgroundColor: userData.type === 'artist' ? colors.primary : colors.secondary }]}>
            <Text style={commonStyles.badgeText}>
              {userData.type === 'artist' ? 'Artist' : 'Record Label'}
            </Text>
          </View>
          <Text style={[commonStyles.textSecondary, { marginTop: 12, fontSize: 12 }]}>
            Member since {new Date(userData.joinDate).toLocaleDateString()}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={[commonStyles.row, { marginBottom: 20 }]}>
          <View style={[commonStyles.card, { flex: 1, marginRight: 8, alignItems: 'center' }]}>
            <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
              12
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              {userData.type === 'artist' ? 'Auctions' : 'Bids Placed'}
            </Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, marginLeft: 8, alignItems: 'center' }]}>
            <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.success }]}>
              4.8
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              Rating
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ marginBottom: 20 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[commonStyles.card, { marginBottom: 8 }]}
              onPress={item.onPress}
            >
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.backgroundAlt,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16
                }}>
                  <Icon name={item.icon as any} size={20} color={colors.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    {item.title}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                    {item.subtitle}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <Button
          text="Sign Out"
          onPress={() => {
            console.log('Sign out');
            router.replace('/onboarding');
          }}
          style={[buttonStyles.secondary, { marginBottom: 20 }]}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Settings Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>Settings</Text>
          
          <View style={[commonStyles.spaceBetween, { marginBottom: 20 }]}>
            <View>
              <Text style={[commonStyles.text, { marginBottom: 4 }]}>Push Notifications</Text>
              <Text style={commonStyles.textSecondary}>Get notified about auctions and bids</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.backgroundAlt, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>

          <View style={[commonStyles.spaceBetween, { marginBottom: 20 }]}>
            <View>
              <Text style={[commonStyles.text, { marginBottom: 4 }]}>Email Updates</Text>
              <Text style={commonStyles.textSecondary}>Receive weekly summaries and news</Text>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: colors.backgroundAlt, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>

          <View style={[commonStyles.spaceBetween, { marginBottom: 30 }]}>
            <View>
              <Text style={[commonStyles.text, { marginBottom: 4 }]}>Dark Mode</Text>
              <Text style={commonStyles.textSecondary}>Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.backgroundAlt, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>

          <Button
            text="Save Settings"
            onPress={() => {
              console.log('Settings saved:', { notifications, emailUpdates, darkMode });
              setShowSettings(false);
            }}
            style={buttonStyles.primary}
          />
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
