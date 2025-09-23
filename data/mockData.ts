
import { Artist, RecordLabel, Auction } from '../types';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Amara Soul',
    bio: 'Afrobeat sensation from Lagos, blending traditional rhythms with modern production.',
    genre: ['Afrobeat', 'R&B', 'Soul'],
    location: 'Lagos, Nigeria',
    profileImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    musicSamples: [
      {
        id: '1',
        title: 'Midnight Groove',
        duration: 180,
        url: 'sample1.mp3',
        genre: 'Afrobeat'
      },
      {
        id: '2',
        title: 'City Lights',
        duration: 210,
        url: 'sample2.mp3',
        genre: 'R&B'
      }
    ],
    socialMedia: {
      instagram: '@amarasoul',
      twitter: '@amarasoul_music'
    },
    verified: true,
    rating: 4.8,
    totalBids: 23,
    joinDate: '2024-01-15',
    trialInfo: {
      isOnTrial: false,
      trialStartDate: '2024-01-15',
      trialEndDate: '2024-02-04',
      daysRemaining: 0,
      postsUsed: 15,
      maxPosts: 20
    },
    musicPosts: [
      {
        id: '1',
        title: 'Midnight Groove',
        description: 'A smooth Afrobeat track perfect for late night vibes',
        genre: 'Afrobeat',
        duration: 180,
        uploadDate: '2024-01-20',
        likes: 245,
        plays: 1200,
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
      },
      {
        id: '2',
        title: 'City Lights',
        description: 'Urban R&B with soulful vocals and modern production',
        genre: 'R&B',
        duration: 210,
        uploadDate: '2024-01-25',
        likes: 189,
        plays: 890,
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
      }
    ]
  },
  {
    id: '2',
    name: 'Thabo Beats',
    bio: 'Hip-hop producer and rapper from Johannesburg, creating conscious music for the youth.',
    genre: ['Hip-Hop', 'Rap', 'Amapiano'],
    location: 'Johannesburg, South Africa',
    profileImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    musicSamples: [
      {
        id: '3',
        title: 'Street Dreams',
        duration: 195,
        url: 'sample3.mp3',
        genre: 'Hip-Hop'
      }
    ],
    socialMedia: {
      instagram: '@thabobeats',
      youtube: 'ThaboBeatsOfficial'
    },
    verified: false,
    rating: 4.5,
    totalBids: 12,
    joinDate: '2024-02-20',
    trialInfo: {
      isOnTrial: true,
      trialStartDate: '2024-02-20',
      trialEndDate: '2024-03-12',
      daysRemaining: 15,
      postsUsed: 5,
      maxPosts: 20
    },
    musicPosts: [
      {
        id: '3',
        title: 'Street Dreams',
        description: 'Raw hip-hop track about chasing dreams in the city',
        genre: 'Hip-Hop',
        duration: 195,
        uploadDate: '2024-02-25',
        likes: 156,
        plays: 720,
        coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      }
    ]
  },
  {
    id: '3',
    name: 'Keza Voice',
    bio: 'Soulful vocalist from Kigali, specializing in contemporary African music with jazz influences.',
    genre: ['Jazz', 'Soul', 'African Contemporary'],
    location: 'Kigali, Rwanda',
    profileImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    musicSamples: [
      {
        id: '4',
        title: 'Mountain Echoes',
        duration: 240,
        url: 'sample4.mp3',
        genre: 'Jazz'
      }
    ],
    verified: true,
    rating: 4.9,
    totalBids: 31,
    joinDate: '2023-11-10',
    trialInfo: {
      isOnTrial: false,
      trialStartDate: '2023-11-10',
      trialEndDate: '2023-11-30',
      daysRemaining: 0,
      postsUsed: 20,
      maxPosts: 20
    },
    musicPosts: [
      {
        id: '4',
        title: 'Mountain Echoes',
        description: 'Jazz-influenced piece inspired by the hills of Rwanda',
        genre: 'Jazz',
        duration: 240,
        uploadDate: '2023-11-15',
        likes: 312,
        plays: 1850,
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400'
      }
    ]
  }
];

export const mockLabels: RecordLabel[] = [
  {
    id: '1',
    name: 'Afro Fusion Records',
    description: 'Leading African music label specializing in contemporary Afrobeat and fusion genres.',
    logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
    website: 'www.afrofusionrecords.com',
    genres: ['Afrobeat', 'Fusion', 'World Music'],
    location: 'Cape Town, South Africa',
    established: '2018',
    verified: true
  },
  {
    id: '2',
    name: 'Urban Pulse Entertainment',
    description: 'Hip-hop and urban music powerhouse discovering the next generation of African talent.',
    genres: ['Hip-Hop', 'Rap', 'Urban', 'Amapiano'],
    location: 'Nairobi, Kenya',
    established: '2020',
    verified: true
  }
];

export const mockAuctions: Auction[] = [
  {
    id: '1',
    artistId: '1',
    title: 'Exclusive Recording Contract - Amara Soul',
    description: '3-album deal with international distribution rights',
    startTime: '2024-12-20T18:00:00Z',
    endTime: '2024-12-20T20:00:00Z',
    startingBid: 5000,
    currentBid: 12500,
    bidCount: 8,
    status: 'live',
    entryFee: 1
  },
  {
    id: '2',
    artistId: '2',
    title: 'Hip-Hop Talent Showcase - Thabo Beats',
    description: 'Single release with promotional support',
    startTime: '2024-12-21T16:00:00Z',
    endTime: '2024-12-21T18:00:00Z',
    startingBid: 2000,
    currentBid: 2000,
    bidCount: 0,
    status: 'upcoming',
    entryFee: 1
  },
  {
    id: '3',
    artistId: '3',
    title: 'Jazz Fusion Project - Keza Voice',
    description: 'EP production with studio time included',
    startTime: '2024-12-19T14:00:00Z',
    endTime: '2024-12-19T16:00:00Z',
    startingBid: 3500,
    currentBid: 8750,
    bidCount: 12,
    status: 'ended',
    entryFee: 1,
    winner: 'Afro Fusion Records'
  }
];

export const genres = [
  'Afrobeat',
  'Hip-Hop',
  'R&B',
  'Jazz',
  'Soul',
  'Amapiano',
  'Rap',
  'Pop',
  'Rock',
  'Electronic',
  'World Music',
  'Gospel',
  'Reggae',
  'Blues'
];

// Helper function to calculate trial days remaining
export const calculateTrialDaysRemaining = (trialEndDate: string): number => {
  const now = new Date();
  const endDate = new Date(trialEndDate);
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Helper function to create new trial info for new artists
export const createTrialInfo = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 20); // 20 days from now
  
  return {
    isOnTrial: true,
    trialStartDate: startDate.toISOString(),
    trialEndDate: endDate.toISOString(),
    daysRemaining: 20,
    postsUsed: 0,
    maxPosts: 20
  };
};
