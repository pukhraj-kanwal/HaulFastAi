/**
 * @file Defines TypeScript types for the Trailer entity.
 */

/**
 * Represents a trailer in the Transport Management System.
 */
export interface Trailer {
  id: string; // Unique identifier for the trailer
  trailerId: string; // Internal trailer identifier/number
  registrationExpiry: Date; // Trailer registration expiry date
  inspectionExpiry: Date; // Trailer inspection expiry date
  status: TrailerStatus; // Current status of the trailer
  // Add other relevant trailer fields as needed based on the full approved list
  // e.g., type, size, etc.
}

/**
 * Enum for possible trailer statuses.
 */
export enum TrailerStatus {
  Active = 'Active',
  InShop = 'In Shop',
  // Add other statuses as needed
}