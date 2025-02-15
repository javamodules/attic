# JPMS Attic: Samples

This sub-directory provides sample provides for Maven and Gradle which use the JPMS Attic repository. See each sample
README for more information.

## Available Samples

- **[`gradle-platform`](./gradle-platform)**: Demonstrates use of the [Gradle Platform](https://docs.gradle.org/current/userguide/platforms.html) artifact, which helps enforce JPMS-compatible library versions.

- **[`gradle-quickstart`](./gradle-quickstart)**: Demonstrates use of the [Gradle init script](https://docs.gradle.org/current/userguide/init_scripts.html) to auto-configure Gradle for JPMS Attic integration.

- **[`modular-guava`](./modular-guava)**: Pure-Java project which builds against Guava JPMS with the local repository.

- **[`modular-guava-maven`](./modular-guava-maven)**: Roughly the same project, but builds with the remote repo, at
  `https://jpms.pkg.st/repository`, with Maven.

- **[`modular-guava-repo`](./modular-guava-repo)**: Same project, but builds with the remote repo, at
  `https://jpms.pkg.st/repository`.
