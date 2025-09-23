
export interface Artist {
  id: string;
  name: string;
  bio: string;
  genre: string[];
  location: string;
  profileImage?: string;
  musicSamples: MusicSample[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  verified: boolean;
  rating: number;
  totalBids: number;
  joinDate: string;
}

export interface MusicSample {
  id: string;
  title: string;
  duration: number;
  url: string;
  genre: string;
}

export interface RecordLabel {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  genres: string[];
  location: string;
  established: string;
  verified: boolean;
}

export interface Auction {
  id: string;
  artistId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startingBid: number;
  currentBid: number;
  bidCount: number;
  status: 'upcoming' | 'live' | 'ended';
  entryFee: number;
  winner?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  labelId: string;
  amount: number;
  timestamp: string;
  message?: string;
}

export type UserType = 'artist' | 'label';

export interface User {
  id: string;
  type: UserType;
  email: string;
  profile: Artist | RecordLabel;
}
