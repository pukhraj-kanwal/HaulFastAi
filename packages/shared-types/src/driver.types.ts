/**
 * @file Defines TypeScript types for the Driver entity.
 */

/**
 * Represents a driver in the Transport Management System.
 */
export interface Driver {
  id: string; // Unique identifier for the driver
  name: string; // Driver's full name
  licenseNumber: string; // Driver's license number
  licenseExpiry: Date; // Driver's license expiry date
  medicalExpiry: Date; // Driver's medical certificate expiry date
  status: DriverStatus; // Current status of the driver
  drugTestResult?: DrugTestResult; // Latest drug test result (optional for Phase 1, but tracked)
  drugTestDate?: Date; // Date of the latest drug test (optional)
  // Add other relevant driver fields as needed based on the full approved list
  // e.g., contact information, hire date, etc.
}

/**
 * Enum for possible driver statuses.
 */
export enum DriverStatus {
  Active = 'Active',
  InShop = 'In Shop',
  Vacation = 'Vacation',
  LaidOff = 'Laid Off',
  MedicalHold = 'Medical Hold',
  NonCompliant = 'Non-Compliant', // Added for compliance tracking
  // Add other statuses as needed
}

/**
 * Enum for possible drug test results.
 */
export enum DrugTestResult {
  Pass = 'Pass',
  Fail = 'Fail',
  Pending = 'Pending',
  // Add other results as needed
}