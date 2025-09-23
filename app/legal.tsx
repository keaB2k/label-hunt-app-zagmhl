
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';

export default function LegalScreen() {
  const [selectedSection, setSelectedSection] = useState<'terms' | 'privacy' | 'safety'>('terms');

  const termsContent = `
BIDSTAR TERMS OF SERVICE

Last updated: December 2024

1. ACCEPTANCE OF TERMS
By accessing and using BidStar, you accept and agree to be bound by the terms and provision of this agreement.

2. PLATFORM OVERVIEW
BidStar is a digital marketplace connecting musical artists with record labels through live auction systems.

3. USER RESPONSIBILITIES

For Artists:
• Provide accurate and truthful information
• Own all rights to submitted music samples
• Pay the $50 entry fee for each auction participation
• Comply with auction rules and timelines
• Honor contracts resulting from successful auctions

For Record Labels:
• Verify business credentials and financial capability
• Bid in good faith with intent to honor contracts
• Provide clear contract terms post-auction
• Respect artist rights and fair dealing principles

4. AUCTION RULES
• Entry fee of $50 per auction for artists
• Bidding is legally binding
• Auction winners must complete contracts within 30 days
• Disputes are handled through our mediation process

5. PAYMENT TERMS
• All fees are non-refundable
• Platform takes 5% commission on successful auctions
• Payments processed through secure third-party providers

6. INTELLECTUAL PROPERTY
• Artists retain ownership of their music
• Limited license granted for platform promotion
• No unauthorized use of submitted content

7. PROHIBITED CONDUCT
• False representation of identity or credentials
• Bid manipulation or collusion
• Harassment or discriminatory behavior
• Violation of copyright or other IP rights

8. TERMINATION
We reserve the right to terminate accounts for violations of these terms.

9. LIMITATION OF LIABILITY
BidStar is not liable for disputes between artists and labels post-auction.

10. GOVERNING LAW
These terms are governed by the laws of South Africa.
  `;

  const privacyContent = `
BIDSTAR PRIVACY POLICY

Last updated: December 2024

1. INFORMATION WE COLLECT

Personal Information:
• Name, email address, location
• Profile photos and biographical information
• Music samples and artistic content
• Social media handles and links

Business Information (Labels):
• Company name and registration details
• Financial verification documents
• Industry references and credentials

Usage Data:
• Platform interaction and navigation patterns
• Auction participation and bidding history
• Communication within the platform

2. HOW WE USE YOUR INFORMATION
• Facilitate connections between artists and labels
• Process auction entries and payments
• Verify user identities and credentials
• Improve platform functionality and user experience
• Send important updates and notifications
• Comply with legal obligations

3. INFORMATION SHARING
We do not sell personal information. We may share data with:
• Other platform users (public profile information)
• Payment processors for transaction handling
• Legal authorities when required by law
• Service providers who assist platform operations

4. DATA SECURITY
• Encryption of sensitive data in transit and at rest
• Regular security audits and updates
• Limited access to personal information
• Secure payment processing through certified providers

5. YOUR RIGHTS
• Access and update your personal information
• Request deletion of your account and data
• Opt-out of marketing communications
• Data portability for your content

6. COOKIES AND TRACKING
We use cookies to enhance user experience and analyze platform usage.

7. INTERNATIONAL TRANSFERS
Data may be processed in countries outside your residence with adequate protection measures.

8. CHILDREN'S PRIVACY
Platform is not intended for users under 18. Parental consent required for minors.

9. CHANGES TO POLICY
We will notify users of significant privacy policy changes.

10. CONTACT US
For privacy concerns: privacy@bidstar.com
  `;

  const safetyContent = `
BIDSTAR SAFETY GUIDELINES

Last updated: December 2024

1. PLATFORM SAFETY COMMITMENT
BidStar is committed to providing a safe, fair, and transparent environment for all users.

2. ARTIST PROTECTION MEASURES

Verification Process:
• Identity verification for all participants
• Music ownership verification
• Social media and credential validation

Fair Bidding:
• Transparent auction processes
• Anti-manipulation monitoring
• Dispute resolution mechanisms

Contract Protection:
• Standard contract templates
• Legal review recommendations
• Mediation services for disputes

3. RECORD LABEL VERIFICATION

Business Verification:
• Company registration confirmation
• Financial capability assessment
• Industry reference checks
• Previous track record review

4. ANTI-EXPLOITATION POLICIES

For Minors:
• Parental consent required for users under 18
• Additional protection measures for young artists
• Educational resources about music industry rights

Fair Dealing:
• Prohibition of predatory contract terms
• Transparency in all agreements
• Right to legal counsel recommendations

5. REPORTING MECHANISMS
• In-app reporting for inappropriate behavior
• 24/7 support for urgent safety concerns
• Anonymous reporting options available
• Swift investigation and response protocols

6. COMMUNITY GUIDELINES

Respectful Communication:
• Professional interaction standards
• Zero tolerance for harassment or discrimination
• Cultural sensitivity and inclusivity

Honest Representation:
• Accurate profile information required
• Authentic music samples only
• Truthful business credentials

7. FINANCIAL SAFETY
• Secure payment processing
• Escrow services for large transactions
• Fraud prevention measures
• Clear fee structures

8. CONTENT MODERATION
• AI-powered content screening
• Human review for reported content
• Swift removal of inappropriate material
• Appeals process for content decisions

9. EMERGENCY CONTACTS
• Safety hotline: +27-XXX-XXXX
• Email: safety@bidstar.com
• Legal concerns: legal@bidstar.com

10. CONTINUOUS IMPROVEMENT
We regularly update our safety measures based on user feedback and industry best practices.
  `;

  const getContent = () => {
    switch (selectedSection) {
      case 'terms': return termsContent;
      case 'privacy': return privacyContent;
      case 'safety': return safetyContent;
      default: return termsContent;
    }
  };

  const getTitle = () => {
    switch (selectedSection) {
      case 'terms': return 'Terms of Service';
      case 'privacy': return 'Privacy Policy';
      case 'safety': return 'Safety Guidelines';
      default: return 'Terms of Service';
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingVertical: 16 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.text, { fontWeight: '600' }]}>Legal & Terms</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Section Tabs */}
      <View style={[commonStyles.row, { paddingHorizontal: 20, marginBottom: 20 }]}>
        {[
          { key: 'terms', label: 'Terms' },
          { key: 'privacy', label: 'Privacy' },
          { key: 'safety', label: 'Safety' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              {
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginHorizontal: 4,
                alignItems: 'center'
              },
              selectedSection === tab.key ? { backgroundColor: colors.primary } : { backgroundColor: colors.backgroundAlt }
            ]}
            onPress={() => setSelectedSection(tab.key as any)}
          >
            <Text style={[
              commonStyles.text,
              { fontSize: 14, fontWeight: '600' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20 }]}>
            {getTitle()}
          </Text>
          <Text style={[commonStyles.textSecondary, { lineHeight: 22 }]}>
            {getContent().trim()}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={[commonStyles.card, { marginTop: 20, backgroundColor: colors.backgroundAlt }]}>
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <Icon name="mail" size={20} color={colors.primary} />
            <Text style={[commonStyles.text, { fontWeight: '600', marginLeft: 8 }]}>
              Need Help?
            </Text>
          </View>
          <Text style={[commonStyles.textSecondary, { lineHeight: 20, marginBottom: 12 }]}>
            If you have questions about our terms, privacy practices, or safety measures, please contact us:
          </Text>
          <Text style={[commonStyles.text, { color: colors.primary, marginBottom: 4 }]}>
            legal@bidstar.com
          </Text>
          <Text style={[commonStyles.text, { color: colors.primary, marginBottom: 4 }]}>
            support@bidstar.com
          </Text>
          <Text style={[commonStyles.text, { color: colors.primary }]}>
            +27 (0) 11 123 4567
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
