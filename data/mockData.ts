
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
    joinDate: '2024-01-15'
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
    joinDate: '2024-02-20'
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
    joinDate: '2023-11-10'
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
