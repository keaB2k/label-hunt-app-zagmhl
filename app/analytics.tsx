
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

// Mock analytics data
const analyticsData = {
  totalAuctions: 156,
  activeArtists: 89,
  registeredLabels: 23,
  totalRevenue: 125000,
  averageBid: 8750,
  successRate: 78,
  topGenres: [
    { name: 'Afrobeat', percentage: 35, count: 31 },
    { name: 'Hip-Hop', percentage: 28, count: 25 },
    { name: 'R&B', percentage: 18, count: 16 },
    { name: 'Jazz', percentage: 12, count: 11 },
    { name: 'Soul', percentage: 7, count: 6 }
  ],
  recentActivity: [
    { type: 'auction_won', artist: 'Amara Soul', label: 'Afro Fusion Records', amount: 12500, time: '2 hours ago' },
    { type: 'new_artist', artist: 'Keza Voice', time: '5 hours ago' },
    { type: 'auction_started', artist: 'Thabo Beats', time: '1 day ago' },
    { type: 'label_joined', label: 'Urban Pulse Entertainment', time: '2 days ago' }
  ]
};

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const DoughnutChart = ({ data, size = 120 }: { data: any[], size?: number }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let currentAngle = 0;
    
    return (
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <View style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.backgroundAlt,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 18 }]}>
            {total}
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            Total
          </Text>
        </View>
        
        {/* Legend */}
        <View style={{ marginTop: 16, width: '100%' }}>
          {data.map((item, index) => (
            <View key={index} style={[commonStyles.row, { marginBottom: 8, justifyContent: 'space-between' }]}>
              <View style={[commonStyles.row, { flex: 1 }]}>
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning][index % 5],
                  marginRight: 8
                }} />
                <Text style={[commonStyles.textSecondary, { flex: 1 }]}>{item.name}</Text>
              </View>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                {item.percentage}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const StatCard = ({ title, value, subtitle, icon, color = colors.primary }: any) => (
    <View style={[commonStyles.card, { flex: 1, margin: 4 }]}>
      <View style={[commonStyles.row, { marginBottom: 8 }]}>
        <Icon name={icon} size={20} color={color} />
        <Text style={[commonStyles.textSecondary, { marginLeft: 8, flex: 1 }]}>{title}</Text>
      </View>
      <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', marginBottom: 4 }]}>
        {value}
      </Text>
      {subtitle && (
        <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'auction_won': return 'trophy';
      case 'new_artist': return 'person-add';
      case 'auction_started': return 'hammer';
      case 'label_joined': return 'business';
      default: return 'information-circle';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'auction_won': return colors.success;
      case 'new_artist': return colors.primary;
      case 'auction_started': return colors.accent;
      case 'label_joined': return colors.secondary;
      default: return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>Analytics Dashboard</Text>
        <TouchableOpacity>
          <Icon name="download-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={[commonStyles.row, { marginBottom: 20 }]}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                {
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  marginHorizontal: 4,
                  alignItems: 'center'
                },
                selectedPeriod === period ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                commonStyles.text,
                { fontSize: 14, fontWeight: '600', textTransform: 'capitalize' }
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Key Metrics</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
          <StatCard
            title="Total Auctions"
            value={analyticsData.totalAuctions}
            subtitle="+12% from last month"
            icon="hammer"
            color={colors.primary}
          />
          <StatCard
            title="Active Artists"
            value={analyticsData.activeArtists}
            subtitle="+8% from last month"
            icon="mic"
            color={colors.secondary}
          />
          <StatCard
            title="Record Labels"
            value={analyticsData.registeredLabels}
            subtitle="+15% from last month"
            icon="business"
            color={colors.accent}
          />
          <StatCard
            title="Total Revenue"
            value={`$${(analyticsData.totalRevenue / 1000).toFixed(0)}K`}
            subtitle="+23% from last month"
            icon="cash"
            color={colors.success}
          />
        </View>

        {/* Performance Metrics */}
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <StatCard
            title="Average Bid"
            value={`$${analyticsData.averageBid.toLocaleString()}`}
            subtitle="Per auction"
            icon="trending-up"
            color={colors.primary}
          />
          <StatCard
            title="Success Rate"
            value={`${analyticsData.successRate}%`}
            subtitle="Auctions completed"
            icon="checkmark-circle"
            color={colors.success}
          />
        </View>

        {/* Genre Distribution */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Popular Genres</Text>
        <View style={commonStyles.card}>
          <DoughnutChart data={analyticsData.topGenres} />
        </View>

        {/* Recent Activity */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16, marginTop: 30 }]}>Recent Activity</Text>
        <View style={commonStyles.card}>
          {analyticsData.recentActivity.map((activity, index) => (
            <View key={index} style={[
              commonStyles.row,
              { paddingVertical: 12, borderBottomWidth: index < analyticsData.recentActivity.length - 1 ? 1 : 0, borderBottomColor: colors.border }
            ]}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: getActivityColor(activity.type),
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Icon name={getActivityIcon(activity.type) as any} size={16} color={colors.text} />
              </View>
              <View style={{ flex: 1 }}>
                {activity.type === 'auction_won' && (
                  <Text style={[commonStyles.text, { marginBottom: 2 }]}>
                    <Text style={{ fontWeight: '600' }}>{activity.artist}</Text> won by{' '}
                    <Text style={{ fontWeight: '600' }}>{activity.label}</Text> for{' '}
                    <Text style={{ color: colors.success, fontWeight: '600' }}>${activity.amount?.toLocaleString()}</Text>
                  </Text>
                )}
                {activity.type === 'new_artist' && (
                  <Text style={[commonStyles.text, { marginBottom: 2 }]}>
                    <Text style={{ fontWeight: '600' }}>{activity.artist}</Text> joined as new artist
                  </Text>
                )}
                {activity.type === 'auction_started' && (
                  <Text style={[commonStyles.text, { marginBottom: 2 }]}>
                    Auction started for <Text style={{ fontWeight: '600' }}>{activity.artist}</Text>
                  </Text>
                )}
                {activity.type === 'label_joined' && (
                  <Text style={[commonStyles.text, { marginBottom: 2 }]}>
                    <Text style={{ fontWeight: '600' }}>{activity.label}</Text> joined as record label
                  </Text>
                )}
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {activity.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Insights */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16, marginTop: 30 }]}>Insights</Text>
        <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <Icon name="bulb" size={20} color={colors.accent} />
            <Text style={[commonStyles.text, { fontWeight: '600', marginLeft: 8 }]}>
              Platform Insights
            </Text>
          </View>
          <Text style={[commonStyles.textSecondary, { lineHeight: 20, marginBottom: 8 }]}>
            • Afrobeat artists are seeing 35% higher bid rates this month
          </Text>
          <Text style={[commonStyles.textSecondary, { lineHeight: 20, marginBottom: 8 }]}>
            • Weekend auctions have 23% better completion rates
          </Text>
          <Text style={[commonStyles.textSecondary, { lineHeight: 20 }]}>
            • Artists with verified social media get 40% more bids
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
