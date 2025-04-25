/**
 * @file Defines TypeScript types for the Truck (Power Unit) entity.
 */

/**
 * Represents a truck (power unit) in the Transport Management System.
 */
export interface Truck {
  id: string; // Unique identifier for the truck
  truckId: string; // Internal truck identifier/number
  vin: string; // Vehicle Identification Number
  registrationExpiry: Date; // Truck registration expiry date
  inspectionExpiry: Date; // Truck inspection expiry date
  status: TruckStatus; // Current status of the truck
  // Add other relevant truck fields as needed based on the full approved list
  // e.g., make, model, year, license plate, etc.
}

/**
 * Enum for possible truck statuses.
 */
export enum TruckStatus {
  Active = 'Active',
  InShop = 'In Shop',
  // Add other statuses as needed
}