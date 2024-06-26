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

import { MavenCoordinate } from '@javamodules/maven'
import { PomProject } from '@javamodules/maven/parser'
import { GradleModuleInfo, GradleVariantSchema as GradleVariant } from '@javamodules/gradle'
import { JavaModuleInfo, JvmTarget } from '@javamodules/java/model'
import { ProjectInfo } from './info-project.js'

/** Format version for indexes. */
export const formatVersion = 1.0

/**
 * Source Control Platform
 *
 * Enumerates project source control platforms recognized by the UI.
 */
export enum SourceControlPlatform {
  BITBUCKET = "BITBUCKET",
  GITHUB = "GITHUB",
  GITLAB = "GITLAB",
}

/**
 * Publication Link
 *
 * Describes a link declared as relevant for a publication.
 */
export type PublicationLink = {
  Label?: string;
  URL?:   string;
}

/**
 * Publication License
 *
 * Describes well-known license strings for publications.
 */
export enum PublicationLicense {
  APACHE_2_0 = 'Apache-2.0',
  MIT = 'MIT',
  AGPL_3 = 'AGPL-3.0',
  GPL_3 = 'GPL-3.0',
  LGPL_3 = 'LGPL-3.0',
  LGPL_2_1 = 'LGPL-2.1',
  BSD_3 = 'BSD-3-Clause',
  BSD_2 = 'BSD-2-Clause',
  EPL_1 = 'EPL-1.0',
  EUPL_1 = 'EUPL-1.1',
  ISC = 'ISC',
  MPL_2 = 'MPL-2.0',
  WTFPL = 'WTFPL',
  UNLICENSE = 'Unlicense',
  NON_STANDARD = 'non-standard',
}

/**
 * Publication Index Entry
 *
 * Describes the expected JSON structure of a hit against the publication index.
 */
export type PublicationIndexEntry = {
  artifactId:             string;
  groupId:                string;
  slsaVerified?:          boolean;
  openSsfTier?:           string;
  openSsfScore?:          number;
  advisoryCount?:         number;
  dependencyCount?:       number;
  dependentCount?:        number;
  description?:           string;
  forksCount?:            number;
  homepage?:              string;
  latestRelease?:         string;
  licenses?:              (PublicationLicense | string)[];
  links?:                 PublicationLink[];
  openIssuesCount?:       number;
  projectName?:           string;
  sourceControlPlatform?: SourceControlPlatform;
  sourceRepo?:            string;
  starsCount?:            number;
  versionCount?:          number;
  versions?:              string[];

  // Extended Metadata (enriched)
  gvmMetadata?:           boolean;
  gradleModule?:          boolean;
  variants?:              string[];
  javaModule?:            boolean;
  javaModuleName?:        string;
  provides?:              string[];
  requires?:              string[];
}

/**
 * Repository JAR Info
 *
 * Describes decoded/parsed/interpreted information about a JAR.
 */
export type RepositoryJarInfo = {
  modular: boolean
  mrjar: boolean
  minimumBytecodeTarget?: JvmTarget
  maximumBytecodeTarget?: JvmTarget
  automaticModuleName?: string
  mainClass?: string
  module?: JavaModuleInfo
}

/**
 * Repository JAR
 *
 * Describes information about a JAR within a Maven repository.
 */
export type RepositoryJar = RepositoryJarInfo & {
  path: string
  name: string
  coordinate: MavenCoordinate
  size: number
}

/**
 * Package Flags
 *
 * Indicates top-level flags which are set for each package for easy faceting and querying.
 */
export type PackageFlags = {
  modular?: boolean
  gradleModule?: boolean
  mrjar?: boolean
  minimumBytecodeTarget?: JvmTarget
  maximumBytecodeTarget?: JvmTarget
}

/**
 * Repository Package
 *
 * Describes an interpreted repository package, which includes its loaded POM and Gradle
 * content, as needed and applicable
 */
export type RepositoryPackage = {
  objectID: string
  coordinate: MavenCoordinate
  pom: string
  gradle?: GradleModuleInfo
  maven: PomProject
  jars: RepositoryJar[]
  flags: PackageFlags
  valueOf: any
}

/**
 * Indexed Artifact
 *
 * Describes a single release of artifacts, including its Maven coordinate, POM location,
 * Gradle Module, and parsed metadata from the POM and Gradle Module.
 */
export type IndexedArtifact = {
  maven: MavenCoordinate
  pom: string
  name?: string
  description?: string
  gradle?: GradleModuleInfo
}

/**
 * JAR Module Pair
 *
 * Maps a JAR to a module-info entry.
 */
export type JarModulePair = {
  jar: string
  module: JavaModuleInfo
}

/**
 * Repository Modules Index Entry
 *
 * Describes an entry in an index file which maps indexed artifacts by their Java Module coordinate.
 */
export type RepositoryModulesIndexEntry = MavenCoordinate & Partial<PackageFlags> & JavaModuleInfo & {
  // Well-qualified Maven coordinate.
  objectID: string
  jar: string
  purl: string
}

/**
 * Repository Gradle Modlues Index Entry
 *
 * Describes an entry in an index file which maps indexed artifacts by their Gradle Module info.
 */
export type RepositoryGradleModulesIndexEntry = MavenCoordinate & Partial<PackageFlags> & GradleVariant & {
  // Well-qualified Maven coordinate, appended with Gradle variant ID.
  objectID: string
  variant: string
}

/**
 * Repository Maven POM Index Entry
 *
 * Describes an entry in an index file which maps indexed artifacts by their Maven POM info.
 */
export type RepositoryPomIndexEntry = MavenCoordinate & Partial<PackageFlags> & PomProject & {
  // Well-qualified Maven coordinate.
  objectID: string
}

/**
 * Repository Publication Summary Entry
 *
 * Describes an entry in an index file which maps summary information for a given package.
 */
export type RepositoryPublicationIndexEntry = (
  MavenCoordinate & Partial<PackageFlags> & Omit<ProjectInfo, 'objectID'> & Partial<JarModulePair>
) & {
  // Well-qualified Maven coordinate.
  objectID: string
  purl: string
  gradleVariants?: string[]
  repositories: string[]
  repositoryNames: string[]
  moduleName?: string
  moduleVersion?: string
}

/**
 * GraalVM Metadata Entry
 *
 * Describes a single entry present within the GraalVM Reachability Metadata Index, located at:
 * https://github.com/oracle/graalvm-reachability-metadata/blob/master/metadata/index.json
 */
export type GraalVmMetadataEntry = {
  "allowed-packages"?: string[];
  directory?:          string;
  module?:             string;
  requires?:           string[];
}

/**
 * GraalVM Module Metadata
 *
 * Describes raw module reachability metadata for a given module. Example located at:
 * https://github.com/oracle/graalvm-reachability-metadata/blob/master/metadata/io.netty/netty-buffer/index.json
 */
export type GraalVmModuleMetadata = {
  latest?:             boolean;
  override?:           boolean;
  "metadata-version"?: string;
  module?:             string;
  "tested-versions"?:  string[];
}

/**
 * Repository GraalVM Metadata Index Entry
 *
 * Gathers entries which describe libraries that have known GraalVM Reachability metadata.
 */
export type RepositoryGraalVmMetadataIndexEntry = {
  // Nothing yet.
}

/**
 * Repository Index Bundle
 *
 * Gathers together all computed materialized indexes for a given Maven repository; used
 * as an intermediate data structure before indexes are written.
 */
export type RepositoryIndexBundle = {
  allPackages: RepositoryPackage[]
  gradle: RepositoryGradleModulesIndexEntry[]
  modules: RepositoryModulesIndexEntry[]
  maven: RepositoryPomIndexEntry[]
  publications: RepositoryPublicationIndexEntry[]
  main: PublicationIndexEntry[]
  graalVmMetadata: RepositoryGraalVmMetadataIndexEntry[]
}

/**
 * Repository Index Metadata
 *
 * Describes metadata written alongside index files.
 */
export type RepositoryIndexMetadata = {
  version: string
  generated: number
  name: string
  count: number
  md5: string
  sha1: string
  sha256: string
  sha512: string
}

/**
 * Repository Index File
 *
 * Specifies the contents of a single index file as JSON; the contents are written to the
 * named file, and an additional compressed file at `<name>.gz` if `compressed` content is
 * provided.
 *
 * Hashes are written to the `<name>.<hash>` as peers to the index file.
 */
export type RepositoryIndexFile = {
  name: string
  contents: string
  metadata: string
  gzip?: string
  md5: string
  sha1: string
  sha256: string
  sha512: string
}
