/*
 * Copyright (c) 2024 Elide Technologies, Inc.
 *
 * Licensed under the MIT license (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 *   https://opensource.org/license/mit/
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under the License.
 */

import { ProjectLicense, ProjectLicenseStats, ProjectQualityMetrics, ProjectSourceControl } from './info-model.js'

/**
 * Project Licensing Info
 *
 * Information about the licensing of a software project.
 */
export type ProjectLicensingInfo = ProjectLicenseStats & {
  open: boolean
  licenses: ProjectLicense[]
  licenseNames: string[]
  stats: ProjectLicenseStats
}

/**
 * Project Media
 *
 * Refers to some media like an image, video, or other content.
 */
export type ProjectMedia = {
  url: string
}

/**
 * Project Organization Info
 *
 * Describes an organization which is responsible for a piece of software in some way.
 */
export type ProjectOrgInfo = {
  vendorName: string
  vendorLegal: string
  vendorUrl: string
  vendorLogo: string
}

/**
 * Project Verifications
 *
 * Reflects the results of manual verification steps performed for a project.
 */
export type ProjectVerifications = {
  verifiedOwner: boolean
  verifiedValid: boolean
  verifiedProvenance: boolean
  verifiedReleases: boolean
}

/**
 * Project Contact Info
 *
 * Describes a person which is responsible for a piece of software in some way.
 */
export type ProjectContactInfo = {
  // Nothing yet.
}

/**
 * Project Profile Info
 *
 * Generic project information, including the project's name, description, homepage, icon, and so on.
 */
export type ProjectProfileInfo = Partial<ProjectOrgInfo> & Partial<ProjectVerifications> & {
  name?: string
  description?: string
  url?: string
  icon?: ProjectMedia
  logo?: ProjectMedia
}

/**
 * Project Info
 *
 * Top-level information about a software project.
 */
export type ProjectInfo = (
  ProjectProfileInfo & Partial<ProjectSourceControl> & Partial<ProjectQualityMetrics> & Partial<ProjectLicensingInfo>
) & {
  // The remote repository URL for this project, as a canonicalized HTTPS URL.
  objectID?: string
}
