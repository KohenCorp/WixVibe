/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: portfolio
 * Interface for Portfolio
 */
export interface Portfolio {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  projectImage?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceTitle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
}


/**
 * Collection ID: team
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePhoto?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType url */
  linkedInUrl?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType text */
  companyOrRole?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  clientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
}
